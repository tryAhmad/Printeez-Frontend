import { generateMetadata as generateSEO } from "@/config/seo";

// SEO Metadata for FAQ Page
export const metadata = generateSEO({
  title: "FAQ - Frequently Asked Questions",
  description:
    "Find answers to common questions about Printeez. Learn about shipping, returns, sizing, custom orders, and more. Quick help for customers.",
  keywords: [
    "faq",
    "frequently asked questions",
    "help",
    "shipping info",
    "returns policy",
    "sizing guide",
    "customer questions",
  ],
  path: "/faq",
});
