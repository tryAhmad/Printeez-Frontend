import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Printeez - Premium T-Shirt Store",
  description:
    "Shop the best collection of printed t-shirts - Urban, Typography, Abstract & Anime designs",
  icons: {
    icon: [{ url: "/logo.jpg?v=3", sizes: "any", type: "image/jpeg" }],
    apple: [{ url: "/logo.jpg?v=3", sizes: "180x180", type: "image/jpeg" }],
    shortcut: "/logo.jpg?v=3",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.jpg?v=3" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpg?v=3" />
        <link rel="shortcut icon" href="/logo.jpg?v=3" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
