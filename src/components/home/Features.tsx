import { Truck, Shield, CreditCard, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over PKR 5000",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Premium materials",
  },
  {
    icon: CreditCard,
    title: "Cash on Delivery",
    description: "Pay when you receive",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Always here to help",
  },
];

export default function Features() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center gap-4 group">
              <div className="flex-shrink-0 w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                <feature.icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
