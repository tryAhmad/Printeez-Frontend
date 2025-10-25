import { Metadata } from "next";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://printeez-backend.vercel.app/api";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://printeez.studio";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const response = await fetch(`${API_URL}/products/${params.id}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      return {
        title: "Product Not Found | Printeez",
        description: "The product you're looking for could not be found.",
      };
    }

    const product = await response.json();

    const productUrl = `${SITE_URL}/products/${product.slug || product._id}`;
    const imageUrl = product.imageUrl || `${SITE_URL}/placeholder-product.jpg`;

    // Generate rich description with product details
    const description = product.description
      ? `${product.description.substring(0, 150)}... Available in ${
          product.sizes?.filter((s: any) => s.stock > 0).length || 0
        } sizes. Price: PKR ${product.price}`
      : `Buy ${product.name} from Printeez. Premium quality printed t-shirt. Price: PKR ${product.price}. Available in multiple sizes.`;

    return {
      title: `${product.name} - ${product.category} | Printeez`,
      description,
      keywords: [
        product.name,
        product.category,
        "t-shirt",
        "printed t-shirt",
        "custom t-shirt",
        "Printeez",
        `${product.category} t-shirt`,
        "online t-shirt shopping Pakistan",
      ].join(", "),
      authors: [{ name: "Printeez" }],
      openGraph: {
        title: product.name,
        description,
        url: productUrl,
        siteName: "Printeez",
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 800,
            alt: product.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: product.name,
        description,
        images: [imageUrl],
      },
      alternates: {
        canonical: productUrl,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (error) {
    console.error("Error generating product metadata:", error);
    return {
      title: "Product | Printeez",
      description: "Shop unique printed t-shirts at Printeez",
    };
  }
}
