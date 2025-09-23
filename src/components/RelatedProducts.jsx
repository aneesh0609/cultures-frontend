import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const RelatedProducts = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-12 w-full max-w-7xl mx-auto">
      <h2 className="text-white text-2xl font-semibold mb-6">Related Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product._id} to={`/product/${product._id}`}>
            <div className="group relative bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all hover:scale-105">
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-white font-semibold mb-2 truncate">{product.name}</h3>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(product.rating?.average || 0) ? "text-yellow-400 fill-current" : "text-gray-500"}`}
                    />
                  ))}
                  <span className="text-white/60 text-xs ml-2">
                    ({product.rating?.average?.toFixed(1) || "0"})
                  </span>
                </div>
                <div className="text-white font-bold text-base">₹{product.price}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
