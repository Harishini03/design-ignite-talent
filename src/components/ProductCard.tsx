import React, { useState } from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  selectedColor?: string;
  onColorSelect?: (color: string) => void;
}

export function ProductCard({ product, selectedColor, onColorSelect }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discountedPrice = product.discountPrice || product.price;
  const hasDiscount = !!product.discountPrice;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'h-4 w-4',
          i < Math.floor(rating)
            ? 'fill-rating text-rating'
            : 'fill-rating-empty text-rating-empty'
        )}
      />
    ));
  };

  const currentColor = selectedColor || product.colors[0]?.value;

  return (
    <div className="group relative bg-card rounded-lg border border-border/50 overflow-hidden shadow-md hover:shadow-hover transition-all duration-300 hover-lift">
      {/* Hot Badge */}
      {product.isHot && (
        <Badge variant="hot" className="absolute top-3 left-3 z-10 badge-hot">
          HOT
        </Badge>
      )}

      {/* Wishlist Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 z-10 h-8 w-8 bg-card/80 backdrop-blur-sm hover:bg-card opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => setIsWishlisted(!isWishlisted)}
      >
        <Heart
          className={cn(
            'h-4 w-4 transition-colors',
            isWishlisted ? 'fill-destructive text-destructive' : 'text-muted-foreground'
          )}
        />
      </Button>

      {/* Product Image */}
      <div 
        className="relative aspect-square overflow-hidden bg-background-secondary"
        style={{ backgroundColor: currentColor ? `${currentColor}15` : undefined }}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton" />
        )}
        <img
          src={product.imageUrl}
          alt={product.name}
          className={cn(
            'w-full h-full object-cover transition-all duration-300 group-hover:scale-105',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Stock Status Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground bg-card px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-3">
        {/* Product Name */}
        <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {renderStars(product.ratingValue)}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            ({product.ratingCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-card-foreground">
            ${discountedPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
              <Badge variant="discount" className="text-xs">
                -{product.discountPercent}%
              </Badge>
            </>
          )}
        </div>

        {/* Color Selection */}
        {product.colors.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Colors:</span>
            <div className="flex items-center gap-2">
              {product.colors.slice(0, 4).map((color) => (
                <button
                  key={color.name}
                  className={cn(
                    'w-6 h-6 rounded-full border-2 transition-all relative',
                    selectedColor === color.value
                      ? 'border-primary scale-110'
                      : 'border-border hover:border-border-hover',
                    !color.available && 'opacity-50 cursor-not-allowed'
                  )}
                  style={{ backgroundColor: color.value }}
                  onClick={() => color.available && onColorSelect?.(color.value)}
                  disabled={!color.available}
                  title={color.name}
                >
                  {!color.available && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-0.5 h-full bg-destructive rotate-45" />
                    </div>
                  )}
                </button>
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <Button 
          className="w-full mt-4" 
          disabled={!product.inStock}
          variant={product.inStock ? "default" : "secondary"}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
}