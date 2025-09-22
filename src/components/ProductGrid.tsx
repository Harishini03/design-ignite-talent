import React from 'react';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  selectedColors?: Record<string, string>;
  onColorSelect?: (productId: string, color: string) => void;
  onResetFilters?: () => void;
}

export function ProductGrid({ 
  products, 
  loading = false, 
  selectedColors = {}, 
  onColorSelect,
  onResetFilters 
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33M15 3.929A9.969 9.969 0 0012 3c-1.18 0-2.309.204-3.365.574M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-card-foreground">
            No products found
          </h3>
          <p className="text-muted-foreground">
            We couldn't find any products matching your current filters. 
            Try adjusting your search criteria or browse our full catalog.
          </p>
          {onResetFilters && (
            <Button 
              onClick={onResetFilters}
              className="mt-4"
              variant="outline"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear all filters
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div key={product.id} className="product-grid-item">
          <ProductCard
            product={product}
            selectedColor={selectedColors[product.id]}
            onColorSelect={(color) => onColorSelect?.(product.id, color)}
          />
        </div>
      ))}
    </div>
  );
}