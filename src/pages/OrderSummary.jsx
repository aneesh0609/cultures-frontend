import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearOrderSummary } from "../slices/orderSlice";

const OrderSummary = () => {
  const { summary } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect if no summary
  useEffect(() => {
    if (!summary) {
      navigate("/"); // ✅ safe navigation inside useEffect
    }
  }, [summary, navigate]);

  const handleContinueShopping = () => {
    dispatch(clearOrderSummary());
    navigate("/products");
  };

  if (!summary) return null; // Don't render anything while redirecting

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 flex items-center justify-center">
      <div className="max-w-lg w-full">
        {/* Success Icon & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-8 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Order Summary
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-800">₹{summary.subtotal}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 flex items-center">
                GST (5%)
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Tax</span>
              </span>
              <span className="font-semibold text-gray-800">₹{summary.gstAmount}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 flex items-center">
                Shipping
                <svg className="w-4 h-4 ml-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span className="font-semibold text-gray-800">₹{summary.shippingCharges}</span>
            </div>
            
            {/* Total Amount - Highlighted */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ₹{summary.totalAmount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleContinueShopping}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5 5m0 0h16" />
          </svg>
          <span>Continue Shopping</span>
        </button>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            You'll receive an email confirmation shortly
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

