import { Heart, ShoppingBag } from "lucide-react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  const handleCartClick = () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      navigate("/cart");
    }
  };

  return (
    <div>
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl sm:text-2xl font-bold text-white">
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Luxe
              </span>
              Store
            </div>

            <div className="hidden lg:flex space-x-8 text-white/80">
              <a href="#" className="hover:text-white transition-colors">Home</a>
              <a href="#" className="hover:text-white transition-colors">Products</a>
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="p-2 text-white/80 hover:text-white transition-colors">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={handleCartClick}
                className="p-2 text-white/80 hover:text-white transition-colors relative"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                    {totalQuantity}
                  </span>
                )}
              </button>

              {!user ? (
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Modal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Login Required"
        message="Please login to access your cart."
      />
    </div>
  );
};

export default Navbar;
