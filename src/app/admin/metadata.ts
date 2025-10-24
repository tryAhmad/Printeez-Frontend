import { Metadata } from "next";

// Admin pages should not be indexed by search engines
export const metadata: Metadata = {
  title: "Admin Dashboard - Printeez",
  description: "Admin dashboard for managing Printeez store",
  robots: "noindex, nofollow",
};
