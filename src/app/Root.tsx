import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";

export function Root() {
  useEffect(() => {
    document.title = "👨‍🍳 Digital Chef - Authentic Indian Cloud Kitchen";
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}