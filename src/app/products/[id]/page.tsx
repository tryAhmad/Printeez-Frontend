"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { productAPI, cartAPI, wishlistAPI } from "@/lib/api";
import {
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  ArrowLeft,
  Star,
} from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import ProductStructuredData from "@/components/seo/ProductStructuredData";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { Product } from "@/types";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const {
    isInWishlist,
    addItem: addToWishlistStore,
    removeItem: removeFromWishlistStore,
  } = useWishlistStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const addToCartStore = useCartStore((state: any) => state.addItem);

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string);
    }
  }, [params.id]);

  const fetchProduct = async (id: string) => {
    try {
      setLoading(true);
      const response = await productAPI.getProductById(id);
      setProduct(response.data);

      // Fetch related products
      if (response.data.category) {
        const relatedRes = await productAPI.getByCategory(
          response.data.category
        );
        setRelatedProducts(
          relatedRes.data.filter((p: Product) => p._id !== id).slice(0, 4)
        );
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
      toast.error("Product not found");
      router.push("/products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    // Check if user is authenticated first
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      router.push("/login");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const sizeOption = product.sizes.find((s) => s.size === selectedSize);
    if (!sizeOption || sizeOption.stock === 0) {
      toast.error("Selected size is out of stock");
      return;
    }

    if (quantity > sizeOption.stock) {
      toast.error("Not enough stock available for selected size");
      return;
    }

    try {
      console.log("Adding to cart:", {
        productId: product._id,
        quantity,
        size: selectedSize,
      });

      const response = await cartAPI.addToCart({
        productId: product._id,
        quantity,
        size: selectedSize,
      });

      console.log("Cart API response:", response.data);
      addToCartStore({ productId: product, quantity, size: selectedSize });
      toast.success("Added to cart!");
    } catch (error: any) {
      console.error("Cart error:", error.response?.data || error);

      // Check for authentication errors
      if (error.response?.status === 401 || error.response?.status === 400) {
        const errorMsg = error.response?.data?.error || "";
        if (
          errorMsg.includes("token") ||
          errorMsg.includes("denied") ||
          errorMsg.includes("Access denied")
        ) {
          toast.error("Please login to add items to cart");
          router.push("/login");
          return;
        }
      }

      // Show specific error message from backend
      const errorMsg =
        error.response?.data?.error ||
        "Failed to add item to cart. Please try again.";
      toast.error(errorMsg);
    }
  };

  const handleWishlistToggle = async () => {
    if (!product) return;

    if (!isAuthenticated) {
      toast.error("Please login to add items to wishlist");
      router.push("/login");
      return;
    }

    try {
      const inWishlist = isInWishlist(product._id);

      if (inWishlist) {
        await wishlistAPI.removeFromWishlist(product._id);
        removeFromWishlistStore(product._id);
        toast.success("Removed from wishlist");
      } else {
        await wishlistAPI.addToWishlist(product._id);
        addToWishlistStore(product);
        toast.success("Added to wishlist!");
      }
    } catch (error: any) {
      console.error("Wishlist error:", error);

      if (error.response?.status === 401) {
        toast.error("Please login to manage wishlist");
        router.push("/login");
        return;
      }

      const errorMsg =
        error.response?.data?.error || "Failed to update wishlist";
      toast.error(errorMsg);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-xl" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-24 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div>
      {/* SEO Structured Data */}
      <ProductStructuredData product={product} />

      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </Link>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border-2 border-gray-200">
            <img
              src={
                product.imageUrl ||
                "https://via.placeholder.com/800x800?text=No+Image"
              }
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-contain"
            />
            {product.sizes.every((s) => s.stock === 0) && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg">
                  OUT OF STOCK
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-primary-600 font-medium uppercase tracking-wider mb-2">
              {product.category}
            </p>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            {/* Rating Display */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const avgRating = product.averageRating
                    ? Number(product.averageRating)
                    : 0;
                  return (
                    <span key={star}>
                      {star <= Math.floor(avgRating) ? (
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ) : star === Math.ceil(avgRating) &&
                        avgRating % 1 !== 0 ? (
                        <div className="relative w-5 h-5">
                          <Star className="w-5 h-5 text-gray-300 absolute" />
                          <div
                            className="overflow-hidden absolute"
                            style={{
                              width: `${(avgRating % 1) * 100}%`,
                            }}
                          >
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                      ) : (
                        <Star className="w-5 h-5 text-gray-300" />
                      )}
                    </span>
                  );
                })}
              </div>
              <span className="text-lg font-semibold text-gray-700">
                {product.averageRating
                  ? Number(product.averageRating).toFixed(1)
                  : "0.0"}
              </span>
              <span className="text-sm text-gray-500">
                ({product.totalRatings || 0}{" "}
                {product.totalRatings === 1 ? "rating" : "ratings"})
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-primary-600">
                PKR {product.price.toFixed(2)}
              </span>
              {selectedSize &&
                product.sizes.find((s) => s.size === selectedSize)?.stock! >
                  0 &&
                product.sizes.find((s) => s.size === selectedSize)?.stock! <
                  10 && (
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                    Only{" "}
                    {product.sizes.find((s) => s.size === selectedSize)?.stock}{" "}
                    left!
                  </span>
                )}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description ||
                "Premium quality printed t-shirt with unique design. Made from 100% cotton for maximum comfort and durability."}
            </p>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Select Size</h3>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((sizeOption) => (
                  <button
                    key={sizeOption.size}
                    onClick={() => setSelectedSize(sizeOption.size)}
                    disabled={sizeOption.stock === 0}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      selectedSize === sizeOption.size
                        ? "bg-primary-600 text-white ring-2 ring-primary-600 ring-offset-2"
                        : sizeOption.stock === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {sizeOption.size}
                  </button>
                ))}
              </div>
              {selectedSize && (
                <p className="text-sm text-gray-600 mt-2">
                  Stock available:{" "}
                  {product.sizes.find((s) => s.size === selectedSize)?.stock}
                </p>
              )}
            </div>

            {/* Quantity */}
            {selectedSize &&
              product.sizes.find((s) => s.size === selectedSize)?.stock! >
                0 && (
                <div className="mb-8">
                  <h3 className="font-semibold mb-3">Quantity</h3>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 font-semibold"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(
                          Math.min(
                            product.sizes.find((s) => s.size === selectedSize)
                              ?.stock || 1,
                            quantity + 1
                          )
                        )
                      }
                      className="w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={
                  !selectedSize ||
                  product.sizes.find((s) => s.size === selectedSize)?.stock ===
                    0
                }
                className="flex-1 bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                {!selectedSize
                  ? "Select Size"
                  : product.sizes.find((s) => s.size === selectedSize)
                      ?.stock === 0
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`px-6 py-4 border-2 rounded-lg transition-colors ${
                  isInWishlist(product._id)
                    ? "border-red-500 bg-red-50 text-red-500"
                    : "border-gray-300 hover:border-red-500 hover:text-red-500"
                }`}
              >
                <Heart
                  className={`w-6 h-6 ${
                    isInWishlist(product._id) ? "fill-red-500" : ""
                  }`}
                />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-primary-600" />
                <div>
                  <p className="font-semibold text-sm">Free Shipping</p>
                  <p className="text-xs text-gray-500">
                    On orders over PKR 5000
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary-600" />
                <div>
                  <p className="font-semibold text-sm">Quality Guaranteed</p>
                  <p className="text-xs text-gray-500">Premium materials</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
