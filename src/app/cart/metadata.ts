import { generateMetadata as generateSEO } from "@/config/seo";

// SEO Metadata for Cart Page
export const metadata = generateSEO({
  title: "Shopping Cart - Review Your Items",
  description:
    "Review your cart items before checkout. Secure shopping with Printeez. Add or remove products, apply discounts, and proceed to checkout.",
  keywords: ["shopping cart", "cart items", "checkout", "review order"],
  path: "/cart",
  noIndex: true, // Cart pages are typically not indexed
});
