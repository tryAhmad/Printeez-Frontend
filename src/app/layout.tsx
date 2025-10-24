import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateMetadata as generateSEO } from "@/config/seo";

const inter = Inter({ subsets: ["latin"] });

// Enhanced SEO metadata
export const metadata = generateSEO({});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Printeez",
              description: "Premium Custom T-Shirt Store",
              url: "https://printeez.studio",
              logo: "https://printeez.studio/logo.jpg",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-XXX-XXX-XXXX",
                contactType: "Customer Service",
                areaServed: "Worldwide",
                availableLanguage: "English",
              },
              sameAs: [
                "https://facebook.com/printeez",
                "https://twitter.com/printeez",
                "https://instagram.com/printeez",
              ],
            }),
          }}
        />

        {/* Structured Data for Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Printeez",
              url: "https://printeez.studio",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://printeez.studio/products?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
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
