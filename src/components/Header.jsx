import React from 'react'

export default function CulturesHomepage() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background organic shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left large organic shape */}
        <div
          className="absolute -left-50 top-10 w-48 h-56 sm:w-64 sm:h-72 bg-orange-300 opacity-70"
          style={{
            borderRadius: "70% 80% 90% 80%",
            transform: "rotate(-10deg)",
          }}
        ></div>

        {/* Right large organic shape */}
        <div
          className="absolute -right-54 top-10 w-48 h-56 sm:w-64 sm:h-72 bg-orange-300 opacity-70"
          style={{
            borderRadius: "80% 60% 70% 60%",
            transform: "rotate(295deg)",
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-8">
        <div className="text-center mb-8">
          <h1
            className="text-8xl md:text-9xl  fonts lg:text-[12rem] font-light text-gray-700 lg:mb-3 leading-none tracking-tight"
            
          >
            culture's
          </h1>

    
        </div>

        {/* Shop button */}
        <button className="bg-gray-800 hover:bg-gray-700 text-orange-300 px-6 sm:px-8 py-2 rounded-full text-xs sm:text-sm font-normal tracking-[0.15em] uppercase transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 normal">
          SHOP
        </button>
      </div>

      {/* Bottom section */}
      {/* Left group */}
      <div className="absolute bottom-0 left-0 flex gap-2 z-10 pl-2 pb-0">
        {/* First shape with model */}
        <div className="w-40 sm:w-48 flex items-end justify-center relative">
          {/* Orange curved shape - much bigger */}
          <div className="absolute bottom-0 w-full h-40 sm:h-46 bg-orange-300 opacity-60 rounded-t-full"></div>

          {/* Model image - much taller */}
          <img
            src="/model1.png"
            alt="Model"
            className="absolute w-28 sm:w-32 h-48 sm:h-60 rounded-xl object-cover shadow-md object-top"
            style={{
              bottom: "-5%",
              clipPath: "inset(0 round 1rem)",
            }}
          />
        </div>

        {/* Hide second shape on mobile */}
        <div className="hidden sm:flex w-48 items-end justify-center relative">
          <div className="absolute bottom-0 w-full h-46 bg-orange-400 opacity-70 rounded-t-full"></div>
          <img
            src="/model2.png"
            alt="Model"
            className="absolute w-32 h-60 rounded-xl object-cover shadow-md object-top"
            style={{
              bottom: "-5%",
              clipPath: "inset(0 round 1rem)",
            }}
          />
        </div>
      </div>

      {/* Right group */}
      <div className="absolute bottom-0 right-0 flex gap-2 z-10 pr-2 pb-0">
        <div className="w-40 sm:w-48 flex items-end justify-center relative">
          <div className="absolute bottom-0 w-full h-36 sm:h-46 bg-gray-500 opacity-60 rounded-t-full"></div>
          <img
            src="/model2.png"
            alt="Model"
            className="absolute w-28 sm:w-32 h-48 sm:h-60 rounded-xl object-cover shadow-md object-top"
            style={{
              bottom: "-5%",
              clipPath: "inset(0 round 1rem)",
            }}
          />
        </div>

        {/* Hide second shape on mobile */}
        <div className="hidden sm:flex w-48 items-end justify-center relative">
          <div className="absolute bottom-0 w-full h-46 bg-orange-200 opacity-70 rounded-t-full"></div>
          <img
            src="/model1.png"
            alt="Model"
            className="absolute w-32 h-60 rounded-xl object-cover shadow-md object-top"
            style={{
              bottom: "-2%",
              clipPath: "inset(0 round 1rem)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
