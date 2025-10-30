import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Urban",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&h=500&fit=crop",
    description: "Street style & modern designs",
    href: "/products?category=urban",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Typography",
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=500&fit=crop",
    description: "Bold letters & quotes",
    href: "/products?category=typography",
    color: "from-purple-500 to-purple-700",
  },
  {
    name: "Abstract",
    image:
      "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=500&h=500&fit=crop",
    description: "Artistic patterns & shapes",
    href: "/products?category=abstract",
    color: "from-pink-500 to-pink-700",
  },
  {
    name: "Anime",
    image:
      "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=500&h=500&fit=crop",
    description: "Manga & anime inspired",
    href: "/products?category=anime",
    color: "from-orange-500 to-orange-700",
  },
];

export default function Categories() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection of printed t-shirts across different
            styles and themes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="aspect-square relative">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-75 transition-opacity`}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <h3 className="text-2xl font-bold mb-2 transform group-hover:scale-110 transition-transform">
                    {category.name}
                  </h3>
                  <p className="text-sm text-center opacity-90">
                    {category.description}
                  </p>
                  <div className="mt-4 px-6 py-2 bg-white text-gray-900 rounded-full font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Explore
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
