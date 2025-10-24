import { generateMetadata as generateSEO } from "@/config/seo";

// SEO Metadata for Products Page
export const metadata = generateSEO({
  title: "Shop All T-Shirts - Premium Custom Designs",
  description:
    "Browse our complete collection of premium t-shirts. Filter by category, size, and price. Urban, Typography, Abstract & Anime designs. Fast shipping and hassle-free returns.",
  keywords: [
    "shop t-shirts",
    "all products",
    "t-shirt collection",
    "buy online",
    "custom designs",
    "filter products",
  ],
  path: "/products",
});
