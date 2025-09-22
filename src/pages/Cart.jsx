import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} from "../slices/cartSlice";
import {
  Trash2,
  Plus,
  Minus,
  Loader2,
  ShoppingBag,
  Package,
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  Gift,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


const CartPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cart);
  const [isOrderSummaryExpanded, setIsOrderSummaryExpanded] = useState(false);
 



  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  const deliveryCharges = subtotal > 100 ? 0 : 9.99; // Example: free delivery over 100
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryCharges + tax;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link
              to="/products"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-all duration-200 hover:translate-x-1"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Continue Shopping</span>
              <span className="sm:hidden">Back</span>
            </Link>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </div>
              <div className="hidden sm:block">
                <span className="text-base sm:text-lg font-semibold text-gray-900">
                  Shopping Cart
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-40 lg:pb-8">
        {/* Mobile Order Summary Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() =>
              setIsOrderSummaryExpanded(!isOrderSummaryExpanded)
            }
            className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between"
          >
            <span className="text-lg font-semibold text-gray-900">
              Order Total: ₹{total.toFixed(2)}
            </span>
            {isOrderSummaryExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {loading && (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="w-8 h-8 text-gray-600 animate-spin" />
                <span className="ml-3 text-gray-600 text-lg">Loading cart...</span>
              </div>
            )}

            {error && !loading && (
              <div className="bg-red-100/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg shadow-md mb-6">
                {error}
              </div>
            )}

            {!loading && items.length === 0 && (
              <div className="flex flex-col items-center text-gray-400 mt-10">
                <Package className="w-12 h-12 mb-2" />
                <p className="text-lg">Your cart is empty.</p>
              </div>
            )}

            {!loading &&
              items.length > 0 &&
              items.map((item) => (
                <div
                  key={item.productId._id}
                  className="flex flex-col sm:flex-row items-center sm:justify-between bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={item.productId.images?.[0] || "/placeholder.png"}
                      alt={item.productId.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-gray-900 font-semibold">
                        {item.productId.name}
                      </h3>
                      <p className="text-gray-500">₹{item.productId.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 sm:mt-0">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId._id, item.quantity - 1)
                      }
                      className="bg-gray-200 p-1 rounded-full text-gray-700 hover:bg-gray-300"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-gray-900 font-medium px-2">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId._id, item.quantity + 1)
                      }
                      className="bg-gray-200 p-1 rounded-full text-gray-700 hover:bg-gray-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemove(item.productId._id)}
                    className="mt-3 sm:mt-0 bg-red-600 p-2 rounded-full hover:bg-red-700 text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

            {/* Clear Cart */}
            {items.length > 0 && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleClearCart}
                  className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="hidden lg:block lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              deliveryCharges={deliveryCharges}
              tax={tax}
              total={total}
            />
          </div>

          {isOrderSummaryExpanded && (
            <div className="lg:hidden">
              <OrderSummary
                subtotal={subtotal}
                deliveryCharges={deliveryCharges}
                tax={tax}
                total={total}
                isMobile={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OrderSummary = ({ subtotal, deliveryCharges, tax, total, isMobile = false }) => {

   const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout"); // Redirects to your Checkout page
  };
  
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden ${
        isMobile ? "" : "sticky top-20"
      }`}
    >
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Order Summary</h2>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Delivery Charges</span>
          {deliveryCharges === 0 ? (
            <span className="text-green-600 font-medium">FREE</span>
          ) : (
            <span>₹{deliveryCharges.toFixed(2)}</span>
          )}
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Tax (8%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t border-gray-200">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>

        <button className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 mt-4 transition-all"   
           onClick={handleCheckout}
        >
             
          <CreditCard className="w-5 h-5 inline mr-2" /> Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
