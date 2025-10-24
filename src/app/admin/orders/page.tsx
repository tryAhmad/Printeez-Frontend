"use client";

import { useState, useEffect } from "react";
import { adminAPI } from "@/lib/api";
import { Search, Eye, Package, Check, X } from "lucide-react";
import toast from "react-hot-toast";

interface Order {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  } | null;
  products: {
    productId:
      | {
          _id: string;
          name: string;
          imageUrl: string;
        }
      | string;
    productName: string;
    quantity: number;
    price: number;
    size: string;
  }[];
  totalAmount: number;
  status: string;
  address: string;
  paymentMethod: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchQuery, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllOrders();
      setOrders(response.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (order) => order.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.userId?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order.userId?.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      setUpdating(true);
      await adminAPI.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Order status updated");
      setSelectedOrder(null);
    } catch (err) {
      toast.error("Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
        <div className="bg-white rounded-xl p-6 animate-pulse">
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
        <p className="text-gray-600 mt-1">
          Manage and track all customer orders
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by order ID, customer name, or email..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex gap-6 mt-4 text-sm text-gray-600">
          <span>
            Total Orders: <strong>{orders.length}</strong>
          </span>
          <span>
            Showing: <strong>{filteredOrders.length}</strong>
          </span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Order ID
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Customer
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Products
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Amount
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-6 text-sm font-mono text-gray-900">
                      {order._id.slice(-8)}
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {order.userId?.name || "Deleted User"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.userId?.email || "N/A"}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      {order.products.length} item(s)
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                      PKR {order.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          order.status.toLowerCase() === "delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status.toLowerCase() === "processing"
                            ? "bg-blue-100 text-blue-700"
                            : order.status.toLowerCase() === "shipped"
                            ? "bg-purple-100 text-purple-700"
                            : order.status.toLowerCase() === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-mono text-xs md:text-sm font-medium break-all">
                    {selectedOrder._id}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="text-sm font-medium">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Customer</p>
                  <p className="text-sm font-medium break-words">
                    {selectedOrder.userId?.name || "Deleted User"}
                  </p>
                  <p className="text-xs text-gray-500 break-all">
                    {selectedOrder.userId?.email || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="text-sm font-medium capitalize">
                    {selectedOrder.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div>
                <p className="text-sm text-gray-600 mb-1">Shipping Address</p>
                <p className="text-sm text-gray-900">{selectedOrder.address}</p>
              </div>

              {/* Products */}
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-3">
                  Products
                </p>
                <div className="space-y-3">
                  {selectedOrder.products.map((product, index) => {
                    const imageUrl =
                      typeof product.productId === "object"
                        ? product.productId?.imageUrl
                        : undefined;
                    const productName =
                      typeof product.productId === "object"
                        ? product.productId?.name
                        : product.productName;

                    return (
                      <div
                        key={index}
                        className="flex gap-4 items-center p-3 bg-gray-50 rounded-lg"
                      >
                        {/* Product Image */}
                        <img
                          src={imageUrl || "/placeholder.png"}
                          alt={productName}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />

                        {/* Product Details */}
                        <div className="flex-1">
                          <p className="font-medium text-sm">{productName}</p>
                          <p className="text-xs text-gray-600">
                            Size: {product.size} | Qty: {product.quantity}
                          </p>
                        </div>

                        {/* Price */}
                        <p className="font-semibold text-sm">
                          PKR {Math.round(product.price * product.quantity)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-gray-900">
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold text-primary-600">
                    PKR {selectedOrder.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Status Update */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-semibold text-gray-900 mb-3">
                  Update Status
                </p>
                <div className="flex gap-2 flex-wrap">
                  {[
                    "Pending",
                    "Processing",
                    "Shipped",
                    "Delivered",
                    "Cancelled",
                  ].map((status) => (
                    <button
                      key={status}
                      onClick={() =>
                        handleStatusUpdate(selectedOrder._id, status)
                      }
                      disabled={updating || selectedOrder.status === status}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedOrder.status === status
                          ? "bg-primary-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
