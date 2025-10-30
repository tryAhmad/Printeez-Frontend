import { lazy, Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import Features from "@/components/home/Features";
import { generateMetadata as generateSEO } from "@/config/seo";

// Lazy load non-critical components
const TopSelling = lazy(() => import("@/components/home/TopSelling"));
const NewArrivals = lazy(() => import("@/components/home/NewArrivals"));
const Categories = lazy(() => import("@/components/home/Categories"));

// SEO Metadata for Home Page
export const metadata = generateSEO({
  title: "Home - Premium Custom T-Shirts & Graphic Tees",
  description:
    "Discover Printeez - Your destination for premium custom t-shirts. Shop trending designs in Urban, Typography, Abstract & Anime styles. Free shipping on orders over $50. Quality guaranteed.",
  keywords: [
    "home",
    "t-shirt store",
    "custom apparel",
    "graphic tees",
    "trending designs",
    "fashion store",
    "online shopping",
  ],
  path: "/",
});

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Features />
      <Suspense
        fallback={
          <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-48 mb-8" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl p-4">
                      <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      >
        <Categories />
      </Suspense>
      <Suspense
        fallback={
          <div className="py-16">
            <div className="container mx-auto px-4">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-48 mb-8" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl p-4">
                      <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      >
        <TopSelling />
      </Suspense>
      <Suspense
        fallback={
          <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-48 mb-8" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl p-4">
                      <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      >
        <NewArrivals />
      </Suspense>
    </div>
  );
}
