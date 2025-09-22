export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  discountPercent?: number;
  ratingValue: number;
  ratingCount: number;
  isHot: boolean;
  colors: ProductColor[];
  category: string;
  imageUrl: string;
  description?: string;
  inStock: boolean;
}

export interface ProductColor {
  name: string;
  value: string;
  available: boolean;
}

export interface FilterState {
  categories: string[];
  colors: string[];
  priceRange: [number, number];
  inStock: boolean;
}

export interface SortOption {
  value: string;
  label: string;
  field: keyof Product;
  direction: 'asc' | 'desc';
}

export const SORT_OPTIONS: SortOption[] = [
  { value: 'name-asc', label: 'Name A-Z', field: 'name', direction: 'asc' },
  { value: 'name-desc', label: 'Name Z-A', field: 'name', direction: 'desc' },
  { value: 'price-asc', label: 'Price Low to High', field: 'price', direction: 'asc' },
  { value: 'price-desc', label: 'Price High to Low', field: 'price', direction: 'desc' },
  { value: 'rating-desc', label: 'Highest Rated', field: 'ratingValue', direction: 'desc' },
];