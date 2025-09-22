import { useState, useMemo } from 'react';
import { Product, FilterState, SORT_OPTIONS } from '@/types/product';

interface UseProductFiltersProps {
  products: Product[];
  initialFilters?: Partial<FilterState>;
}

export function useProductFilters({ products, initialFilters = {} }: UseProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    colors: [],
    priceRange: [0, 1000],
    inStock: false,
    ...initialFilters,
  });

  const [sortBy, setSortBy] = useState('name-asc');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }

    // Color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color =>
          filters.colors.includes(color.value) && color.available
        )
      );
    }

    // Price range filter
    filtered = filtered.filter(product => {
      const price = product.discountPrice || product.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // In stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Sorting
    const sortOption = SORT_OPTIONS.find(option => option.value === sortBy);
    if (sortOption) {
      filtered.sort((a, b) => {
        const field = sortOption.field;
        let aValue = a[field];
        let bValue = b[field];

        // Handle price sorting with discount consideration
        if (field === 'price') {
          aValue = a.discountPrice || a.price;
          bValue = b.discountPrice || b.price;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          const comparison = aValue.localeCompare(bValue);
          return sortOption.direction === 'asc' ? comparison : -comparison;
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          const comparison = aValue - bValue;
          return sortOption.direction === 'asc' ? comparison : -comparison;
        }

        return 0;
      });
    }

    return filtered;
  }, [products, filters, sortBy, searchQuery]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.categories.length > 0) count++;
    if (filters.colors.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
    if (filters.inStock) count++;
    return count;
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      categories: [],
      colors: [],
      priceRange: [0, 1000],
      inStock: false,
    });
    setSearchQuery('');
  };

  return {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    filteredProducts,
    activeFiltersCount,
    resetFilters,
  };
}