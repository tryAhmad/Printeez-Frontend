"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { cartAPI } from "@/lib/api";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { items, setCart, updateQuantity, removeItem, clearCart } =
    useCartStore();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.getCart();
      setCart(response.data.items, response.data.totalAmount);
    } catch (error: any) {
      if (error.response?.status === 404) {
        setCart([], 0);
      } else {
        console.error("Failed to fetch cart:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (
    productId: string,
    size: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    setUpdating(true);
    try {
      await cartAPI.updateCartItem(productId, size, newQuantity);
      updateQuantity(productId, size, newQuantity);
      toast.success("Cart updated");
    } catch (error) {
      toast.error("Failed to update quantity");
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async (productId: string, size: string) => {
    try {
      await cartAPI.removeFromCart(productId, size);
      removeItem(productId, size);
      toast.success("Removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8 animate-pulse" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 mb-4 animate-pulse">
              <div className="flex gap-6">
                <div className="w-24 h-24 bg-gray-200 rounded" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="w-20 h-20 mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="text-gray-600 mb-8">
            You need to login to view your cart
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="w-20 h-20 mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">
            Add some products to get started!
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const total = calculateTotal();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              // Find the stock for the selected size
              const selectedSizeData = item.productId.sizes?.find(
                (s) => s.size === item.size
              );
              const availableStock = selectedSizeData?.stock || 0;

              return (
                <div
                  key={`${item.productId._id}-${item.size}`}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="flex gap-6">
                    {/* Image */}
                    <Link
                      href={`/products/${item.productId._id}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={
                          item.productId.imageUrl ||
                          "https://via.placeholder.com/150"
                        }
                        alt={item.productId.name}
                        loading="lazy"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1">
                      <Link href={`/products/${item.productId._id}`}>
                        <h3 className="font-semibold text-lg mb-1 hover:text-primary-600">
                          {item.productId.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm mb-2">
                        Size: {item.size}
                      </p>
                      <p className="text-primary-600 font-bold text-xl">
                        PKR {item.productId.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() =>
                          handleRemove(item.productId._id, item.size)
                        }
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId._id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          disabled={updating || item.quantity === 1}
                          className="w-8 h-8 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                        >
                          <Minus className="w-4 h-4 mx-auto" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId._id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          disabled={updating || item.quantity >= availableStock}
                          className="w-8 h-8 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                        >
                          <Plus className="w-4 h-4 mx-auto" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>PKR {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">
                    PKR {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors mb-4"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/products"
                className="block text-center text-primary-600 font-medium hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
