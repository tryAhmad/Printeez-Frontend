"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { orderAPI, cartAPI } from "@/lib/api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { ShoppingBag, MapPin, Phone, User as UserIcon } from "lucide-react";
import Link from "next/link";
import SuccessModal from "@/components/common/SuccessModal";

interface CheckoutForm {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { items, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/checkout");
    }
    // Don't redirect to cart if we've just placed an order and are showing the success modal
    // if (!showSuccess && items.length === 0) {
    //   router.push("/cart");
    // }
  }, [isAuthenticated, items, router, showSuccess]);

  const calculateTotal = () => {
    return items.reduce(
      (total: number, item: any) =>
        total + item.productId.price * item.quantity,
      0
    );
  };

  const onSubmit = async (data: CheckoutForm) => {
    setLoading(true);
    const fullAddress = `${data.address}, ${data.city}, ${data.postalCode}`;

    const orderData = {
      products: items.map((item: any) => ({
        productId: item.productId._id,
        size: item.size,
        quantity: item.quantity,
      })),
      address: fullAddress,
    };

    try {
      const response = await orderAPI.createOrder(orderData);

      // Clear cart after successful order
      await cartAPI.clearCart();
      clearCart();

      setPlacedOrderId(response.data?._id || null);
      setShowSuccess(true);
      toast.success("Order placed successfully!");
      // Do not auto-redirect; let the modal handle navigation
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || "Failed to place order";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || (items.length === 0 && !showSuccess)) {
    return null;
  }

  const total = calculateTotal();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Success Modal */}
      <SuccessModal
        open={showSuccess}
        title="Order placed successfully"
        message={
          placedOrderId
            ? `Your order #${placedOrderId} has been placed. You can track it from your orders.`
            : "Your order has been placed. You can track it from your orders."
        }
        primary={{
          label: "View Orders",
          onClick: () => {
            setShowSuccess(false);
            router.push("/orders");
          },
        }}
        secondary={{
          label: "Continue Shopping",
          onClick: () => {
            setShowSuccess(false);
            router.push("/products");
          },
        }}
        onClose={() => setShowSuccess(false)}
      />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary-600" />
                Delivery Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    type="text"
                    defaultValue={user?.name}
                    className="input"
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10,}$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                    type="tel"
                    className="input"
                    placeholder="+1 234 567 8900"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    {...register("address", {
                      required: "Address is required",
                    })}
                    type="text"
                    defaultValue={user?.address}
                    className="input"
                    placeholder="123 Main Street"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      {...register("city", { required: "City is required" })}
                      type="text"
                      className="input"
                      placeholder="New York"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code *
                    </label>
                    <input
                      {...register("postalCode", {
                        required: "Postal code is required",
                      })}
                      type="text"
                      className="input"
                      placeholder="10001"
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Payment Method
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">
                        Pay when you receive your order
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map((item: any) => (
                  <div key={item.productId._id} className="flex gap-3">
                    <img
                      src={
                        item.productId.imageUrl ||
                        "https://via.placeholder.com/60"
                      }
                      alt={item.productId.name}
                      loading="lazy"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm line-clamp-2">
                        {item.productId.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      PKR {(item.productId.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
