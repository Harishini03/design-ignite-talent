import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ShopLux
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Discover premium products with exceptional quality and design. 
              Your satisfaction is our commitment.
            </p>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Shop All</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Best Sellers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Sale</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Track Your Order</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get special offers, exclusive deals, and more.
            </p>
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="text-sm"
              />
              <Button className="w-full" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@shoplux.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; 2024 ShopLux. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}