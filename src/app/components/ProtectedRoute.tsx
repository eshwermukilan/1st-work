import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
        <p className="text-gray-400 font-medium animate-pulse">Loading secure kitchen connection...</p>
      </div>
    );
  }

  if (!currentUser) {
    // Redirect to login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
