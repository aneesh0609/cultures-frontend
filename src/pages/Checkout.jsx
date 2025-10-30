import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../slices/orderSlice";
import { createPaymentOrder, verifyPayment } from "../slices/paymentSlice";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, Phone, User } from "lucide-react";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.order);
  const paymentState = useSelector((state) => state.payment);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(createOrder({ shippingAddress }));
    if (createOrder.fulfilled.match(resultAction)) {
      const orderId = resultAction.payload.order._id;

      const paymentAction = await dispatch(createPaymentOrder({ orderId }));
      if (createPaymentOrder.fulfilled.match(paymentAction)) {
        const { razorpayOrder, key } = paymentAction.payload;

        const options = {
          key,
          amount: razorpayOrder.amount,
          currency: "INR",
          name: "My E-Commerce",
          description: "Order Payment",
          order_id: razorpayOrder.id,
          handler: async function (response) {
            await dispatch(verifyPayment({ ...response, orderId }));
            navigate("/order-summary");
          },
          prefill: {
            name: shippingAddress.fullName,
            contact: shippingAddress.phone,
          },
          theme: { color: "#2563eb" },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 px-6 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-10 border border-gray-100 transition-all">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-md mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Secure Checkout
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Complete your order by providing your shipping details
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handlePlaceOrder}
          className="space-y-5 md:space-y-6 text-gray-800"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                name="fullName"
                placeholder="Full Name"
                className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 bg-gray-50 focus:bg-white focus:border-blue-500 outline-none transition-all"
                value={shippingAddress.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                name="phone"
                placeholder="Phone Number"
                className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 bg-gray-50 focus:bg-white focus:border-blue-500 outline-none transition-all"
                value={shippingAddress.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="relative">
            <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              name="addressLine1"
              placeholder="Street Address"
              className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 bg-gray-50 focus:bg-white focus:border-blue-500 outline-none transition-all"
              value={shippingAddress.addressLine1}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <input
              name="city"
              placeholder="City"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:border-blue-500 outline-none transition-all"
              value={shippingAddress.city}
              onChange={handleChange}
              required
            />
            <input
              name="state"
              placeholder="State"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:border-blue-500 outline-none transition-all"
              value={shippingAddress.state}
              onChange={handleChange}
              required
            />
            <input
              name="postalCode"
              placeholder="Postal Code"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:border-blue-500 outline-none transition-all"
              value={shippingAddress.postalCode}
              onChange={handleChange}
              required
            />
          </div>

          {/* Errors */}
          {error && (
            <p className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">
              {error}
            </p>
          )}
          {paymentState.error && (
            <p className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">
              {paymentState.error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || paymentState.loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
          >
            {loading || paymentState.loading ? (
              <span className="flex items-center gap-2">
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              "Proceed to Payment"
            )}
          </button>
        </form>

        {/* Secure Badge */}
        <div className="mt-8 flex items-center justify-center text-sm text-gray-500">
          <CreditCard className="w-4 h-4 mr-2 text-green-600" />
          100% Secure Payment Powered by Razorpay
        </div>
      </div>
    </div>
  );
};

export default Checkout;
