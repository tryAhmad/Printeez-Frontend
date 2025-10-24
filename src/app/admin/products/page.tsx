"use client";

import { useState, useEffect } from "react";
import { adminAPI, productAPI } from "@/lib/api";
import { Search, Plus, Edit, Trash2, Package } from "lucide-react";
import toast from "react-hot-toast";
import { Product } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "urban",
    imageUrl: "",
    sizes: [
      { size: "Small", stock: 0 },
      { size: "Large", stock: 0 },
      { size: "Extra Large", stock: 0 },
    ],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, categoryFilter]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAllProducts();
      setProducts(response.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);

    // Filter and clean sizes - only keep the 3 valid sizes
    const validSizes = ["Small", "Large", "Extra Large"];
    const cleanedSizes = validSizes.map((sizeName) => {
      const existingSize = product.sizes.find((s) => s.size === sizeName);
      return {
        size: sizeName,
        stock: existingSize ? existingSize.stock : 0,
      };
    });

    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      category: product.category,
      imageUrl: product.imageUrl,
      sizes: cleanedSizes,
    });
    setIsEditing(true);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await adminAPI.deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      toast.success("Product deleted");
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (selectedProduct) {
        // Update existing product
        const response = await adminAPI.updateProduct(selectedProduct._id, {
          ...formData,
          price: parseFloat(formData.price),
        });
        setProducts((prev) =>
          prev.map((p) => (p._id === selectedProduct._id ? response.data : p))
        );
        toast.success("Product updated");
      } else {
        // Create new product
        const response = await adminAPI.createProduct({
          ...formData,
          price: parseFloat(formData.price),
        });
        setProducts((prev) => [...prev, response.data]);
        toast.success("Product created successfully");
      }
      setIsEditing(false);
      resetForm();
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || "Failed to save product";
      toast.error(errorMsg);
    }
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "urban",
      imageUrl: "",
      sizes: [
        { size: "Small", stock: 0 },
        { size: "Large", stock: 0 },
        { size: "Extra Large", stock: 0 },
      ],
    });
  };

  const handleStockUpdate = (sizeIndex: number, newStock: number) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.map((s, i) =>
        i === sizeIndex ? { ...s, stock: newStock } : s
      ),
    }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Products Management
        </h1>
        <div className="bg-white rounded-xl p-6 animate-pulse">
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Products Management
          </h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">
            Manage your product catalog
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsEditing(true);
          }}
          className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-sm md:text-base whitespace-nowrap"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Categories</option>
            <option value="urban">Urban</option>
            <option value="typography">Typography</option>
            <option value="abstract">Abstract</option>
            <option value="anime">Anime</option>
          </select>
        </div>

        <div className="flex gap-6 mt-4 text-sm text-gray-600">
          <span>
            Total Products: <strong>{products.length}</strong>
          </span>
          <span>
            Showing: <strong>{filteredProducts.length}</strong>
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 capitalize mb-2">
                {product.category}
              </p>
              <p className="text-lg font-bold text-primary-600 mb-3">
                PKR {Math.round(product.price)}
              </p>

              {/* Stock Info */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  Stock:
                </p>
                <div className="flex gap-2 text-xs">
                  {product.sizes && product.sizes.length > 0 ? (
                    product.sizes.map((size, idx) => (
                      <span
                        key={size.size || idx}
                        className={`px-2 py-1 rounded ${
                          size.stock > 10
                            ? "bg-green-100 text-green-700"
                            : size.stock > 0
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {size.size?.charAt(0) || "?"}: {size.stock || 0}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-xs">
                      No sizes available
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Create Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => {
                  setIsEditing(false);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (PKR)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="urban">Urban</option>
                    <option value="typography">Typography</option>
                    <option value="abstract">Abstract</option>
                    <option value="anime">Anime</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock by Size
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {formData.sizes.map((size, index) => (
                    <div key={size.size}>
                      <label className="block text-xs text-gray-600 mb-1">
                        {size.size}
                      </label>
                      <input
                        type="number"
                        value={size.stock}
                        onChange={(e) =>
                          handleStockUpdate(
                            index,
                            parseInt(e.target.value) || 0
                          )
                        }
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                >
                  {selectedProduct ? "Update Product" : "Create Product"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    resetForm();
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
