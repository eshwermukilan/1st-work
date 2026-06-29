import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { CheckCircle, CreditCard, Wallet, Package, MapPin } from "lucide-react";
import { useNavigate, Link } from "react-router";

export function Checkout() {
  const { cartItems, totalPrice, placeOrder } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod" | "upi">("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form Fields States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("Chennai");
  const [state, setState] = useState("Tamil Nadu");
  const [pinCode, setPinCode] = useState("600017");
  const [landmark, setLandmark] = useState("");
  const [instructions, setInstructions] = useState("");

  // Multiple Addresses States
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("new");
  const [saveToProfile, setSaveToProfile] = useState(true);
  const [newAddressLabel, setNewAddressLabel] = useState("Home");

  // Load profile details from Firestore on mount
  useEffect(() => {
    if (!currentUser) return;
    
    setEmail(currentUser.email || "");

    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.name) setName(data.name);
          else if (currentUser.displayName) setName(currentUser.displayName);

          if (data.phone) setPhone(data.phone);

          const savedAddrs = data.addresses || [];
          setAddresses(savedAddrs);

          // Auto-fill with the first saved address by default if they have any
          if (savedAddrs.length > 0) {
            const firstAddr = savedAddrs[0];
            setSelectedAddressId(firstAddr.id);
            setAddressLine(firstAddr.addressLine);
            setCity(firstAddr.city);
            setState(firstAddr.state);
            setPinCode(firstAddr.pinCode);
            setLandmark(firstAddr.landmark || "");
            setSaveToProfile(false); // No need to save to profile since it's already a saved one
          }
        } else if (currentUser.displayName) {
          setName(currentUser.displayName);
        }
      } catch (err) {
        console.error("Error loading checkout profile:", err);
      }
    };

    fetchProfile();
  }, [currentUser]);

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
    if (id === "new") {
      setAddressLine("");
      setCity("Chennai");
      setState("Tamil Nadu");
      setPinCode("600017");
      setLandmark("");
      setSaveToProfile(true);
    } else {
      const addr = addresses.find((a) => a.id === id);
      if (addr) {
        setAddressLine(addr.addressLine);
        setCity(addr.city);
        setState(addr.state);
        setPinCode(addr.pinCode);
        setLandmark(addr.landmark || "");
        setSaveToProfile(false);
      }
    }
  };

  const deliveryFee = totalPrice > 0 ? 40 : 0;
  const tax = totalPrice * 0.05;
  const grandTotal = totalPrice + deliveryFee + tax;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      navigate("/menu");
      return;
    }

    setLoading(true);
    try {
      // 1. If "new" is selected and save checkbox is ticked, write to Firebase profile
      if (selectedAddressId === "new" && saveToProfile && currentUser) {
        const newAddress = {
          id: `addr_${Date.now()}`,
          label: newAddressLabel,
          addressLine,
          city,
          state,
          pinCode,
          landmark
        };
        const updatedAddresses = [...addresses, newAddress];
        await setDoc(doc(db, "users", currentUser.uid), {
          name,
          phone,
          addresses: updatedAddresses,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } else if (currentUser) {
        // Just sync phone / contact changes if they updated it
        await setDoc(doc(db, "users", currentUser.uid), {
          name,
          phone,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }

      // 2. Submit the order to database
      await placeOrder(
        paymentMethod === "cod" 
          ? "Cash on Delivery" 
          : paymentMethod === "upi" 
          ? "UPI / Online Payment" 
          : "Credit / Debit Card"
      );

      setOrderPlaced(true);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error(err);
      alert("An error occurred while placing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 shadow-2xl">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500 animate-bounce" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>

            <p className="text-gray-600 mb-2">Thank you for your order.</p>
            <p className="text-gray-600 mb-6">Your food will be delivered in 30-45 minutes.</p>
            <div className="flex gap-3 justify-center mb-6">
              <Link to="/orders">
                <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                  <Package className="w-4 h-4 mr-2" />
                  View Orders
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500">Redirecting to home page...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-pink-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Checkout</h1>
          <p className="text-xl text-pink-100">Complete your order</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Delivery Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input 
                        type="text" 
                        placeholder="Enter your name" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <Input 
                        type="tel" 
                        placeholder="+91 98765 43210" 
                        required 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input 
                      type="email" 
                      placeholder="your.email@example.com" 
                      readOnly
                      value={email}
                      className="bg-gray-100 cursor-not-allowed text-gray-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Address</h2>
                  <div className="space-y-4">
                    
                    {/* Saved Addresses Quick Selector */}
                    {addresses.length > 0 && (
                      <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-pink-500" />
                          Deliver to saved address:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {addresses.map((addr) => (
                            <button
                              type="button"
                              key={addr.id}
                              onClick={() => handleSelectAddress(addr.id)}
                              className={`p-3 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                                selectedAddressId === addr.id
                                  ? "bg-pink-500/10 border-pink-500 text-pink-600 shadow-sm"
                                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                              }`}
                            >
                              <span className="block font-bold text-[10px] uppercase text-gray-400 mb-1">{addr.label}</span>
                              <span className="block text-xs font-semibold truncate">{addr.addressLine}</span>
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => handleSelectAddress("new")}
                            className={`p-3 rounded-xl border text-center cursor-pointer transition-all duration-200 ${
                              selectedAddressId === "new"
                                ? "bg-pink-500/10 border-pink-500 text-pink-600 shadow-sm"
                                : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                            }`}
                          >
                            <span className="block font-bold text-[10px] uppercase text-gray-400 mb-1">+ New</span>
                            <span className="block text-xs font-semibold text-gray-500">Other Address</span>
                          </button>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line *
                      </label>
                      <Input 
                        type="text" 
                        placeholder="Street address" 
                        required 
                        value={addressLine}
                        onChange={(e) => setAddressLine(e.target.value)}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <Input 
                          type="text" 
                          placeholder="Chennai" 
                          required 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <Input 
                          type="text" 
                          placeholder="Tamil Nadu" 
                          required 
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          PIN Code *
                        </label>
                        <Input 
                          type="text" 
                          placeholder="600017" 
                          required 
                          value={pinCode}
                          onChange={(e) => setPinCode(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Landmark
                        </label>
                        <Input 
                          type="text" 
                          placeholder="Near..." 
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Instructions
                      </label>
                      <Textarea
                        placeholder="Any special instructions for delivery..."
                        rows={3}
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                      />
                    </div>

                    {/* New Address Saving Controls */}
                    {selectedAddressId === "new" && (
                      <div className="pt-4 border-t border-gray-100 mt-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="saveProfile"
                            checked={saveToProfile}
                            onChange={(e) => setSaveToProfile(e.target.checked)}
                            className="w-4 h-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500 cursor-pointer"
                          />
                          <label htmlFor="saveProfile" className="text-sm font-semibold text-gray-700 cursor-pointer select-none">
                            Save this address to my profile for future orders
                          </label>
                        </div>

                        {saveToProfile && (
                          <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                              Save address as:
                            </label>
                            <div className="flex gap-2 max-w-xs">
                              {["Home", "Work", "Other"].map((l) => (
                                <button
                                  type="button"
                                  key={l}
                                  onClick={() => setNewAddressLabel(l)}
                                  className={`flex-1 py-1.5 px-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                                    newAddressLabel === l
                                      ? "bg-pink-500/10 border-pink-500 text-pink-500 shadow-sm"
                                      : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                                  }`}
                                >
                                  {l}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value as "cod")}
                        className="w-4 h-4 text-pink-500"
                      />
                      <Wallet className="w-5 h-5 ml-3 text-gray-600" />
                      <span className="ml-3 font-medium">Cash on Delivery</span>
                    </label>
                    <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={(e) => setPaymentMethod(e.target.value as "upi")}
                        className="w-4 h-4 text-pink-500"
                      />
                      <CreditCard className="w-5 h-5 ml-3 text-gray-600" />
                      <span className="ml-3 font-medium">UPI / Online Payment</span>
                    </label>
                    <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value as "card")}
                        className="w-4 h-4 text-pink-500"
                      />
                      <CreditCard className="w-5 h-5 ml-3 text-gray-600" />
                      <span className="ml-3 font-medium">Credit / Debit Card</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 shadow-xl">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                  {/* Cart Items */}
                  <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span>₹{deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>GST (5%)</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-pink-500">
                          ₹{grandTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-6 text-lg cursor-pointer"
                  >
                    {loading ? "Placing Order..." : "Place Order"}
                  </Button>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      ✓ Your order will be confirmed via SMS
                    </p>
                    <p className="text-sm text-blue-800 mt-1">
                      ✓ Estimated delivery: 30-45 minutes
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}