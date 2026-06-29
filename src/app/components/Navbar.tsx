import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { ShoppingCart, Menu, X, ChefHat, Package, LogOut, ChevronDown, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { currentUser, logout } = useAuth();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    ...(currentUser ? [{ path: "/orders", label: "Orders" }] : []),
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };

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

            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all px-2 py-1.5 hover:bg-gray-800 text-white cursor-pointer select-none outline-none">
                    <Avatar className="w-8 h-8 border border-pink-500/30">
                      <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white text-xs font-bold">
                        {currentUser.displayName ? currentUser.displayName.split(" ").map((n) => n[0]).join("") : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-300 max-w-[100px] truncate">
                      {currentUser.displayName || "User"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-950 border-gray-800 text-white">
                  <div className="px-3 py-2 text-xs text-gray-400 border-b border-gray-900 mb-1">
                    Logged in as <span className="font-semibold text-gray-300">{currentUser.email}</span>
                  </div>
                  <DropdownMenuItem asChild className="focus:bg-pink-500/10 focus:text-pink-500 cursor-pointer">
                    <Link to="/profile" className="flex items-center w-full">
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-pink-500/10 focus:text-pink-500 cursor-pointer">
                    <Link to="/orders" className="flex items-center w-full">
                      <Package className="w-4 h-4 mr-2" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-900" />
                  <DropdownMenuItem onClick={handleLogout} className="focus:bg-red-500/10 focus:text-red-400 text-red-500 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-300 hover:bg-gray-800 hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link to="/menu">
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                    Order Now
                  </Button>
                </Link>
              </>
            )}
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

              {currentUser ? (
                <>
                  <div className="px-4 py-2 border-b border-gray-850">
                    <p className="text-xs text-gray-500">Logged in as</p>
                    <p className="text-sm font-semibold text-white truncate">{currentUser.displayName || currentUser.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isActive("/profile")
                        ? "bg-pink-500/10 text-pink-500"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <User className="w-4 h-4 inline mr-2" />
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-2 rounded-lg transition-colors text-left text-red-500 hover:bg-red-500/10 flex items-center w-full cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 inline mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isActive("/login")
                      ? "bg-pink-500/10 text-pink-500"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <User className="w-4 h-4 inline mr-2" />
                  Sign In
                </Link>
              )}

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