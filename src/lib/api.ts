import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// API Services
export const authAPI = {
  signup: (data: { name: string; email: string; password: string }) =>
    api.post("/users/signup", data),
  login: (data: { email: string; password: string }) =>
    api.post("/users/login", data),
  getProfile: () => api.get("/users/profile"),
  updateProfile: (data: any) => api.put("/users/profile", data),
};

export const productAPI = {
  getAllProducts: (params?: any) => api.get("/products", { params }),
  getProductById: (id: string) => api.get(`/products/${id}`),
  getByCategory: (category: string) =>
    api.get(`/products/category/${category}`),
  getTopSelling: (limit = 8) => api.get(`/products/top-selling?limit=${limit}`),
  getNewArrivals: (limit = 8) =>
    api.get(`/products/new-arrivals?limit=${limit}`),
  searchProducts: (query: string) => api.get(`/products/search?q=${query}`),
  rateProduct: (productId: string, rating: number) =>
    api.post(`/products/${productId}/rate`, { rating }),
};

export const cartAPI = {
  getCart: () => api.get("/cart"),
  addToCart: (data: { productId: string; quantity: number; size: string }) =>
    api.post("/cart", data),
  updateCartItem: (productId: string, size: string, quantity: number) =>
    api.put(`/cart/${productId}`, { size, quantity }),
  removeFromCart: (productId: string, size: string) =>
    api.delete(`/cart/${productId}?size=${size}`),
  clearCart: () => api.delete("/cart/clear"),
};

export const orderAPI = {
  createOrder: (data: { products: any[]; address: string }) =>
    api.post("/orders", data),
  getOrders: () => api.get("/orders"),
  getOrderById: (id: string) => api.get(`/orders/${id}`),
  rateProduct: (orderId: string, productId: string, rating: number) =>
    api.post(`/orders/${orderId}/rate/${productId}`, { rating }),
};

export const wishlistAPI = {
  getWishlist: () => api.get("/wishlist"),
  addToWishlist: (productId: string) => api.post("/wishlist", { productId }),
  removeFromWishlist: (productId: string) =>
    api.delete(`/wishlist/${productId}`),
};

export const adminAPI = {
  // Analytics
  getAnalytics: () => api.get("/admin/analytics"),

  // Orders Management
  getAllOrders: (params?: any) => api.get("/admin/orders", { params }),
  updateOrderStatus: (orderId: string, status: string) =>
    api.put(`/admin/orders/${orderId}`, { status }),

  // Products Management
  createProduct: (data: any) => api.post("/admin/products", data),
  updateProduct: (id: string, data: any) =>
    api.put(`/admin/products/${id}`, data),
  deleteProduct: (id: string) => api.delete(`/admin/products/${id}`),
  updateStock: (id: string, size: string, stock: number) =>
    api.put(`/admin/products/${id}/stock`, { size, stock }),

  // Users Management
  getAllUsers: (params?: any) => api.get("/admin/users", { params }),
  updateUserRole: (userId: string, isAdmin: boolean) =>
    api.put(`/admin/users/${userId}/role`, { isAdmin }),
  deleteUser: (userId: string) => api.delete(`/admin/users/${userId}`),
};
