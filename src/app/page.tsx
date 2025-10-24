import HeroSection from "@/components/home/HeroSection";
import TopSelling from "@/components/home/TopSelling";
import NewArrivals from "@/components/home/NewArrivals";
import Categories from "@/components/home/Categories";
import Features from "@/components/home/Features";

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
