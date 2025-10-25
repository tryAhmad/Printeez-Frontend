import { Product } from "@/types";

interface ProductStructuredDataProps {
  product: Product;
}

export default function ProductStructuredData({
  product,
}: ProductStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://printeez.studio";

  // Calculate total stock from all sizes
  const totalStock = product.sizes.reduce((acc, size) => acc + size.stock, 0);

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: [product.imageUrl],
    description: product.description || product.name,
    sku: product._id,
    brand: {
      "@type": "Brand",
      name: "Printeez",
    },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/products/${product.slug || product._id}`,
      priceCurrency: "PKR",
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 30 days from now
      itemCondition: "https://schema.org/NewCondition",
      availability:
        totalStock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Printeez",
      },
    },
    aggregateRating:
      product.averageRating && product.totalRatings
        ? {
            "@type": "AggregateRating",
            ratingValue: product.averageRating.toFixed(1),
            reviewCount: product.totalRatings,
            bestRating: "5",
            worstRating: "1",
          }
        : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
