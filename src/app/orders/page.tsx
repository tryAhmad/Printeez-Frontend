"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { orderAPI, productAPI } from "@/lib/api";
import { Package, Calendar, DollarSign, MapPin, Star } from "lucide-react";
import toast from "react-hot-toast";

interface OrderProductItem {
  productId:
    | string
    | {
        _id: string;
        name: string;
        price: number;
        imageUrl?: string;
      };
  size: string;
  quantity: number;
  // Enriched by API for convenience
  productName?: string;
  price?: number;
  userRating?: number | null;
}

interface Order {
  _id: string;
  products: OrderProductItem[];
  totalAmount: number;
  status: string;
  address: string;
  paymentMethod: string;
  createdAt: string;
}

function RatingComponent({
  orderId,
  productId,
  initialRating,
}: {
  orderId: string;
  productId: string;
  initialRating?: number | null;
}) {
  const [rating, setRating] = useState(initialRating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitted, setSubmitted] = useState(!!initialRating);
  const [submitting, setSubmitting] = useState(false);

  const handleRatingSubmit = async (selectedRating: number) => {
    try {
      setSubmitting(true);
      await orderAPI.rateProduct(orderId, productId, selectedRating);
      setRating(selectedRating);
      setSubmitted(true);
      toast.success("Rating submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit rating");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted && rating > 0) {
    return (
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm text-green-600 font-medium">✓ Rated</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <p className="text-xs text-gray-600 mb-1">Rate this product:</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRatingSubmit(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            disabled={submitting}
            className="transition-transform hover:scale-110 disabled:opacity-50"
          >
            <Star
              className={`w-5 h-5 ${
                star <= (hoveredRating || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/orders");
      return;
    }
    fetchOrders();
  }, [isAuthenticated, router]);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getOrders();
      console.log("Orders response:", response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8 animate-pulse" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 mb-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-20 h-20 mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
            <p className="text-gray-600 mb-8">
              Start shopping to see your orders here!
            </p>
            <button
              onClick={() => router.push("/products")}
              className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-mono text-sm font-medium">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Order Date</p>
                        <p className="font-medium">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="font-bold text-primary-600">
                          PKR {order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">
                          Delivery Address
                        </p>
                        <p className="font-medium text-sm">{order.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Payment Method</p>
                        <p className="font-medium">{order.paymentMethod}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {order.products.map((item, index) => {
                        const productImage =
                          typeof item.productId === "object"
                            ? item.productId?.imageUrl
                            : undefined;
                        const productName =
                          typeof item.productId === "object"
                            ? item.productId?.name
                            : item.productName || "Product";
                        const productPrice =
                          typeof item.productId === "object"
                            ? item.productId?.price
                            : item.price;
                        const productIdString =
                          typeof item.productId === "object"
                            ? item.productId?._id
                            : item.productId;

                        return (
                          <div key={index} className="py-3 border-t">
                            <div className="flex gap-4 items-center">
                              {/* Product Image */}
                              <img
                                src={productImage || "/placeholder.png"}
                                alt={productName}
                                className="w-16 h-16 object-cover rounded-lg border"
                              />

                              {/* Product Details */}
                              <div className="flex-1">
                                <p className="font-medium">{productName}</p>
                                <p className="text-sm text-gray-600">
                                  Size: {item.size || "N/A"} • Quantity:{" "}
                                  {item.quantity}
                                </p>
                              </div>

                              {/* Price */}
                              <p className="font-semibold">
                                PKR{" "}
                                {Math.round(
                                  (productPrice || 0) * item.quantity
                                )}
                              </p>
                            </div>

                            {/* Rating for Delivered Orders */}
                            {order.status.toLowerCase() === "delivered" &&
                              productIdString && (
                                <RatingComponent
                                  orderId={order._id}
                                  productId={productIdString}
                                  initialRating={item.userRating}
                                />
                              )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
