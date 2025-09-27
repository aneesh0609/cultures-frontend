import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Modal from "./Modal";
import { ShoppingCart, FileText, User, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
    setDropdownOpen(false);
  };

  const handleCartClick = () => {
    if (!user) setShowLoginModal(true);
    else navigate("/cart");
  };

  const handleOrdersClick = () => {
    if (!user) setShowLoginModal(true);
    else navigate("/orders");
  };

  const handleDashboardClick = () => {
    if (!user) setShowLoginModal(true);
    else navigate("/dashboard");
  };

  return (
    <div>
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold text-white">
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Cul
            </span>
            ture's
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-6 text-white/80">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/products" className="hover:text-white transition-colors">Products</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Cart icon */}
            <button
              onClick={handleCartClick}
              className="p-2 text-white/80 hover:text-white transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* User dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="p-2 text-white/80 hover:text-white transition-colors"
              >
                <User className="w-5 h-5" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="flex flex-col divide-y divide-gray-200">
                    {/* Dashboard button */}
                    <button
                      onClick={handleDashboardClick}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-900"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </button>

                    {/* Orders */}
                    <button
                      onClick={handleOrdersClick}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-900"
                    >
                      <FileText className="w-4 h-4" />
                      Orders
                    </button>

                    {!user ? (
                      <button
                        onClick={() => {
                          navigate("/login");
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-900"
                      >
                        Login
                      </button>
                    ) : (
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-900"
                      >
                        Logout
                      </button>
                    )}

                    {/* Mobile only links */}
                    <div className="md:hidden flex flex-col">
                      <Link to="/" onClick={() => setDropdownOpen(false)} className="px-4 py-2 hover:bg-gray-100 text-gray-900">Home</Link>
                      <Link to="/products" onClick={() => setDropdownOpen(false)} className="px-4 py-2 hover:bg-gray-100 text-gray-900">Products</Link>
                      <Link to="/about" onClick={() => setDropdownOpen(false)} className="px-4 py-2 hover:bg-gray-100 text-gray-900">About</Link>
                      <Link to="/contact" onClick={() => setDropdownOpen(false)} className="px-4 py-2 hover:bg-gray-100 text-gray-900">Contact</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Modal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Login Required"
        message="Please login to access your cart or orders."
      />
    </div>
  );
};

export default Navbar;
