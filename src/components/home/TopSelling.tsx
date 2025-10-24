"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { productAPI } from "@/lib/api";
import ProductCard from "@/components/products/ProductCard";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";

export default function TopSelling() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await productAPI.getTopSelling(8);
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch top selling products:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSelling();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Top Selling
              </h2>
              <p className="text-gray-600">
                Our most popular t-shirts loved by customers
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                <div className="h-6 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || products.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Top Selling
              </h2>
              <p className="text-gray-600">
                Our most popular t-shirts loved by customers
              </p>
            </div>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500">
              {error
                ? "Unable to load products. Please try again later."
                : "No products available at the moment."}
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 mt-4 text-primary-600 font-semibold hover:gap-4 transition-all"
            >
              Browse All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Top Selling</h2>
            <p className="text-gray-600">
              Our most popular t-shirts loved by customers
            </p>
          </div>
          <Link
            href="/products?sort=popular"
            className="hidden md:flex items-center gap-2 text-primary-600 font-semibold hover:gap-4 transition-all"
          >
            View All <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <Link
          href="/products?sort=popular"
          className="md:hidden mt-8 flex items-center justify-center gap-2 text-primary-600 font-semibold"
        >
          View All Products <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
