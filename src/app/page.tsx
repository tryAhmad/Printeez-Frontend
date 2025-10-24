import HeroSection from "@/components/home/HeroSection";
import TopSelling from "@/components/home/TopSelling";
import NewArrivals from "@/components/home/NewArrivals";
import Categories from "@/components/home/Categories";
import Features from "@/components/home/Features";
import { generateMetadata as generateSEO } from "@/config/seo";

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
      <Categories />
      <TopSelling />
      <NewArrivals />
    </div>
  );
}
