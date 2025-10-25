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
              description:
                "Premium Custom T-Shirt Store - Unique Designs, Quality Prints",
              url:
                process.env.NEXT_PUBLIC_SITE_URL || "https://printeez.studio",
              logo: {
                "@type": "ImageObject",
                url: `${
                  process.env.NEXT_PUBLIC_SITE_URL || "https://printeez.studio"
                }/logo.jpg`,
                width: 600,
                height: 600,
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+92-XXX-XXXXXXX",
                contactType: "Customer Service",
                areaServed: "PK",
                availableLanguage: ["English", "Urdu"],
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
              alternateName: "Printeez Studio",
              url:
                process.env.NEXT_PUBLIC_SITE_URL || "https://printeez.studio",
              description:
                "Shop unique custom-designed t-shirts with urban, typography, abstract, and anime styles",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${
                    process.env.NEXT_PUBLIC_SITE_URL ||
                    "https://printeez.studio"
                  }/products?search={search_term_string}`,
                },
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
