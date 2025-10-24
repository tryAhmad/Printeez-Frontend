import { generateMetadata as generateSEO } from "@/config/seo";

// SEO Metadata for Wishlist Page
export const metadata = generateSEO({
  title: "My Wishlist - Saved Items",
  description:
    "View your saved t-shirt designs. Keep track of your favorite products and shop them later. Create your perfect collection with Printeez.",
  keywords: ["wishlist", "saved items", "favorites", "my list"],
  path: "/wishlist",
  noIndex: true, // Wishlist pages are typically not indexed
});
