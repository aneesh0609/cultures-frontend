import { useState, useEffect } from 'react';
import { Star, ShoppingBag, Heart, Eye, ArrowRight, Zap, Shield, Truck, Headphones } from 'lucide-react';
import CulturesHomepage from '../components/Header';
import Navbar from '../components/Navbar';
import Product from '../components/Product';
import Footer from '../components/Footer';

export default function Home() {
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      
        <Navbar />      
       <CulturesHomepage />

      {/* Features */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Quick delivery worldwide" },
              { icon: Shield, title: "Secure Payment", desc: "100% protected checkout" },
              { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
              { icon: Headphones, title: "24/7 Support", desc: "Always here to help" }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{feature.title}</h3>
                <p className="text-white/60 text-xs sm:text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Product />

      <Footer />
    </div>

    
  );
}
