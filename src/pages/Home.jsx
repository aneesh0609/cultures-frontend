import { useState, useEffect } from 'react';
import { Star, ShoppingBag, Heart, Eye, ArrowRight, Zap, Shield, Truck, Headphones } from 'lucide-react';

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Fashion Blogger",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c913?w=60&h=60&fit=crop&crop=face",
      text: "Absolutely love the quality and style. Every piece I've ordered exceeded my expectations!",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Tech Entrepreneur",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      text: "Fast shipping, premium quality, and amazing customer service. This is my go-to store now.",
      rating: 5
    },
    {
      name: "Elena Rodriguez",
      role: "Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      text: "The attention to detail is incredible. Each product feels carefully curated and premium.",
      rating: 5
    }
  ];

  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      badge: "Best Seller",
      rating: 4.8
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 249,
      originalPrice: 329,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      badge: "New",
      rating: 4.9
    },
    {
      id: 3,
      name: "Minimalist Backpack",
      price: 129,
      originalPrice: 179,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      badge: "Sale",
      rating: 4.7
    },
    {
      id: 4,
      name: "Organic Coffee Blend",
      price: 24,
      originalPrice: 32,
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop",
      badge: "Organic",
      rating: 4.6
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl sm:text-2xl font-bold text-white">
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Luxe
              </span>
              Store
            </div>
            <div className="hidden lg:flex space-x-8 text-white/80">
              <a href="#" className="hover:text-white transition-colors">Home</a>
              <a href="#" className="hover:text-white transition-colors">Products</a>
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="p-2 text-white/80 hover:text-white transition-colors">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button className="p-2 text-white/80 hover:text-white transition-colors relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">3</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Discover
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent block">
                Premium
              </span>
              Collection
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Curated products that blend style, quality, and innovation. Experience the future of shopping with our handpicked collection.
            </p>
            <button className="group bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-lg hover:shadow-teal-500/25 transition-all transform hover:scale-105">
              Shop Now
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

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

      {/* Featured Products */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">Featured Products</h2>
            <p className="text-white/70 text-sm sm:text-base lg:text-lg">Handpicked items that define excellence</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group relative bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all hover:scale-105"
                onMouseEnter={() => setHoveredProduct(index)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                      product.badge === 'New' ? 'bg-green-500' :
                      product.badge === 'Sale' ? 'bg-red-500' :
                      product.badge === 'Best Seller' ? 'bg-teal-500' :
                      'bg-orange-500'
                    } text-white`}>
                      {product.badge}
                    </span>
                  </div>
                  <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                    hoveredProduct === index ? 'opacity-100' : ''
                  }`}>
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors mb-2 block">
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <h3 className="text-white font-semibold mb-2 truncate text-sm sm:text-base">{product.name}</h3>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                        />
                      ))}
                      <span className="text-white/60 text-xs sm:text-sm ml-2">({product.rating})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold text-base sm:text-lg">${product.price}</span>
                      <span className="text-white/50 text-xs sm:text-sm line-through ml-2">${product.originalPrice}</span>
                    </div>
                    <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-2 rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all">
                      <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">What Our Customers Say</h2>
            <p className="text-white/70 text-sm sm:text-base lg:text-lg">Real feedback from real customers</p>
          </div>
          
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10">
              <div className="text-center">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4 sm:mb-6 border-4 border-teal-400"
                />
                <div className="flex justify-center mb-3 sm:mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/90 text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 italic leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <h4 className="text-white font-semibold text-base sm:text-lg">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-white/60 text-sm">{testimonials[currentTestimonial].role}</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-teal-400' : 'bg-white/20'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Ready to Upgrade Your Style?</h2>
            <p className="text-white/70 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
              Join thousands of satisfied customers and discover premium products that make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-lg hover:shadow-teal-500/25 transition-all transform hover:scale-105">
                Browse Collection
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold border border-white/20 hover:bg-white/20 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Luxe
                </span>
                Store
              </div>
              <p className="text-white/60 text-sm">Premium products for the modern lifestyle.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">About Us</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Products</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Contact</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">FAQ</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Help Center</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Shipping Info</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Returns</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Size Guide</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h4>
              <div className="space-y-2">
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Instagram</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Twitter</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Facebook</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">YouTube</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-white/60 text-sm">&copy; 2025 LuxeStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
