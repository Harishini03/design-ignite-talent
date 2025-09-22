import React from 'react';
import { ArrowUpDown, Grid3X3, LayoutGrid, Filter } from 'lucide-react';
import { SORT_OPTIONS, SortOption } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface SortingControlsProps {
  currentSort: string;
  onSortChange: (sort: string) => void;
  totalProducts: number;
  activeFilters: number;
  onFilterToggle: () => void;
  gridSize: 'small' | 'large';
  onGridSizeChange: (size: 'small' | 'large') => void;
}

export function SortingControls({
  currentSort,
  onSortChange,
  totalProducts,
  activeFilters,
  onFilterToggle,
  gridSize,
  onGridSizeChange,
}: SortingControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-border">
      {/* Left Section - Results count and filter toggle */}
      <div className="flex items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{totalProducts}</span> products
        </p>
        
        {/* Mobile Filter Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onFilterToggle}
          className="lg:hidden relative"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFilters > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {activeFilters}
            </Badge>
          )}
        </Button>
      </div>

      {/* Right Section - Sorting and view options */}
      <div className="flex items-center gap-3">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <Select value={currentSort} onValueChange={onSortChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Grid Size Toggle */}
        <div className="hidden sm:flex items-center border border-border rounded-md">
          <Button
            variant={gridSize === 'small' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onGridSizeChange('small')}
            className="border-0 rounded-r-none"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={gridSize === 'large' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onGridSizeChange('large')}
            className="border-0 rounded-l-none"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}