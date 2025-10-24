import { generateMetadata as generateSEO } from "@/config/seo";

// SEO Metadata for Checkout Page
export const metadata = generateSEO({
  title: "Checkout - Complete Your Order",
  description:
    "Secure checkout process. Complete your order with Printeez. Multiple payment options available. Fast and safe transaction processing.",
  keywords: ["checkout", "complete order", "payment", "secure checkout"],
  path: "/checkout",
  noIndex: true, // Checkout pages should not be indexed
});
