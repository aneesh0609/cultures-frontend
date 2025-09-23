// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../slices/orderSlice";
import { createPaymentOrder, verifyPayment } from "../slices/paymentSlice";
import { useNavigate } from "react-router-dom";

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

    // 1️⃣ Create order in DB
    const resultAction = await dispatch(createOrder({ shippingAddress }));
    if (createOrder.fulfilled.match(resultAction)) {
      const orderId = resultAction.payload.order._id;

      // 2️⃣ Create Razorpay order
      const paymentAction = await dispatch(createPaymentOrder({ orderId }));
      if (createPaymentOrder.fulfilled.match(paymentAction)) {
        const { razorpayOrder, key } = paymentAction.payload;

        // 3️⃣ Open Razorpay Checkout
        const options = {
          key,
          amount: razorpayOrder.amount,
          currency: "INR",
          name: "My E-Commerce",
          description: "Order Payment",
          order_id: razorpayOrder.id,
          handler: async function (response) {
            // 4️⃣ Verify payment after success
            await dispatch(verifyPayment({ ...response, orderId }));
            navigate("/order-summary");
          },
          prefill: {
            name: shippingAddress.fullName,
            contact: shippingAddress.phone,
          },
          theme: {
            color: "#2563eb",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-24 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <form onSubmit={handlePlaceOrder} className="space-y-4">
        <input
          name="fullName"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          value={shippingAddress.fullName}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
          value={shippingAddress.phone}
          onChange={handleChange}
          required
        />
        <input
          name="addressLine1"
          placeholder="Address"
          className="w-full border p-2 rounded"
          value={shippingAddress.addressLine1}
          onChange={handleChange}
          required
        />
        <input
          name="city"
          placeholder="City"
          className="w-full border p-2 rounded"
          value={shippingAddress.city}
          onChange={handleChange}
          required
        />
        <input
          name="state"
          placeholder="State"
          className="w-full border p-2 rounded"
          value={shippingAddress.state}
          onChange={handleChange}
          required
        />
        <input
          name="postalCode"
          placeholder="Postal Code"
          className="w-full border p-2 rounded"
          value={shippingAddress.postalCode}
          onChange={handleChange}
          required
        />

        {/* Show any errors */}
        {error && <p className="text-red-500">{error}</p>}
        {paymentState.error && <p className="text-red-500">{paymentState.error}</p>}

        <button
          type="submit"
          disabled={loading || paymentState.loading}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 mt-4 transition-all"
        >
          {loading || paymentState.loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
