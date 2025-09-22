import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Shipping form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  

  // Order summary from backend
  const [summary, setSummary] = useState({
    subtotal: 0,
    gstAmount: 0,
    shippingCharges: 0,
    totalAmount: 0,
  });

  // Fetch cart items from backend to display
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("/api/cart/get-cart"); // Replace with your cart endpoint
        setCartItems(res.data.items || []);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    if (!fullName || !phone || !addressLine1 || !city || !state || !postalCode) {
      alert("Please fill all shipping details!");
      return;
    }

    try {
      const res = await axios.post("/api/orders/create-order", {
        shippingAddress: {
          fullName,
          phone,
          addressLine1,
          city,
          state,
          postalCode,
        },
      });

      if (res.data.success) {
        // Optional: Update summary from backend
        setSummary(res.data.summary);
        // Redirect to order success page
        navigate(`/order-success/${res.data.order._id}`);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to place order");
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (!cartItems.length) return <p>Your cart is empty.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

      {/* Shipping Info */}
      <div className="mb-6 border p-4 rounded-lg">
        <h2 className="text-xl font-medium mb-3">Shipping Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Address Line 1"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            className="border p-2 rounded col-span-2"
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="mb-6 border p-4 rounded-lg">
        <h2 className="text-xl font-medium mb-3">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between mb-2">
            <p>{item.productId.name} x {item.quantity}</p>
            <p>₹{(item.productId.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}

        <hr className="my-2" />
        <div className="flex justify-between">
          <p>Subtotal:</p>
          <p>₹{summary.subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>GST (5%):</p>
          <p>₹{summary.gstAmount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping Charges:</p>
          <p>₹{summary.shippingCharges.toFixed(2)}</p>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold">
          <p>Total:</p>
          <p>₹{summary.totalAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Continue Shopping
        </button>
        <button
          onClick={handlePlaceOrder}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
