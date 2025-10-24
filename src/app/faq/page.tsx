"use client";

import { useState } from "react";
import {
  ChevronDown,
  Search,
  Package,
  CreditCard,
  Truck,
  RefreshCw,
  HelpCircle,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // Ordering & Payment
  {
    category: "Ordering & Payment",
    question: "How do I place an order?",
    answer:
      "Browse our collection, select your desired product, choose your size, and click 'Add to Cart'. Once you're ready, proceed to checkout, fill in your shipping details, and confirm your order. You'll receive an order confirmation via email.",
  },
  {
    category: "Ordering & Payment",
    question: "What payment methods do you accept?",
    answer:
      "Currently, we offer Cash on Delivery (COD) as our primary payment method. You can pay in cash when your order is delivered to your doorstep. We're working on adding more payment options including credit/debit cards and online banking.",
  },
  {
    category: "Ordering & Payment",
    question: "Can I modify or cancel my order?",
    answer:
      "Yes, you can modify or cancel your order within 2 hours of placing it. Please contact our customer support team immediately at support@printeez.com or call us at +1 (234) 567-890. Once the order is processed and shipped, modifications are not possible.",
  },
  {
    category: "Ordering & Payment",
    question: "Do I need an account to place an order?",
    answer:
      "Yes, you need to create an account to place an order. This helps us keep track of your orders, save your shipping information for faster checkout, and allows you to view your order history.",
  },

  // Shipping & Delivery
  {
    category: "Shipping & Delivery",
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 3-5 business days within Pakistan. Orders placed on weekends or holidays will be processed on the next business day. You'll receive tracking information via email once your order ships.",
  },
  {
    category: "Shipping & Delivery",
    question: "Do you offer free shipping?",
    answer:
      "Yes! We offer free shipping on all orders over PKR 5000. For orders below this amount, standard shipping charges apply based on your location.",
  },
  {
    category: "Shipping & Delivery",
    question: "Do you ship internationally?",
    answer:
      "Currently, we only ship within Pakistan. We're working on expanding our shipping to international locations. Stay tuned for updates!",
  },
  {
    category: "Shipping & Delivery",
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and visiting the 'My Orders' section. If you have any issues, contact our support team.",
  },

  // Products & Sizing
  {
    category: "Products & Sizing",
    question: "What sizes do you offer?",
    answer:
      "We offer three sizes: Small, Large, and Extra Large. Each product page shows the available sizes and stock levels. We recommend checking the size chart on individual product pages for accurate measurements.",
  },
  {
    category: "Products & Sizing",
    question: "What material are the t-shirts made of?",
    answer:
      "Our t-shirts are made from premium quality 100% cotton fabric. They're breathable, comfortable, and designed to last. Each product is carefully printed using high-quality printing techniques to ensure vibrant, long-lasting designs.",
  },
  {
    category: "Products & Sizing",
    question: "How do I choose the right size?",
    answer:
      "Refer to our size guide available on each product page. If you're between sizes, we recommend sizing up for a more comfortable fit. If you're still unsure, feel free to contact our customer support for personalized assistance.",
  },
  {
    category: "Products & Sizing",
    question: "Can I see the product in person before buying?",
    answer:
      "We're an online-only store currently. However, we provide high-quality images from multiple angles on each product page. We also have a hassle-free return policy if the product doesn't meet your expectations.",
  },

  // Returns & Exchanges
  {
    category: "Returns & Exchanges",
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy from the date of delivery. Items must be unworn, unwashed, and in original condition with all tags attached. To initiate a return, contact our support team with your order number and reason for return.",
  },
  {
    category: "Returns & Exchanges",
    question: "Can I exchange a product for a different size?",
    answer:
      "Yes, exchanges are possible within 7 days of delivery. The product must be in its original condition. Contact our support team to arrange an exchange. Please note that you'll need to ship the item back to us, and we'll send the new size once we receive it.",
  },
  {
    category: "Returns & Exchanges",
    question: "Who pays for return shipping?",
    answer:
      "If the return is due to a defect or error on our part, we'll cover the return shipping costs. For other returns (like size or preference changes), the customer is responsible for return shipping fees.",
  },
  {
    category: "Returns & Exchanges",
    question: "How long does it take to process a refund?",
    answer:
      "Once we receive your returned item and verify its condition, refunds are processed within 5-7 business days. For COD orders, refunds will be issued via bank transfer to your provided account details.",
  },

  // Account & Support
  {
    category: "Account & Support",
    question: "How do I reset my password?",
    answer:
      "On the login page, click 'Forgot Password' and enter your registered email address. You'll receive a password reset link via email. Follow the instructions to create a new password.",
  },
  {
    category: "Account & Support",
    question: "Can I save my favorite products?",
    answer:
      "Yes! Click the heart icon on any product to add it to your wishlist. You can access your saved items anytime by clicking the wishlist icon in the navigation bar (visible when you're logged in).",
  },
  {
    category: "Account & Support",
    question: "How do I contact customer support?",
    answer:
      "You can reach us via email at support@printeez.com, call us at +1 (234) 567-890 (Mon-Fri, 9am-6pm), or use the contact form on our Contact page. We aim to respond to all inquiries within 24 hours.",
  },
  {
    category: "Account & Support",
    question: "Do you have a physical store?",
    answer:
      "We're currently an online-only store. However, you can visit our office at 123 Fashion Street, New York, NY 10001 during business hours for any inquiries or concerns.",
  },
];

const categories = [
  { name: "All", icon: HelpCircle },
  { name: "Ordering & Payment", icon: CreditCard },
  { name: "Shipping & Delivery", icon: Truck },
  { name: "Products & Sizing", icon: Package },
  { name: "Returns & Exchanges", icon: RefreshCw },
  { name: "Account & Support", icon: HelpCircle },
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Find answers to common questions about ordering, shipping,
              returns, and more.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for answers..."
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b bg-white sticky top-16 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category.name
                      ? "bg-primary-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or browse different categories.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 pr-4">
                        <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full mb-2">
                          {faq.category}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openIndex === index && (
                      <div className="px-6 pb-5 animate-slide-up">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Still Need Help?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Our customer support
            team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@printeez.com"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 transition-colors border-2 border-white"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
