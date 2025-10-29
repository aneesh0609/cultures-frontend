import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchProducts } from "../slices/productSlice";
import { addToCart } from "../slices/cartSlice";
import { Star, ShoppingBag, Heart, Check, Loader2, AlertTriangle, Plus, Minus } from "lucide-react";
import RelatedProducts from "../components/RelatedProducts";
import Navbar from "../components/Navbar";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchProducts());
    } else {
      const prod = items.find((p) => p._id === id);
      setProduct(prod);
    }
  }, [dispatch, items, id]);

  useEffect(() => {
    if (items.length && !product) {
      const prod = items.find((p) => p._id === id);
      setProduct(prod);
    }
  }, [items, product, id]);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await dispatch(addToCart({ productId: product._id, quantity })).unwrap();
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 1200);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  if (loading || !product) {
    return (
      <>
        <Navbar />
        <div className="pt-20 flex items-center justify-center h-screen bg-gray-50">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-gray-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="pt-20 flex items-center justify-center h-screen bg-gray-50">
          <div className="text-center text-red-600">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
            <p className="text-lg">{error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 bg-gray-800 text-white text-xs rounded-full capitalize">
                  {product.category}
                </div>
                <h1 className="text-2xl font-semibold text-gray-900 leading-tight normal">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating?.average || 0)
                          ? "text-yellow-500 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  {product.rating?.average?.toFixed(1) || "0"} rating
                </span>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                  {product.discountPrice > 0 && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.discountPrice}
                    </span>
                  )}
                </div>
                {product.discountPrice > 0 && (
                  <div className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-lg">
                    Save ₹{product.discountPrice - product.price}
                  </div>
                )}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Quantity</label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        className="p-2 hover:bg-gray-50 transition-colors border-r border-gray-300"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="px-4 py-2 text-sm font-medium min-w-[50px] text-center">
                        {quantity}
                      </span>
                      <button
                        className="p-2 hover:bg-gray-50 transition-colors border-l border-gray-300"
                        onClick={() => setQuantity((q) => q + 1)}
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 px-6 rounded-lg font-medium text-sm transition-all transform hover:scale-105 active:scale-95 flex items-center normal justify-center gap-2 ${
                      addedToCart
                        ? "bg-green-600 text-white shadow-md shadow-green-600/25"
                        : "bg-gray-900 text-white hover:bg-gray-800 shadow-md shadow-gray-900/25"
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-4 h-4" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  
                  <button className="p-3 bg-white border border-gray-300 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors group">
                    <Heart className="w-4 h-4 text-gray-600 group-hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3 pt-6 border-t border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 normal">Product Details</h2>
                <p className="text-gray-700 text-sm leading-relaxed normal">
                  {product.description || "No description available for this product."}
                </p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {items.length > 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-semibold text-gray-800 panchang mt-2 mb-2  tracking-[0.1em]">You might also like</h2>
                <p className="text-gray-600 text-sm normal  ">Discover similar products from the same category</p>
              </div>
              <RelatedProducts
                products={items
                  .filter((p) => p.category === product.category && p._id !== product._id)
                  .slice(0, 4)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleProduct;