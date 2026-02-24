import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["No. 45, Anna Salai, T. Nagar", "Chennai, Tamil Nadu 600017"],
      color: "bg-pink-100 text-pink-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 98765 43210", "+91 98765 43211"],
      color: "bg-purple-100 text-purple-500",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@digitalchef.com", "support@digitalchef.com"],
      color: "bg-teal-100 text-teal-500",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["24/7", "Delivery available all day"],
      color: "bg-orange-100 text-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-pink-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-pink-100">We'd love to hear from you</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className={`w-14 h-14 ${info.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-sm text-gray-600">
                    {detail}
                  </p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form and Map */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <Input
                      type="text"
                      placeholder="John"
                      required
                      className="bg-gray-50 border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Doe"
                      required
                      className="bg-gray-50 border-gray-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="john.doe@example.com"
                    required
                    className="bg-gray-50 border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="bg-gray-50 border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    type="text"
                    placeholder="How can we help you?"
                    required
                    className="bg-gray-50 border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    required
                    className="bg-gray-50 border-gray-200 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-6"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Map & Additional Info */}
          <div className="space-y-6">
            <Card className="shadow-xl overflow-hidden">
              <div className="bg-gray-200 h-80 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                  <p className="text-gray-600">Map Integration Placeholder</p>
                  <p className="text-sm text-gray-500">No. 45, Anna Salai, T. Nagar, Chennai</p>
                </div>
              </div>
            </Card>

            <Card className="shadow-xl bg-gradient-to-br from-pink-500 to-purple-600 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
                <p className="mb-6 text-pink-100">
                  Our customer support team is available to help you with any questions or concerns.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <p className="text-sm text-pink-100">
                      Average response time: Under 2 hours
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <p className="text-sm text-pink-100">
                      24/7 customer support available
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <p className="text-sm text-pink-100">
                      Multiple channels: phone, email, chat
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-2 border-orange-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Feedback & Suggestions</h3>
                <p className="text-gray-600 mb-4">
                  We value your feedback! Let us know how we can improve your Digital Chef experience.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50"
                >
                  Share Feedback
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">What are your delivery hours?</h3>
                <p className="text-gray-600 text-sm">
                  We deliver 7 days a week from 9:00 AM to 11:00 PM. Orders placed outside these
                  hours will be processed the next day.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Do you offer catering services?</h3>
                <p className="text-gray-600 text-sm">
                  Yes! We provide catering for events, parties, and corporate functions. Contact us
                  at least 48 hours in advance to discuss your requirements.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Can I customize my order?</h3>
                <p className="text-gray-600 text-sm">
                  Absolutely! We accommodate dietary restrictions and special requests. Just add a
                  note to your order or call us directly.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">What is your refund policy?</h3>
                <p className="text-gray-600 text-sm">
                  We offer a 100% satisfaction guarantee. If you're not happy with your order,
                  contact us within 24 hours for a refund or replacement.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}