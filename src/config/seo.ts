import { Metadata } from "next";

// Base URL for your website
export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://printeez.studio";

// Default SEO configuration
export const DEFAULT_SEO = {
  siteName: "Printeez",
  siteTitle: "Printeez - Premium Custom T-Shirt Store",
  siteDescription:
    "Shop the best collection of premium printed t-shirts. Explore Urban, Typography, Abstract & Anime designs. High-quality custom t-shirts with fast shipping.",
  siteKeywords: [
    "t-shirts",
    "custom t-shirts",
    "printed t-shirts",
    "graphic tees",
    "urban t-shirts",
    "typography t-shirts",
    "abstract t-shirts",
    "anime t-shirts",
    "online t-shirt store",
    "premium t-shirts",
    "fashion",
    "streetwear",
    "custom apparel",
    "print on demand",
    "designer t-shirts",
  ],
  ogImage: "/logo.jpg",
  twitterHandle: "@printeez",
  author: "Printeez",
};

// Generate metadata for pages
export function generateMetadata({
  title,
  description,
  keywords,
  image,
  path = "",
  type = "website",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const pageTitle = title
    ? `${title} | ${DEFAULT_SEO.siteName}`
    : DEFAULT_SEO.siteTitle;

  const pageDescription = description || DEFAULT_SEO.siteDescription;
  const pageKeywords = keywords
    ? [...DEFAULT_SEO.siteKeywords, ...keywords]
    : DEFAULT_SEO.siteKeywords;

  const pageImage = image || DEFAULT_SEO.ogImage;
  const url = `${BASE_URL}${path}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords.join(", "),
    authors: [{ name: DEFAULT_SEO.author }],
    creator: DEFAULT_SEO.author,
    publisher: DEFAULT_SEO.siteName,
    robots: noIndex ? "noindex, nofollow" : "index, follow",

    // Open Graph
    openGraph: {
      type: type,
      locale: "en_US",
      url: url,
      siteName: DEFAULT_SEO.siteName,
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: `${BASE_URL}${pageImage}`,
          width: 1200,
          height: 630,
          alt: title || DEFAULT_SEO.siteName,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      site: DEFAULT_SEO.twitterHandle,
      creator: DEFAULT_SEO.twitterHandle,
      title: pageTitle,
      description: pageDescription,
      images: [`${BASE_URL}${pageImage}`],
    },

    // Additional meta tags
    alternates: {
      canonical: url,
    },

    // Verification tags (add your actual verification codes)
    verification: {
      google: "your-google-verification-code",
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },

    // App-specific
    applicationName: DEFAULT_SEO.siteName,

    // Icons
    icons: {
      icon: [
        { url: "/logo.ico", sizes: "any", type: "image/x-icon" },
        { url: "/logo.jpg", sizes: "512x512", type: "image/jpeg" },
      ],
      apple: [{ url: "/logo.jpg", sizes: "180x180", type: "image/jpeg" }],
      shortcut: "/logo.ico",
    },

    // Manifest
    manifest: "/manifest.json",
  };
}

// Product-specific metadata generator
export function generateProductMetadata({
  productName,
  productDescription,
  productImage,
  productPrice,
  productId,
}: {
  productName: string;
  productDescription: string;
  productImage: string;
  productPrice: number;
  productId: string;
}): Metadata {
  return generateMetadata({
    title: productName,
    description: productDescription,
    keywords: [productName, "buy t-shirt", "custom design", "online shopping"],
    image: productImage,
    path: `/products/${productId}`,
    type: "website", // OpenGraph only supports 'website' or 'article'
  });
}
