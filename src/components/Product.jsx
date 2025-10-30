import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import { addToCart } from "../slices/cartSlice";
import { Link } from "react-router-dom";
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

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});

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
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start px-4 sm:px-8 py-6">
      {/* Header */}
      <div className="text-center mb-8 mt-4">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-[0.1em] text-white">
          PRODUCTS
        </h1>
        <p className="text-gray-300 font-light mt-3 mb-4">
          Explore the latest collection
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
              <p className="text-lg">No products available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 w-full max-w-7xl">
              {items.map((product, index) => (
                <div
                  key={product._id}
                  className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-all hover:scale-[1.02]"
                  onMouseEnter={() => setHoveredProduct(index)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[1/0.9] flex items-center justify-center overflow-hidden shadow-lg">
                    <img
                      src={product.images?.[0] || "/placeholder.png"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category Badge */}
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

                    {/* Hover Icons */}
                    <div
                      className={`absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                        hoveredProduct === index ? "opacity-100" : ""
                      }`}
                    >
                      {/* Heart Icon with Tooltip on LEFT */}
                      <div className="relative group/icon flex items-center justify-end">
                        <span className="absolute right-10 bg-red-500 text-white text-[10px] px-2 py-1 rounded-md shadow opacity-0 group-hover/icon:opacity-100 transition-all duration-200">
                          Wishlist
                        </span>
                        <button className="p-2 bg-black/40 backdrop-blur-sm rounded-full text-red-500 hover:bg-black/60 transition">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Eye Icon with Tooltip on LEFT */}
                      <div className="relative group/icon flex items-center justify-end">
                        <span className="absolute right-10 bg-green-400 text-white text-[10px] px-2 py-1 rounded-md shadow opacity-0 group-hover/icon:opacity-100 transition-all duration-200">
                          View
                        </span>
                        <Link
                          to={`/product/${product._id}`}
                          className="p-2 bg-black/40 backdrop-blur-sm rounded-full text-green-500 hover:bg-black/60 transition flex items-center justify-center"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-2 sm:p-3">
                    <h3 className="text-gray-900 font-semibold mb-1 truncate text-sm sm:text-base">
                      {product.name}
                    </h3>

                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating?.average || 0)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                      <span className="text-gray-600 text-xs ml-1">
                        ({product.rating?.average?.toFixed(1) || "0"})
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <div>
                        <span className="text-gray-900 font-bold text-sm sm:text-base">
                          ₹{product.price}
                        </span>
                        {product.discountPrice > 0 && (
                          <span className="text-gray-500 text-xs line-through ml-1">
                            ₹{product.discountPrice}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`relative overflow-hidden px-3 py-1 rounded-lg text-white transition-all text-xs sm:text-sm ${
                          addedToCart[product._id]
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gradient-to-r from-teal-500 to-cyan-500 hover:shadow-lg hover:shadow-teal-500/30"
                        }`}
                      >
                        {addedToCart[product._id] ? (
                          <div className="flex items-center gap-1">
                            <Check className="w-3 h-3" /> Added
                          </div>
                        ) : (
                          <ShoppingBag className="w-4 h-4" />
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
