import React, { useState } from 'react'
import { Star, ShoppingBag, Heart, Eye, } from 'lucide-react';


const Product = () => {

  const [hoveredProduct, setHoveredProduct] = useState(null);

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

  
  return (
    <div>{/* Featured Products */}
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
</div>
  )
}

export default Product