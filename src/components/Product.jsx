import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import { addToCart } from "../slices/cartSlice";
import { Link } from "react-router-dom"; // Link for routing
import {
  Star,
  ShoppingBag,
  Heart,
  Eye,
  Loader2,
  AlertTriangle,
  Package,
  Check,
} from "lucide-react";
import ProductCard from "./CompactDeliveryMap";

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [addedToCart, setAddedToCart] = useState({}); // Track added products

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = async (product) => {
    try {
      await dispatch(
        addToCart({
          productId: product._id,
          quantity: 1,
        })
      ).unwrap();

      setAddedToCart((prev) => ({ ...prev, [product._id]: true }));
      setTimeout(() => {
        setAddedToCart((prev) => ({ ...prev, [product._id]: false }));
      }, 1200);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start p-6">
      {/* Header */}
      <div className="text-center mb-8 mt-20">
        <h1 className="text-3xl sm:text-5xl font-bold panchang tracking-[0.1em] text-white mt-2">
          PRODUCT
        </h1>
        <p className="text-gray-300 font-light mt-4 mb-8 trench ">
          View all available products in your store
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
          <span className="ml-3 text-white text-lg">Loading products...</span>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="flex items-center gap-3 bg-red-100/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg shadow-md mb-6">
          <AlertTriangle className="w-6 h-6" />
          <span>{error}</span>
        </div>
      )}


      {/* Products */}
      {!loading && !error && (
        <>
          {items.length === 0 ? (
            <div className="flex flex-col items-center text-gray-400 mt-10">
              <Package className="w-12 h-12 mb-2" />
              <p className="text-lg normal">No products available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
              {items.map((product, index) => (
                <div
                  key={product._id}
                  className="group relative bg-gray-200 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all hover:scale-105"
                  onMouseEnter={() => setHoveredProduct(index)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Image */}
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={product.images?.[0] || "/placeholder.png"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Category badge */}
                    <div
                      className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold text-white ${
                        product.category === "men"
                          ? "bg-blue-500"
                          : product.category === "women"
                          ? "bg-pink-500"
                          : product.category === "kids"
                          ? "bg-green-500"
                          : product.category === "accessories"
                          ? "bg-yellow-500"
                          : "bg-purple-500"
                      }`}
                    >
                      {product.category || "Uncategorized"}
                    </div>
                    {/* Hover icons */}
                    <div
                      className={`absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                        hoveredProduct === index ? "opacity-100" : ""
                      }`}
                    >
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      {/* Eye icon wrapped with Link */}
                      <Link
                        to={`/product/${product._id}`}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 flex items-center justify-center transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3 sm:p-4">
                    <h3 className="text-black font-medium mb-1 truncate text-sm normal tracking-[0.05em]">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating?.average || 0)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-500"
                          }`}
                        />
                      ))}
                      <span className="text-black text-xs ml-1">
                        ({product.rating?.average?.toFixed(1) || "0"})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-black font-bold text-sm">
                          ₹{product.price}
                        </span>
                        {product.discountPrice > 0 && (
                          <span className="text-white/50 text-xs line-through ml-1">
                            ₹{product.discountPrice}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`relative overflow-hidden px-2 py-1 rounded-lg text-white transition-all text-xs ${
                          addedToCart[product._id]
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gradient-to-r from-teal-500 to-cyan-500 hover:shadow-lg hover:shadow-teal-500/25"
                        }`}
                      >
                        {addedToCart[product._id] ? (
                          <div className="flex items-center gap-1">
                            <Check className="w-3 h-3" /> Added
                          </div>
                        ) : (
                          <ShoppingBag className="w-5 h-4 " />
                        )}
                      
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;



































// import React, { useState } from 'react';
// import { Star, ShoppingBag, Heart, Eye } from 'lucide-react';
// import { useDispatch } from 'react-redux';
// //import { addToCart } from '../slices/cartSlice'; // make sure your cartSlice has this action

// const Product = () => {
//   const dispatch = useDispatch();
//   const [hoveredProduct, setHoveredProduct] = useState(null);

//   const products = [
//     {
//       id: 1,
//       name: "Premium Wireless Headphones",
//       price: 299,
//       originalPrice: 399,
//       image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
//       badge: "Best Seller",
//       rating: 4.8
//     },
//     {
//       id: 2,
//       name: "Smart Fitness Watch",
//       price: 249,
//       originalPrice: 329,
//       image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
//       badge: "New",
//       rating: 4.9
//     },
//     {
//       id: 3,
//       name: "Minimalist Backpack",
//       price: 129,
//       originalPrice: 179,
//       image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
//       badge: "Sale",
//       rating: 4.7
//     },
//     {
//       id: 4,
//       name: "Organic Coffee Blend",
//       price: 24,
//       originalPrice: 32,
//       image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop",
//       badge: "Organic",
//       rating: 4.6
//     }
//   ];

//   const handleAddToCart = (product) => {
//     dispatch(addToCart({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       image: product.image,
//       quantity: 1
//     }));
//   };

//   return (
//     <div>
//       <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">Featured Products</h2>
//             <p className="text-white/70 text-sm sm:text-base lg:text-lg">Handpicked items that define excellence</p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
//             {products.map((product, index) => (
//               <div
//                 key={product.id}
//                 className="group relative bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all hover:scale-105"
//                 onMouseEnter={() => setHoveredProduct(index)}
//                 onMouseLeave={() => setHoveredProduct(null)}
//               >
//                 <div className="aspect-square overflow-hidden">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
//                     <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
//                       product.badge === 'New' ? 'bg-green-500' :
//                       product.badge === 'Sale' ? 'bg-red-500' :
//                       product.badge === 'Best Seller' ? 'bg-teal-500' :
//                       'bg-orange-500'
//                     } text-white`}>
//                       {product.badge}
//                     </span>
//                   </div>
//                   <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity ${
//                     hoveredProduct === index ? 'opacity-100' : ''
//                   }`}>
//                     <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors mb-2 block">
//                       <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
//                     </button>
//                     <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
//                       <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="p-4 sm:p-6">
//                   <h3 className="text-white font-semibold mb-2 truncate text-sm sm:text-base">{product.name}</h3>
//                   <div className="flex items-center mb-3">
//                     <div className="flex items-center">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
//                         />
//                       ))}
//                       <span className="text-white/60 text-xs sm:text-sm ml-2">({product.rating})</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <span className="text-white font-bold text-base sm:text-lg">${product.price}</span>
//                       <span className="text-white/50 text-xs sm:text-sm line-through ml-2">${product.originalPrice}</span>
//                     </div>
//                     <button
//                       onClick={() => handleAddToCart(product)}
//                       className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-2 rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all"
//                     >
//                       <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Product;
