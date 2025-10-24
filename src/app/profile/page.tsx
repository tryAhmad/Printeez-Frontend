"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { authAPI } from "@/lib/api";
import { User, Mail, MapPin, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, updateUser } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [originalData, setOriginalData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
  });
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
  });

  // Fetch fresh profile on mount to ensure fields (like address) are up-to-date
  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        const res = await authAPI.getProfile();
        const profile = res.data;
        if (!isMounted) return;
        updateUser(profile);
        const profileData = {
          name: profile.name || "",
          email: profile.email || "",
          address: profile.address || "",
        };
        setOriginalData(profileData);
        setFormData(profileData);
      } catch (err) {
        // Silent fail; interceptor will redirect on 401
      } finally {
        if (isMounted) setProfileLoading(false);
      }
    };

    fetchProfile();
    return () => {
      isMounted = false;
    };
  }, [updateUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authAPI.updateProfile({
        name: formData.name,
        address: formData.address,
      });
      // Backend returns the updated user shape directly (not wrapped)
      updateUser(res.data);
      const updatedData = {
        name: res.data.name || "",
        email: res.data.email || "",
        address: res.data.address || "",
      };
      setOriginalData(updatedData);
      setFormData(updatedData);
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.error || "Failed to update profile";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Check authentication with useEffect to avoid render-time side effects
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Show nothing while redirecting
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Profile</h1>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-3xl">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {user?.name || formData.name}
                </h2>
                <p className="text-gray-600">{user?.email || formData.email}</p>
              </div>
            </div>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="px-6 py-2 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                    placeholder="your@email.com"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    placeholder="123 Main Street, City, State 12345"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setFormData(originalData);
                  }}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Full Name
                </h3>
                <p className="text-lg font-medium">
                  {user?.name || formData.name}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Email Address
                </h3>
                <p className="text-lg font-medium">
                  {user?.email || formData.email}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Address
                </h3>
                <p className="text-lg font-medium">
                  {user?.address || formData.address || "No address provided"}
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 pt-8 border-t">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Account Actions</h3>
                <p className="text-sm text-gray-600">
                  Manage your account settings
                </p>
              </div>
              <button
                onClick={() => router.push("/orders")}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                View Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
