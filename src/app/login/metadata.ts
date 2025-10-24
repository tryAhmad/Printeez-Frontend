import { generateMetadata as generateSEO } from "@/config/seo";

// SEO Metadata for Login Page
export const metadata = generateSEO({
  title: "Login - Sign In to Your Account",
  description:
    "Sign in to your Printeez account. Access your orders, wishlist, and profile. Secure login with email and password.",
  keywords: ["login", "sign in", "account access", "user login"],
  path: "/login",
  noIndex: true, // Login pages should not be indexed
});
