import { useCart } from "../context/CartContext";
import { Card, CardContent } from "../components/ui/card";
import { Package, Clock, CreditCard, ShoppingBag } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Badge } from "../components/ui/badge";

export function Orders() {
  const { orders } = useCart();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status?: string) => {
    const s = status?.toLowerCase() || "pending";
    switch (s) {
      case "delivered":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white border-transparent py-1 px-3 text-xs font-semibold rounded-full shadow-sm">
            Delivered
          </Badge>
        );
      case "preparing":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-transparent py-1 px-3 text-xs font-semibold rounded-full shadow-sm animate-pulse">
            Preparing
          </Badge>
        );
      case "out_for_delivery":
        return (
          <Badge className="bg-purple-500 hover:bg-purple-600 text-white border-transparent py-1 px-3 text-xs font-semibold rounded-full shadow-sm animate-pulse">
            Out for Delivery
          </Badge>
        );
      case "pending":
      default:
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-transparent py-1 px-3 text-xs font-semibold rounded-full shadow-sm">
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-pink-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">My Orders</h1>
          <p className="text-xl text-pink-100">View your order history</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {orders.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders yet. Start exploring our menu!
              </p>
              <a
                href="/menu"
                className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Browse Menu
              </a>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="shadow-lg overflow-hidden border border-gray-100">
                <CardContent className="p-0">
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Package className="w-6 h-6 text-pink-500" />
                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="font-bold text-lg">Order #{order.id}</h3>
                            {getStatusBadge(order.status)}
                          </div>
                          <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span>{formatDate(order.orderDate)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-pink-500">₹{order.grandTotal.toFixed(2)}</div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mt-1 justify-start md:justify-end">
                          <CreditCard className="w-4 h-4 text-gray-500" />
                          <span>{order.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Order Items</h4>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow"
                        >
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-gray-200">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900">{item.name}</h5>
                            <p className="text-sm text-gray-500 mt-0.5">
                              Quantity: {item.quantity} × ₹{item.price}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Tracking Stepper (Show for active tracking) */}
                    <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200 shadow-inner">
                      <h5 className="font-bold text-gray-800 mb-6 text-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
                        Live Delivery Progress
                      </h5>
                      <div className="flex items-center justify-between text-xs font-semibold relative max-w-xl mx-auto px-4">
                        {/* Connecting Line */}
                        <div className="absolute top-[14px] left-[12%] right-[12%] h-[3px] bg-gray-200 z-0">
                          <div 
                            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-700" 
                            style={{ 
                              width: 
                                order.status === "pending" ? "0%" : 
                                order.status === "preparing" ? "50%" : 
                                order.status === "out_for_delivery" ? "100%" : 
                                order.status === "delivered" ? "100%" : "0%"
                            }}
                          />
                        </div>

                        {/* Step 1: Placed */}
                        <div className="flex flex-col items-center z-10">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            ["pending", "preparing", "out_for_delivery", "delivered"].includes(order.status || "")
                              ? "bg-pink-500 border-pink-500 text-white shadow-md shadow-pink-500/20" 
                              : "bg-white border-gray-300 text-gray-400"
                          }`}>
                            ✓
                          </div>
                          <span className="mt-2 text-[10px] text-gray-600 font-medium">Placed</span>
                        </div>

                        {/* Step 2: Preparing */}
                        <div className="flex flex-col items-center z-10">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            ["preparing", "out_for_delivery", "delivered"].includes(order.status || "")
                              ? "bg-pink-500 border-pink-500 text-white shadow-md shadow-pink-500/20" 
                              : "bg-white border-gray-300 text-gray-400"
                          }`}>
                            👨‍🍳
                          </div>
                          <span className="mt-2 text-[10px] text-gray-600 font-medium">Kitchen</span>
                        </div>

                        {/* Step 3: Out for Delivery */}
                        <div className="flex flex-col items-center z-10">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            ["out_for_delivery", "delivered"].includes(order.status || "")
                              ? "bg-pink-500 border-pink-500 text-white shadow-md shadow-pink-500/20" 
                              : "bg-white border-gray-300 text-gray-400"
                          }`}>
                            🏍️
                          </div>
                          <span className="mt-2 text-[10px] text-gray-600 font-medium">On Way</span>
                        </div>

                        {/* Step 4: Delivered */}
                        <div className="flex flex-col items-center z-10">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            order.status === "delivered"
                              ? "bg-green-500 border-green-500 text-white shadow-md shadow-green-500/20" 
                              : "bg-white border-gray-300 text-gray-400"
                          }`}>
                            🏠
                          </div>
                          <span className="mt-2 text-[10px] text-gray-600 font-medium">Delivered</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="space-y-2 max-w-sm ml-auto">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal</span>
                          <span>₹{order.totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Delivery Fee</span>
                          <span>₹{order.deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>GST (5%)</span>
                          <span>₹{order.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-300">
                          <span>Total</span>
                          <span className="text-pink-500">₹{order.grandTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
