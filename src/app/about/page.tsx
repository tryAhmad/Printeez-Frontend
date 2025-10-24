"use client";

import { Mail, Phone, MapPin, Users, Target, Heart } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Printeez
            </h1>
            <p className="text-xl text-primary-100">
              Your destination for unique, custom-designed t-shirts that express
              your personality and style.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Founded with a passion for creative expression and quality
                fashion, Printeez has been bringing unique designs to life since
                our inception. What started as a small project to create custom
                t-shirts for friends has grown into a thriving business serving
                customers who appreciate individuality and style.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                We believe that clothing is more than just fabric—it&apos;s a
                canvas for self-expression. Every design we create tells a
                story, whether it&apos;s inspired by urban street culture, clean
                typography, abstract art, or vibrant anime aesthetics.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Our commitment to quality means we use only premium materials
                and printing techniques to ensure that your t-shirt not only
                looks great but stands the test of time. We&apos;re not just
                selling t-shirts; we&apos;re helping you express who you are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Quality */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Target className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Quality First
              </h3>
              <p className="text-gray-600 text-center">
                We never compromise on quality. From fabric selection to
                printing techniques, every step is crafted to deliver
                excellence.
              </p>
            </div>

            {/* Creativity */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Heart className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Creative Expression
              </h3>
              <p className="text-gray-600 text-center">
                We celebrate creativity and individuality. Our designs are made
                to help you stand out and express your unique personality.
              </p>
            </div>

            {/* Customer Care */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Customer Focus
              </h3>
              <p className="text-gray-600 text-center">
                Your satisfaction is our priority. We're dedicated to providing
                exceptional service and ensuring you love every purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Collections
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of design categories, each carefully
              curated to match different styles and personalities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="group bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl p-6 text-white hover:scale-105 transition-transform">
              <h3 className="text-2xl font-bold mb-2">Urban</h3>
              <p className="text-gray-300 text-sm">
                Street-style designs that capture the energy of city life.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white hover:scale-105 transition-transform">
              <h3 className="text-2xl font-bold mb-2">Typography</h3>
              <p className="text-blue-100 text-sm">
                Bold statements and minimalist text designs that speak volumes.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-white hover:scale-105 transition-transform">
              <h3 className="text-2xl font-bold mb-2">Abstract</h3>
              <p className="text-purple-100 text-sm">
                Artistic expressions with vibrant colors and flowing patterns.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-red-500 to-orange-500 rounded-xl p-6 text-white hover:scale-105 transition-transform">
              <h3 className="text-2xl font-bold mb-2">Anime</h3>
              <p className="text-orange-100 text-sm">
                Inspired by Japanese animation culture and iconic characters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Tee?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Browse our collection and discover designs that resonate with your
            style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </a>
            <a
              href="/contact"
              className="px-8 py-3 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 transition-colors border-2 border-white"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
