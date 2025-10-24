import { generateMetadata as generateSEO } from "@/config/seo";

// SEO Metadata for Signup Page
export const metadata = generateSEO({
  title: "Sign Up - Create Your Account",
  description:
    "Join Printeez today! Create your free account to shop custom t-shirts, save favorites, and track orders. Quick and easy registration.",
  keywords: [
    "sign up",
    "register",
    "create account",
    "join printeez",
    "new user",
  ],
  path: "/signup",
  noIndex: true, // Signup pages should not be indexed
});
