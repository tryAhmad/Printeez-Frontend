"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { wishlistAPI } from "@/lib/api";
import ProductCard from "@/components/products/ProductCard";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { items, setWishlist } = useWishlistStore();
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Wait for client-side hydration before checking auth
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only check authentication after client-side hydration
    if (!isClient) return;

    if (!isAuthenticated) {
      router.push("/login?redirect=/wishlist");
      return;
    }
    fetchWishlist();
  }, [isAuthenticated, router, isClient]);

  const fetchWishlist = async () => {
    try {
      const response = await wishlistAPI.getWishlist();
      // Backend returns { products: [{ productId: Product | null, addedAt: ... }, ...] }
      // Filter out nulls (e.g., when a product was deleted)
      const products = (response.data.products || [])
        .map((item: any) => item?.productId || null)
        .filter((p: any) => p && p._id);
      setWishlist(products);
    } catch (error: any) {
      if (error.response?.status === 404) {
        setWishlist([]);
      } else {
        console.error("Failed to fetch wishlist:", error);
        toast.error("Failed to load wishlist");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Wishlist</h1>
        <p className="text-gray-600">{items.length} items saved</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="w-20 h-20 mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-8">
            Save products you love to your wishlist!
          </p>
          <button
            onClick={() => router.push("/products")}
            className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items
            .filter((p) => Boolean(p))
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
}
