import { generateMetadata as generateSEO } from "@/config/seo";

// SEO Metadata for Profile Page
export const metadata = generateSEO({
  title: "My Profile - Account Settings",
  description:
    "Manage your Printeez account. Update your profile information, change password, and manage preferences.",
  keywords: ["my profile", "account settings", "user profile", "edit profile"],
  path: "/profile",
  noIndex: true, // User-specific pages should not be indexed
});
