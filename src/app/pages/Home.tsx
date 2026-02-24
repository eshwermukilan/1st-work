import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Clock, Truck, ChefHat, Star, ArrowRight, Sparkles, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Home() {
  const { addToCart } = useCart();

  const features = [
    {
      icon: Clock,
      title: "Quick Delivery",
      description: "Get your food delivered within 30 minutes",
      color: "bg-orange-100 text-orange-500",
    },
    {
      icon: ChefHat,
      title: "Expert Chefs",
      description: "Prepared by professional culinary experts",
      color: "bg-pink-100 text-pink-500",
    },
    {
      icon: Truck,
      title: "Fast & Safe",
      description: "Contactless delivery with hygiene protocols",
      color: "bg-purple-100 text-purple-500",
    },
    {
      icon: Star,
      title: "Quality Food",
      description: "Fresh ingredients and amazing taste guaranteed",
      color: "bg-teal-100 text-teal-500",
    },
  ];

  const popularDishes = [
    {
      id: 1,
      name: "Hyderabadi Biryani",
      description: "Aromatic basmati rice with tender chicken and spices",
      price: 299,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1714611626323-5ba6204453be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwaW5kaWFuJTIwZm9vZHxlbnwxfHx8fDE3NzExMzM1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      name: "Masala Dosa",
      description: "Crispy South Indian crepe with spiced potato filling",
      price: 149,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1743517894265-c86ab035adef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNhbGElMjBkb3NhJTIwc291dGglMjBpbmRpYW58ZW58MXx8fHwxNzcxMjQ5NTU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      name: "Paneer Tikka",
      description: "Grilled cottage cheese marinated in tandoori spices",
      price: 249,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1666001120694-3ebe8fd207be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5lZXIlMjB0aWtrYSUyMGluZGlhbnxlbnwxfHx8fDE3NzEyMjI2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Browse Menu",
      description: "Explore our wide variety of delicious dishes",
      color: "from-pink-500 to-orange-500",
    },
    {
      number: "02",
      title: "Place Order",
      description: "Select your favorites and customize as you like",
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "03",
      title: "Quick Delivery",
      description: "Get your food delivered hot and fresh",
      color: "from-teal-500 to-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-gray-800 border border-pink-500/20 px-4 py-2 rounded-full shadow-sm">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span className="text-sm text-gray-200">Cloud Kitchen Excellence</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Delicious Food{" "}
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Delivered
                </span>{" "}
                to Your Door
              </h1>
              <p className="text-lg text-gray-300">
                Experience restaurant-quality meals from our cloud kitchen. Fresh ingredients, expert chefs, and lightning-fast delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/menu">
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 text-lg">
                    Explore Menu
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500/10 px-8 py-6 text-lg"
                >
                  How It Works
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-white">10K+</div>
                  <div className="text-sm text-gray-400">Happy Customers</div>
                </div>
                <div className="w-px h-12 bg-gray-700"></div>
                <div>
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-sm text-gray-400">Menu Items</div>
                </div>
                <div className="w-px h-12 bg-gray-700"></div>
                <div>
                  <div className="text-3xl font-bold text-white">4.9⭐</div>
                  <div className="text-sm text-gray-400">Average Rating</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1755811248324-3c9b7c8865fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXRpbmclMjByZXN0YXVyYW50fGVufDF8fHx8MTc3MTIyMDc2Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Delicious food"
                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Digital Chef?</h2>
            <p className="text-lg text-gray-400">Experience the best cloud kitchen service</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-900 border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Popular Dishes</h2>
            <p className="text-lg text-gray-400">Discover our most loved menu items</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDishes.map((dish, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-gray-900/90 px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-semibold text-white">{dish.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{dish.name}</h3>
                  <p className="text-gray-400 mb-4">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pink-500">₹{dish.price}</span>
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white" onClick={() => addToCart(dish)}>
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/menu">
              <Button
                variant="outline"
                className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500/10 px-8 py-6 text-lg"
              >
                View Full Menu
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-pink-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-pink-100">Three simple steps to delicious food</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <span className="text-3xl font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-pink-100">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-white/30"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Order?</h2>
          <p className="text-lg text-gray-400 mb-8">
            Join thousands of satisfied customers and enjoy restaurant-quality meals at home
          </p>
          <Link to="/menu">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-12 py-6 text-lg">
              Start Ordering Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
