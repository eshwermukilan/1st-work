import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../config/firebase";
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  deliveryFee: number;
  tax: number;
  grandTotal: number;
  orderDate: string;
  paymentMethod: string;
  status?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  placeOrder: (paymentMethod: string) => Promise<void>;
  orders: Order[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const { currentUser } = useAuth();

  // Load orders from Firestore when user authentication changes
  useEffect(() => {
    if (!currentUser) {
      setOrders([]);
      return;
    }

    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const fetchedOrders: Order[] = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push(doc.data() as Order);
        });

        // Sort locally by orderDate descending
        fetchedOrders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
        setOrders(fetchedOrders);
      } catch (err) {
        console.error("Error fetching orders from Firestore:", err);
        // Fallback to localStorage if Firestore call fails (e.g. before config setup)
        const savedOrders = localStorage.getItem('digitalChefOrders');
        if (savedOrders) {
          setOrders(JSON.parse(savedOrders));
        }
      }
    };

    fetchOrders();
  }, [currentUser]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = async (paymentMethod: string) => {
    const subtotal = totalPrice;
    const deliveryFee = subtotal > 0 ? 40 : 0;
    const tax = subtotal * 0.05;
    const grandTotal = subtotal + deliveryFee + tax;
    const orderId = `ORD${Date.now()}`;

    const newOrder: Order = {
      id: orderId,
      userId: currentUser?.uid || "anonymous",
      items: [...cartItems],
      totalPrice: subtotal,
      deliveryFee,
      tax,
      grandTotal,
      orderDate: new Date().toISOString(),
      paymentMethod,
      status: "pending"
    };

    try {
      // Save order to Cloud Firestore
      await setDoc(doc(db, "orders", orderId), newOrder);
      
      // Update local state
      setOrders((prevOrders) => [newOrder, ...prevOrders]);
    } catch (err) {
      console.error("Error saving order to Firestore:", err);
      // Fallback: save to state & localStorage
      const updatedOrders = [newOrder, ...orders];
      setOrders(updatedOrders);
      localStorage.setItem('digitalChefOrders', JSON.stringify(updatedOrders));
    } finally {
      clearCart();
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        placeOrder,
        orders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}