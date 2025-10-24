"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { wishlistAPI } from "@/lib/api";
import toast from "react-hot-toast";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  showNewBadge?: boolean;
}

export default function ProductCard({
  product,
  showNewBadge = false,
}: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const {
    isInWishlist,
    addItem: addToWishlistStore,
    removeItem: removeFromWishlistStore,
  } = useWishlistStore();

  const inWishlist = isInWishlist(product._id);
  const totalStock = product.sizes.reduce((sum, s) => sum + s.stock, 0);
  const availableSizes = product.sizes.filter((s) => s.stock > 0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Just navigate to product detail page to select size
    window.location.href = `/products/${product._id}`;
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      window.location.href = "/login";
      return;
    }

    try {
      if (inWishlist) {
        await wishlistAPI.removeFromWishlist(product._id);
        removeFromWishlistStore(product._id);
        toast.success("Removed from wishlist");
      } else {
        await wishlistAPI.addToWishlist(product._id);
        addToWishlistStore(product);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
    }
  };

  return (
    <Link href={`/products/${product._id}`} className="group">
      <div className="card overflow-hidden h-full">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {showNewBadge && (
            <span className="absolute top-3 left-3 z-10 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              NEW
            </span>
          )}

          {totalStock === 0 && (
            <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              OUT OF STOCK
            </span>
          )}

          <img
            src={
              product.imageUrl ||
              "https://via.placeholder.com/400x400?text=No+Image"
            }
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          />

          {/* Overlay Buttons */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-center p-4 opacity-0 group-hover:opacity-100">
            <div className="flex gap-2 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <button
                onClick={handleAddToCart}
                disabled={totalStock === 0}
                className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm font-medium">Select Size</span>
              </button>

              {isAuthenticated && (
                <button
                  onClick={handleWishlistToggle}
                  className={`p-2 rounded-lg transition-colors ${
                    inWishlist
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`}
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary-600">
              PKR {Math.round(product.price)}
            </span>
            <span className="text-sm text-gray-500">
              {availableSizes.length} size
              {availableSizes.length !== 1 ? "s" : ""} available
            </span>
          </div>
          {totalStock > 0 && totalStock < 10 && (
            <p className="text-xs text-orange-600 mt-2">
              Only {totalStock} left!
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
