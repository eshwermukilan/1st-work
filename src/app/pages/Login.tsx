import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Sparkles, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect back to checkout or home after login
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Failed to sign in. Please check your internet connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-gray-900 to-purple-500/10 z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl z-0"></div>

      <Card className="max-w-md w-full border-gray-800 bg-gray-950/80 backdrop-blur-xl relative z-10 shadow-2xl">
        <CardContent className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gray-900 border border-pink-500/20 px-4 py-2 rounded-full shadow-sm mb-4">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="text-sm text-gray-200">Welcome Back</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Sign In to Digital Chef
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Access your orders, favorites, and checkout faster.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-start gap-3 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-pink-500 focus:ring-pink-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-pink-500 focus:ring-pink-500/20"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-6 text-lg font-medium transition-all duration-200 transform hover:scale-[1.01]"
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
            </Button>
          </form>

          <div className="mt-8 text-center border-t border-gray-900 pt-6">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                state={{ from: location.state?.from }}
                className="font-medium text-pink-500 hover:text-pink-400 transition-colors"
              >
                Sign Up Now
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
