import React from "react";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "./ImageCarousel";
import CulturalMiniCards from "./SmallCards";

import NewProductCards from "./AllNewProducts";

export default function CulturesHomepage() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gray-50 overflow-hidden">
      {/* 🧭 Content starts below navbar */}
      <div className=" ">

        {/* 🌀 Organic Background Shapes */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          <div
            className="absolute -left-10 top-10 w-40 h-48 sm:w-56 sm:h-64 bg-orange-300 opacity-60 blur-md"
            style={{
              borderRadius: "70% 80% 90% 80%",
              transform: "rotate(-10deg)",
            }}
          ></div>

          <div
            className="absolute -right-10 top-20 w-40 h-48 sm:w-56 sm:h-64 bg-orange-400 opacity-60 blur-md"
            style={{
              borderRadius: "80% 60% 70% 60%",
              transform: "rotate(295deg)",
            }}
          ></div>
        </div>

        {/* 🌸 Content Layer */}
        <div
          className="relative z-10 flex flex-col items-center justify-center 
                     space-y-4 sm:space-y-8 lg:space-y-12 px-1 sm:px-4"
        >
          {/* 🖼️ Image Carousel Section */}
          <div className="w-full max-w-7xl pt-20 sm:pt-24 lg:pt-28 pb-4 ">
            <ImageCarousel />
          </div>

          {/* 👗 Cultural Mini Cards */}
          <div className="w-full max-w-7xl">
           <NewProductCards />
          </div>

            <div className="w-full max-w-7xl">
            <CulturalMiniCards />
          </div>
        </div>
      </div>
    </div>
  );
}











/* 🧠 Main content */
      /* <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-8">
        <div className="text-center mb-8">
          {/* ✨ Golden gradient + shine animation */
          /* <h1 className="text-8xl md:text-9xl lg:text-[8rem] font-medium leading-none tracking-tight relative inline-block text-transparent bg-clip-text bg-gradient-to-l from-gray-800 via-orange-600  to-pink-300 animate-shine star1" style={{filter: "brightness(3)"}}>
            Culture's
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 animate-lightshine"></span>
          </h1>
        </div> */

        /* Shop button */
        /* <button className="bg-orange-300 hover:bg-orange-400 text-gray-900 px-6 sm:px-8 py-2 rounded-full text-xs sm:text-sm font-normal tracking-[0.15em] uppercase transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105" onClick={() => navigate('/products')}>
          SHOP
        </button>
      </div> */

      /* 🧍‍♀️ Bottom section */
      /* Left group */
      /* <div className="absolute bottom-0 left-0 flex gap-2 z-10 pl-2 pb-0">
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
        </div> */

        /* <div className="hidden sm:flex w-48 items-end justify-center relative">
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
      </div> */

      /* Right group */
      /* <div className="absolute bottom-0 right-0 flex gap-2 z-10 pr-2 pb-0">
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
      // </div> */