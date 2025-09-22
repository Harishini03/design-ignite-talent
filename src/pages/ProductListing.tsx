import React, { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { FilterSidebar } from '@/components/FilterSidebar';
import { ProductGrid } from '@/components/ProductGrid';
import { SortingControls } from '@/components/SortingControls';
import { ProductPagination } from '@/components/ProductPagination';
import { Footer } from '@/components/Footer';
import { useProductFilters } from '@/hooks/useProductFilters';
import { mockProducts } from '@/data/mockProducts';
import { cn } from '@/lib/utils';

const PRODUCTS_PER_PAGE = 12;

export default function ProductListing() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [gridSize, setGridSize] = useState<'small' | 'large'>('large');

  const {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    filteredProducts,
    activeFiltersCount,
    resetFilters,
  } = useProductFilters({ products: mockProducts });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, searchQuery]);

  const handleColorSelect = (productId: string, color: string) => {
    setSelectedColors(prev => ({
      ...prev,
      [productId]: color,
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        onFilterToggle={() => setSidebarOpen(!sidebarOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={true}
              onClose={() => {}}
              className="relative"
            />
          </div>

          {/* Mobile Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            className="lg:hidden"
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Sorting Controls */}
            <SortingControls
              currentSort={sortBy}
              onSortChange={setSortBy}
              totalProducts={filteredProducts.length}
              activeFilters={activeFiltersCount}
              onFilterToggle={() => setSidebarOpen(!sidebarOpen)}
              gridSize={gridSize}
              onGridSizeChange={setGridSize}
            />

            {/* Product Grid */}
            <div className="py-6">
              <div className={cn(
                gridSize === 'small' 
                  ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              )}>
                <ProductGrid
                  products={paginatedProducts}
                  selectedColors={selectedColors}
                  onColorSelect={handleColorSelect}
                  onResetFilters={resetFilters}
                />
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 pb-6">
                <ProductPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

            {/* Results Summary */}
            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Showing {Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)} of{' '}
                <span className="font-medium text-foreground">{filteredProducts.length}</span> products
                {activeFiltersCount > 0 && (
                  <span className="ml-2">
                    with <span className="font-medium text-foreground">{activeFiltersCount}</span> active filter{activeFiltersCount !== 1 ? 's' : ''}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}