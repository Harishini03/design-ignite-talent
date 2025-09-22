import React from 'react';
import { Search, ShoppingCart, User, Menu, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  onMenuToggle: () => void;
  onFilterToggle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ onMenuToggle, onFilterToggle, searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuToggle}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ShopLux
              </span>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-md mx-4 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 w-full"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Mobile Search & Filter */}
            <div className="flex items-center gap-1 sm:hidden">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onFilterToggle}
              >
                <Filter className="h-5 w-5" />
              </Button>
            </div>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </Button>

            {/* User */}
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-4 sm:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 w-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}