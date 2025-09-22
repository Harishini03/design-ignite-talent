import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { FilterState } from '@/types/product';
import { categories, availableColors } from '@/data/mockProducts';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function FilterSidebar({ 
  filters, 
  onFiltersChange, 
  isOpen, 
  onClose, 
  className 
}: FilterSidebarProps) {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [colorOpen, setColorOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked
      ? [...filters.colors, color]
      : filters.colors.filter(c => c !== color);
    
    onFiltersChange({ ...filters, colors: newColors });
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      colors: [],
      priceRange: [0, 1000],
      inStock: false,
    });
  };

  const hasActiveFilters = 
    filters.categories.length > 0 || 
    filters.colors.length > 0 || 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 1000 ||
    filters.inStock;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        'fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 bg-card border-r border-border z-50 transform transition-transform duration-300 overflow-y-auto',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        className
      )}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAllFilters}
                  className="text-xs"
                >
                  Clear all
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                <span className="font-medium">Categories</span>
                {categoryOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
              {categories.slice(1).map((category) => ( // Skip "All Categories"
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Colors */}
          <Collapsible open={colorOpen} onOpenChange={setColorOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                <span className="font-medium">Colors</span>
                {colorOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="grid grid-cols-2 gap-3">
                {availableColors.map((color) => (
                  <div key={color.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color.value}`}
                      checked={filters.colors.includes(color.value)}
                      onCheckedChange={(checked) => 
                        handleColorChange(color.value, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`color-${color.value}`}
                      className="flex items-center gap-2 text-sm font-medium leading-none cursor-pointer"
                    >
                      <div
                        className="w-4 h-4 rounded-full border border-border"
                        style={{ backgroundColor: color.value }}
                      />
                      {color.name}
                    </label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Price Range */}
          <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                <span className="font-medium">Price Range</span>
                {priceOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-3">
              <Slider
                value={filters.priceRange}
                onValueChange={handlePriceChange}
                max={1000}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* In Stock Only */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock}
              onCheckedChange={(checked) => 
                onFiltersChange({ ...filters, inStock: checked as boolean })
              }
            />
            <label
              htmlFor="in-stock"
              className="text-sm font-medium leading-none cursor-pointer"
            >
              In stock only
            </label>
          </div>
        </div>
      </div>
    </>
  );
}