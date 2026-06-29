import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { User, Phone, MapPin, Mail, Sparkles, CheckCircle2, Loader2, Plus, Edit, Trash2, Home, Briefcase, PlusCircle, ArrowLeft } from "lucide-react";

export interface Address {
  id: string;
  label: string; // e.g. "Home", "Work", "Other"
  addressLine: string;
  city: string;
  state: string;
  pinCode: string;
  landmark?: string;
}

export function Profile() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  // Contact Details
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Address List State
  const [addresses, setAddresses] = useState<Address[]>([]);

  // Form states for Add/Edit Address
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [label, setLabel] = useState("Home");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("Chennai");
  const [state, setState] = useState("Tamil Nadu");
  const [pinCode, setPinCode] = useState("600017");
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
          setAddresses(data.addresses || []);
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

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setSaving(true);
    setSuccess("");

    try {
      await setDoc(doc(db, "users", currentUser.uid), {
        name,
        phone,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setSuccess("Contact details saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error saving contact details:", err);
      alert("Failed to save contact details.");
    } finally {
      setSaving(false);
    }
  };

  const handleOpenAddForm = () => {
    setEditingId(null);
    setLabel("Home");
    setAddressLine("");
    setCity("Chennai");
    setState("Tamil Nadu");
    setPinCode("600017");
    setLandmark("");
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (addr: Address) => {
    setEditingId(addr.id);
    setLabel(addr.label);
    setAddressLine(addr.addressLine);
    setCity(addr.city);
    setState(addr.state);
    setPinCode(addr.pinCode);
    setLandmark(addr.landmark || "");
    setIsFormOpen(true);
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setSaving(true);
    setSuccess("");

    let updatedAddresses = [...addresses];

    if (editingId) {
      // Edit mode
      updatedAddresses = updatedAddresses.map((addr) =>
        addr.id === editingId
          ? { id: editingId, label, addressLine, city, state, pinCode, landmark }
          : addr
      );
    } else {
      // Add mode
      const newAddress: Address = {
        id: `addr_${Date.now()}`,
        label,
        addressLine,
        city,
        state,
        pinCode,
        landmark
      };
      updatedAddresses.push(newAddress);
    }

    try {
      await setDoc(doc(db, "users", currentUser.uid), {
        addresses: updatedAddresses,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setAddresses(updatedAddresses);
      setSuccess(editingId ? "Address updated successfully!" : "New address added successfully!");
      setIsFormOpen(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error saving address:", err);
      alert("Failed to save address. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!currentUser) return;
    if (!confirm("Are you sure you want to delete this address?")) return;

    setSaving(true);
    setSuccess("");

    const updatedAddresses = addresses.filter((addr) => addr.id !== id);

    try {
      await setDoc(doc(db, "users", currentUser.uid), {
        addresses: updatedAddresses,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setAddresses(updatedAddresses);
      setSuccess("Address deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error deleting address:", err);
      alert("Failed to delete address.");
    } finally {
      setSaving(false);
    }
  };

  const getAddressIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l === "home") return <Home className="w-5 h-5 text-pink-500" />;
    if (l === "work" || l === "office") return <Briefcase className="w-5 h-5 text-purple-500" />;
    return <MapPin className="w-5 h-5 text-teal-500" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
        <p className="text-gray-400 font-medium">Loading profile context...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-gray-900 to-purple-500/5 z-0"></div>

      <section className="bg-gradient-to-br from-pink-500 to-purple-600 text-white py-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">My Address Manager</h1>
          <p className="text-xl text-pink-100">Add, edit, or remove delivery addresses for fast checkout</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-4 duration-300">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {!isFormOpen ? (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column: Contact details edit */}
            <div className="md:col-span-1 space-y-6">
              <Card className="bg-gray-950 border-gray-800 shadow-xl">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-white">
                      {name ? name.split(" ").map((n) => n[0]).join("") : "U"}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white text-center mb-1">{name || "User"}</h3>
                  <p className="text-gray-400 text-xs text-center mb-6 truncate">{currentUser?.email}</p>

                  <form onSubmit={handleSaveContact} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Full Name</label>
                      <Input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-600 focus:border-pink-500 focus:ring-pink-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Phone Number</label>
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-600 focus:border-pink-500 focus:ring-pink-500/20"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={saving}
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium cursor-pointer"
                    >
                      Save Profile
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Address lists */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Saved Delivery Addresses</h2>
                <Button 
                  onClick={handleOpenAddForm}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white cursor-pointer"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Address
                </Button>
              </div>

              {addresses.length === 0 ? (
                <Card className="bg-gray-950 border-gray-800 text-center py-12 border-dashed">
                  <CardContent>
                    <MapPin className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">No saved addresses found</p>
                    <p className="text-sm text-gray-500 mt-1 mb-6">Add an address to speed up your checkouts.</p>
                    <Button onClick={handleOpenAddForm} className="bg-pink-500 hover:bg-pink-600 text-white">
                      Add Your First Address
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <Card key={addr.id} className="bg-gray-950 border-gray-800 hover:border-pink-500/40 hover:shadow-lg transition-all duration-300 relative group">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          {getAddressIcon(addr.label)}
                          <span className="font-bold text-gray-200">{addr.label}</span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-400">
                          <p className="text-white font-medium">{addr.addressLine}</p>
                          <p>{addr.city}, {addr.state} - {addr.pinCode}</p>
                          {addr.landmark && <p className="text-xs text-gray-500">Landmark: {addr.landmark}</p>}
                        </div>

                        <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleOpenEditForm(addr)}
                            className="p-1.5 bg-gray-900 border border-gray-850 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                            title="Edit Address"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="p-1.5 bg-gray-900 border border-gray-850 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                            title="Delete Address"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Address Entry Form (Add/Edit) */
          <Card className="bg-gray-950 border-gray-800 max-w-2xl mx-auto shadow-2xl animate-in zoom-in-95 duration-200">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-8 border-b border-gray-900 pb-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-pink-500" />
                  {editingId ? "Edit Delivery Address" : "Add Delivery Address"}
                </h2>
                <Button 
                  variant="ghost" 
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-400 hover:text-white hover:bg-gray-900"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </div>

              <form onSubmit={handleSaveAddress} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Address Label *</label>
                  <div className="flex gap-3">
                    {["Home", "Work", "Other"].map((l) => (
                      <button
                        type="button"
                        key={l}
                        onClick={() => setLabel(l)}
                        className={`flex-1 py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all cursor-pointer ${
                          label === l
                            ? "bg-pink-500/10 border-pink-500 text-pink-500 shadow-md shadow-pink-500/10"
                            : "bg-gray-900 border-gray-850 text-gray-400 hover:border-gray-700"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                  {label === "Other" && (
                    <Input
                      type="text"
                      placeholder="e.g. Parents House, Gym, Hostels"
                      required
                      value={label === "Other" ? "" : label}
                      onChange={(e) => setLabel(e.target.value)}
                      className="mt-3 bg-gray-900 border-gray-850 text-white placeholder:text-gray-600 focus:border-pink-500 focus:ring-pink-500/20"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Address Line *</label>
                  <Input
                    type="text"
                    required
                    placeholder="House No, Building name, Street name"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    className="bg-gray-900 border-gray-850 text-white placeholder:text-gray-600 focus:border-pink-500 focus:ring-pink-500/20"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">City *</label>
                    <Input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-gray-900 border-gray-850 text-white placeholder:text-gray-600 focus:border-pink-500 focus:ring-pink-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">State *</label>
                    <Input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="bg-gray-900 border-gray-850 text-white placeholder:text-gray-600 focus:border-pink-500 focus:ring-pink-500/20"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">PIN Code *</label>
                    <Input
                      type="text"
                      required
                      placeholder="600017"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      className="bg-gray-900 border-gray-850 text-white placeholder:text-gray-600 focus:border-pink-500 focus:ring-pink-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Landmark</label>
                    <Input
                      type="text"
                      placeholder="Near metro, school, hospital..."
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="bg-gray-900 border-gray-850 text-white placeholder:text-gray-600 focus:border-pink-500 focus:ring-pink-500/20"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsFormOpen(false)}
                    className="flex-1 border-gray-850 text-gray-400 hover:text-white hover:bg-gray-900 cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white cursor-pointer"
                  >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Address"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
