"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Give time for the store to hydrate from localStorage
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user?.isAdmin)) {
      router.push("/");
    }
  }, [isAuthenticated, user, router, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user?.isAdmin) {
    return null;
  }

  const navigation = [
    {
      name: "Analytics",
      href: "/admin",
      icon: LayoutDashboard,
      current: pathname === "/admin",
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: ShoppingBag,
      current: pathname === "/admin/orders",
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
      current: pathname === "/admin/products",
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
      current: pathname === "/admin/users",
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="bg-gray-50">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 top-20 bg-black/30 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={
          "fixed top-20 bottom-0 left-0 w-64 bg-white border-r border-gray-200 z-40 transition-transform md:translate-x-0 " +
          (isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0")
        }
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Printeez</h1>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
            {/* Close button on mobile */}
            <button
              className="ml-auto md:hidden p-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    item.current
                      ? "bg-primary-50 text-primary-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="border-t border-gray-200 px-4 py-4">
            <div className="flex items-center gap-3 px-4 py-2 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
            <Link
              href="/"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 mt-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
            >
              ← Back to Store
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content - wraps both main and footer */}
      <div className="min-h-screen md:ml-64">
        {/* Mobile header with menu */}
        <div className="md:hidden fixed top-15 left-0 right-0 z-20 bg-white border-b border-gray-200 px-3 py-2.5 flex items-center gap-4 shadow-sm">
          <button
            className="p-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setIsSidebarOpen((s) => !s)}
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-2xl font-bold text-gray-700">Admin Menu</span>
        </div>
        <div className="px-4 md:px-0 pt-14 md:pt-0">{children}</div>
      </div>
    </div>
  );
}
