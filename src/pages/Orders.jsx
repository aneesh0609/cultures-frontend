import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, cancelOrder } from "../slices/orderSlice";
import {
  Loader2,
  AlertTriangle,
  Package,
  Calendar,
  CreditCard,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleCancelOrder = (id) => {
    dispatch(cancelOrder(id));
  };

  const calculateTotal = (items) => {
    if (!items?.length) return 0;
    return items.reduce(
      (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
      0
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-gray-600 animate-spin mx-auto" />
          <p className="text-gray-600 text-lg">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center space-y-6 max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">No orders yet</h2>
              <p className="text-gray-600">
                When you place your first order, it will appear here.
              </p>
            </div>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Added top padding to ensure content starts after navbar */}
      <div className="pt-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 trench tracking-[0.05em]">My Orders</h1>
          </div>
          <p className="text-gray-600 normal tracking-[0.06em]">Track and manage your order history</p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Order placed</span>
                    </div>
                    <p className="font-mono text-sm text-gray-900">#{order._id}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-lg font-semibold text-gray-900">
                        ₹{order.totalAmount || calculateTotal(order.items)}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${
                        order.status?.toLowerCase() === "delivered"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : order.status?.toLowerCase() === "pending"
                          ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                          : order.status?.toLowerCase() === "processing"
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : order.status?.toLowerCase() === "cancelled"
                          ? "bg-red-100 text-red-800 border-red-200"
                          : "bg-gray-100 text-gray-800 border-gray-200"
                      }`}
                    >
                      {order.status === "delivered" ? "Confirmed" : order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="p-6">
                {order.items?.length ? (
                  <div className="space-y-4">
                    {order.items.map((p, index) => (
                      <div
                        key={p._id || p.productId?._id || index}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex-shrink-0 overflow-hidden">
                          <img
                            src={p.productId?.images?.[0] || "/placeholder.png"}
                            alt={p.productId?.name || "Product"}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">
                            {p.productId?.name || "Unknown Product"}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Quantity: {p.quantity}
                          </p>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <p className="font-semibold text-gray-900">
                            ₹{p.productId?.price}
                          </p>
                          <p className="text-sm text-gray-600">per item</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No products in this order</p>
                  </div>
                )}
              </div>

              {/* Order Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4" />
                  <span>Payment method: Card</span>
                </div>
                {order.status?.toLowerCase() !== "cancelled" &&
                  order.status?.toLowerCase() !== "delivered" && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800 font-medium text-sm"
                    >
                      <XCircle className="w-4 h-4" /> Cancel Order
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
