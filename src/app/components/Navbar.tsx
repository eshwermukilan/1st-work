import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { ShoppingCart, Menu, X, ChefHat, Package } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Digital Chef
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? "text-pink-500"
                    : "text-gray-300 hover:text-pink-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/orders">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-pink-500/10 hover:text-pink-500 text-gray-300"
                title="My Orders"
              >
                <Package className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-pink-500/10 hover:text-pink-500 text-gray-300"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </Button>
            </Link>
            <Link to="/menu">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                Order Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "bg-pink-500/10 text-pink-500"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/orders"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive("/orders")
                    ? "bg-pink-500/10 text-pink-500"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Package className="w-4 h-4 inline mr-2" />
                My Orders
              </Link>
              <div className="px-4 pt-2 flex gap-2">
                <Link to="/cart" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-pink-500 text-pink-500 hover:bg-pink-500/10"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart ({totalItems})
                  </Button>
                </Link>
                <Link to="/menu" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                    Order Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}