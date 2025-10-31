import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0b0b0b] py-8 sm:py-12 px-4 sm:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* ✅ Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* 🏷️ Brand Section */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-4">
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent panchang">
                Culture's
              </span>
            </h2>
            <p className="text-white/60 text-xs sm:text-sm leading-snug sm:leading-normal max-w-[220px] sm:max-w-none">
              Premium products for the modern lifestyle.
            </p>
          </div>

          {/* 🧭 Mobile Row: Quick Links + Support + Follow Us */}
          <div className="flex sm:hidden justify-between w-full text-center gap-3">
            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-1 text-xs">Quick</h4>
              <div className="space-y-1">
                <a href="#" className="block text-white/60 hover:text-white text-[10px] transition">
                  About
                </a>
                <a href="#" className="block text-white/60 hover:text-white text-[10px] transition">
                  Products
                </a>
                <a href="#" className="block text-white/60 hover:text-white text-[10px] transition">
                  Contact
                </a>
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-1 text-xs">Support</h4>
              <div className="space-y-1">
                <a href="#" className="block text-white/60 hover:text-white text-[10px] transition">
                  Help
                </a>
                <a href="#" className="block text-white/60 hover:text-white text-[10px] transition">
                  Size Guide
                </a>
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="text-white font-semibold mb-1 text-xs">Follow</h4>
              <div className="space-y-1">
                <a href="#" className="block text-white/60 hover:text-white text-[10px] transition">
                  Instagram
                </a>
                <a href="#" className="block text-white/60 hover:text-white text-[10px] transition">
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* 💻 Desktop / Tablet Columns */}
          <div className="hidden sm:block">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <div className="space-y-2">
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                About Us
              </a>
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                Products
              </a>
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                Contact
              </a>
            </div>
          </div>

          <div className="hidden sm:block">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
            <div className="space-y-2">
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                Help Center
              </a>
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                Size Guide
              </a>
            </div>
          </div>

          <div className="hidden sm:block">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h4>
            <div className="space-y-2">
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                Instagram
              </a>
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* 💫 Bottom Line */}
        <div className="border-t border-white/10 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center">
          <p className="text-white/60 text-xs sm:text-sm tracking-wide">
            &copy; 2025 Culture's. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
