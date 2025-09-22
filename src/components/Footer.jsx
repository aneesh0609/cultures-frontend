import React from 'react'

const Footer = () => {
  return (
    <div>
       {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Luxe
                </span>
                Store
              </div>
              <p className="text-white/60 text-sm">Premium products for the modern lifestyle.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">About Us</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Products</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Contact</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">FAQ</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Help Center</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Shipping Info</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Returns</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Size Guide</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h4>
              <div className="space-y-2">
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Instagram</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Twitter</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Facebook</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">YouTube</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-white/60 text-sm">&copy; 2025 LuxeStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer