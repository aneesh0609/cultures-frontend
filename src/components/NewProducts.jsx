import React, { useEffect, useState, useMemo } from "react";
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
  Search,
} from "lucide-react";
import { motion } from "framer-motion";

const Productss = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);

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

  // 🔍 Filtering Logic
  const filteredItems = useMemo(() => {
    return items.filter((product) => {
      const nameMatch = product.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const categoryMatch =
        selectedCategory === "all" ||
        (product.category &&
          product.category.toLowerCase() === selectedCategory.toLowerCase());
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return nameMatch && categoryMatch && priceMatch;
    });
  }, [items, searchTerm, selectedCategory, priceRange]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start p-6 relative">
      {/* Header */}
      <div className="text-center mb-8 mt-20">
        <h1 className="text-3xl sm:text-5xl font-bold panchang tracking-[0.1em] text-white mt-2">
          PRODUCTS
        </h1>
        <p className="text-gray-300 font-light mt-4 mb-8 trench">
          Explore the latest collection and filter products by your preferences
        </p>
      </div>

      {/* 🧭 Filter Navbar */}
      <motion.div
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-7xl bg-gray-800 border border-gray-700 rounded-2xl p-4 mb-8 shadow-[0_4px_25px_rgba(0,0,0,0.3)]"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full sm:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 
                         focus:ring-teal-500 outline-none placeholder-gray-400"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {["all", "men", "women", "kids", "accessories"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-gray-300 text-sm whitespace-nowrap">
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </label>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-32 accent-teal-500"
            />
          </div>
        </div>
      </motion.div>

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

      {/* Product Grid */}
      {!loading && !error && (
        <>
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center text-gray-400 mt-10">
              <Package className="w-12 h-12 mb-2" />
              <p className="text-lg normal">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
              {filteredItems.map((product, index) => (
                <div
                  key={product._id}
                  className="group relative bg-gray-200 rounded-2xl overflow-hidden border border-white/10 
                             hover:border-white/20 transition-all hover:scale-105 
                             shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.35)]"
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

                    {/* Hover icons */}
                    <div
                      className={`absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                        hoveredProduct === index ? "opacity-100" : ""
                      }`}
                    >
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                        <Heart className="w-4 h-4 text-red-500" />
                      </button>
                      <Link
                        to={`/product/${product._id}`}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 flex items-center justify-center transition-colors"
                      >
                        <Eye className="w-4 h-4 text-blue-400" />
                      </Link>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3 sm:p-4">
                    <h3 className="text-black font-medium mb-1 truncate text-sm tracking-[0.05em]">
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

export default Productss;
