import React from "react";
import ImageCarousel from "./ImageCarousel";
import { useNavigate} from "react-router-dom";

export default function CulturesHomepage() {

    const navigate = useNavigate() ;


  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">

      
      {/* 🌄 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/bg.jpg')`,
          filter: "brightness(0.2)",
          zIndex: 0,
        }}
      ></div>

      {/* 🌀 Background organic shapes */}
      <div className="absolute inset-0 pointer-events-none z-1">
        <div
          className="absolute -left-50 top-10 w-48 h-56 sm:w-64 sm:h-72 bg-orange-300 opacity-70"
          style={{
            borderRadius: "70% 80% 90% 80%",
            transform: "rotate(-10deg)",
          }}
        ></div>
      
        <div
          className="absolute -right-54 top-10 w-48 h-56 sm:w-64 sm:h-72 bg-orange-300 opacity-70"
          style={{
            borderRadius: "80% 60% 70% 60%",
            transform: "rotate(295deg)",
          }}
        ></div>
      </div>
     

      {/* 🧠 Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-8">
        <div className="text-center mb-8">
          {/* ✨ Golden gradient + shine animation */}
          <h1 className="text-8xl md:text-9xl lg:text-[8rem] font-medium leading-none tracking-tight relative inline-block text-transparent bg-clip-text bg-gradient-to-l from-gray-800 via-orange-600  to-pink-300 animate-shine star1" style={{filter: "brightness(3)"}}>
            Culture's
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 animate-lightshine"></span>
          </h1>
        </div>

        {/* Shop button */}
        <button className="bg-orange-300 hover:bg-orange-400 text-gray-900 px-6 sm:px-8 py-2 rounded-full text-xs sm:text-sm font-normal tracking-[0.15em] uppercase transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105" onClick={() => navigate('/products')}>
          SHOP
        </button>
      </div>

      {/* 🧍‍♀️ Bottom section */}
      {/* Left group */}
      <div className="absolute bottom-0 left-0 flex gap-2 z-10 pl-2 pb-0">
        <div className="w-40 sm:w-48 flex items-end justify-center relative">
          <div className="absolute bottom-0 w-full h-40 sm:h-46 bg-orange-300 opacity-60 rounded-t-full"></div>
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
