import { generateMetadata as generateSEO } from "@/config/seo";

// SEO Metadata for Orders Page
export const metadata = generateSEO({
  title: "My Orders - Order History",
  description:
    "View your order history and track shipments. Access all your Printeez orders, invoices, and delivery status in one place.",
  keywords: ["my orders", "order history", "track order", "order status"],
  path: "/orders",
  noIndex: true, // User-specific pages should not be indexed
});
