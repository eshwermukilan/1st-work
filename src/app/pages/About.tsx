import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Award, Heart, Leaf, Users, Target, Zap } from "lucide-react";

export function About() {
  const values = [
    {
      icon: Heart,
      title: "Passion for Food",
      description: "We love what we do and it shows in every dish we prepare",
      color: "bg-pink-100 text-pink-500",
    },
    {
      icon: Award,
      title: "Quality First",
      description: "Only the finest ingredients meet our kitchen standards",
      color: "bg-purple-100 text-purple-500",
    },
    {
      icon: Leaf,
      title: "Fresh & Healthy",
      description: "Fresh, locally-sourced ingredients for your well-being",
      color: "bg-teal-100 text-teal-500",
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Efficient service to get your food to you quickly",
      color: "bg-orange-100 text-orange-500",
    },
  ];

  const stats = [
    { number: "50+", label: "Expert Chefs" },
    { number: "10K+", label: "Happy Customers" },
    { number: "500+", label: "Menu Items" },
    { number: "15+", label: "Cities Served" },
  ];

  const team = [
    { name: "Bhava", role: "", expertise: "South Indian Cuisine" },
    { name: "Swaroopa", role: "Pastry Chef", expertise: "Desserts & Baking" },
    { name: "Ashok", role: "Executive Chef", expertise: "Tamil Nadu Specialties" },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-pink-500 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">About Digital Chef</h1>
          <p className="text-xl text-pink-100 max-w-2xl mx-auto">
            Redefining cloud kitchen excellence with passion, quality, and innovation
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Digital Chef was born from a simple idea: bring restaurant-quality food to everyone's
                  doorstep without the overhead of a traditional restaurant. In 2020, we started our
                  journey in a small cloud kitchen with a team of passionate chefs.
                </p>
                <p>
                  Today, we've grown into a multi-city operation serving thousands of satisfied
                  customers daily. Our cloud kitchen model allows us to focus on what matters most -
                  creating delicious, high-quality food at affordable prices.
                </p>
                <p>
                  We believe in combining culinary excellence with modern technology to deliver an
                  unmatched dining experience. Every dish is prepared fresh, with locally-sourced
                  ingredients and authentic recipes from around the world.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1755811248324-3c9b7c8865fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXRpbmclMjByZXN0YXVyYW50fGVufDF8fHx8MTc3MTIyMDc2Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Our kitchen"
                className="relative rounded-3xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-lg text-gray-400">What drives us every day</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-pink-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-pink-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="bg-gray-900 border-2 border-pink-500/30 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-pink-100 text-pink-500 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-gray-400 leading-relaxed">
                  To make high-quality, delicious food accessible to everyone through innovative cloud
                  kitchen technology, exceptional culinary expertise, and uncompromising commitment to
                  food safety and customer satisfaction.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-2 border-purple-500/30 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 text-purple-500 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
                <p className="text-gray-400 leading-relaxed">
                  To become the most trusted and loved cloud kitchen brand globally, revolutionizing the
                  food delivery industry by setting new standards for quality, sustainability, and
                  customer experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Chefs</h2>
            <p className="text-lg text-gray-400">The talented team behind your favorite dishes</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 text-center hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-pink-500 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.expertise}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}