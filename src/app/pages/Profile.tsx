import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { User, Phone, MapPin, Mail, Sparkles, CheckCircle2, Loader2 } from "lucide-react";

export function Profile() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Profile Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [landmark, setLandmark] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    const fetchUserProfile = async () => {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || currentUser.displayName || "");
          setPhone(data.phone || "");
          setAddressLine(data.addressLine || "");
          setCity(data.city || "");
          setState(data.state || "");
          setPinCode(data.pinCode || "");
          setLandmark(data.landmark || "");
        } else {
          setName(currentUser.displayName || "");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setSaving(true);
    setSuccess(false);

    try {
      await setDoc(doc(db, "users", currentUser.uid), {
        uid: currentUser.uid,
        email: currentUser.email,
        name,
        phone,
        addressLine,
        city,
        state,
        pinCode,
        landmark,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error saving profile details:", err);
      alert("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
        <p className="text-gray-400 font-medium">Retrieving profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-gray-900 to-purple-500/5 z-0"></div>

      <section className="bg-gradient-to-br from-pink-500 to-purple-600 text-white py-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">My Profile</h1>
          <p className="text-xl text-pink-100">Manage your address and contact information</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-4 duration-300">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>Profile saved successfully! Your details will now be auto-filled during checkout.</span>
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Profile Avatar Card */}
            <div className="md:col-span-1">
              <Card className="bg-gray-950 border-gray-800 text-center shadow-xl sticky top-24">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg shadow-pink-500/20">
                    <span className="text-4xl font-bold text-white">
                      {name ? name.split(" ").map((n) => n[0]).join("") : "U"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{name || "User"}</h3>
                  <p className="text-gray-400 text-sm mb-4 truncate">{currentUser?.email}</p>
                  <div className="inline-flex items-center gap-2 bg-gray-900 border border-pink-500/20 px-3 py-1 rounded-full text-xs text-pink-500 font-medium">
                    <Sparkles className="w-3 h-3" />
                    Preferred Customer
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Information Form */}
            <div className="md:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card className="bg-gray-950 border-gray-800 shadow-xl">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-gray-900 pb-3">
                    <User className="w-5 h-5 text-pink-500" />
                    Contact Information
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
                      <Input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-600 focus:border-pink-500 focus:ring-pink-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-10 bg-gray-900 border-gray-800 text-white placeholder:text-gray-600 focus:border-pink-500 focus:ring-pink-500/20"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address (Read-only)</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        type="email"
                        readOnly
                        value={currentUser?.email || ""}
                        className="pl-10 bg-gray-900 border-gray-800 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Details */}
              <Card className="bg-gray-950 border-gray-800 shadow-xl">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-gray-900 pb-3">
                    <MapPin className="w-5 h-5 text-pink-500" />
                    Saved Delivery Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Address Line</label>
                      <Input
                        type="text"
                        placeholder="House No, Apartment, Street name"
                        value={addressLine}
                        onChange={(e) => setAddressLine(e.target.value)}
                        className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-600 focus:border-pink-500 focus:ring-pink-500/20"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">City</label>
                        <Input
                          type="text"
                          placeholder="Chennai"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-600 focus:border-pink-500 focus:ring-pink-500/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">State</label>
                        <Input
                          type="text"
                          placeholder="Tamil Nadu"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-600 focus:border-pink-500 focus:ring-pink-500/20"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">PIN Code</label>
                        <Input
                          type="text"
                          placeholder="600017"
                          value={pinCode}
                          onChange={(e) => setPinCode(e.target.value)}
                          className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-600 focus:border-pink-500 focus:ring-pink-500/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Landmark</label>
                        <Input
                          type="text"
                          placeholder="Near metro station, school, etc."
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                          className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-600 focus:border-pink-500 focus:ring-pink-500/20"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-6 px-8 text-lg font-medium shadow-md shadow-pink-500/10 cursor-pointer"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Saving Profile...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
