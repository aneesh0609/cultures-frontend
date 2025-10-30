import React, { useState } from "react";

const ProductCard = ({
  title = "New Product",
  image,
  features = [
    "Hydration",
    "Protect Skin Barrier",
    "Reduce Wrinkles",
    "Anti Inflammatory",
  ],
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      onClick={() => setShowDetails((prev) => !prev)}
      className="product-card  mr-6 w-[100%]  sm:w-[260px] rounded-xl shadow-xl overflow-hidden relative cursor-pointer 
                 snap-start flex flex-col items-center justify-center gap-4 bg-black transition-all duration-300 
                 group hover:shadow-2xl select-none p-4 sm:p-3"
    >
      {/* Product Title */}
      <div className="para uppercase text-center leading-none z-10 mt-1 sm:mt-2">
        <p
          style={{
            WebkitTextStroke: "1px rgb(207, 205, 205)",
            WebkitTextFillColor: "transparent",
          }}
          className="font-bold text-base sm:text-lg -mb-5 tracking-wider text-red-300"
        >
          {title}
        </p>
        <p className="font-bold text-lg sm:text-xl tracking-wider text-red-500">
          {title}
        </p>
      </div>

      {/* Image + Slide Animation */}
      <div
        className="relative w-full aspect-[1/1.2] sm:aspect-square flex items-center justify-center overflow-hidden 
                   rounded-lg mb-3 "
      >
        {/* Product Image */}
        <img
          src={image || "https://via.placeholder.com/200x200.png?text=Product"}
          alt={title}
          className={`object-cover w-full h-full rounded-lg transition-all duration-700 
                     ${
                       showDetails
                         ? "translate-x-[110%] opacity-60"
                         : "group-hover:translate-x-[110%] group-hover:opacity-60 "
                     }`}
        />

        {/* Slide-in Details */}
        <div
          className={`absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col justify-center px-5
                      transition-all duration-700
                      ${
                        showDetails
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-[110%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
        >
          <h3 className="text-[#7b956a] font-semibold text-base sm:text-lg mb-3 uppercase">
           Details
          </h3>

          <ul className="flex flex-col gap-2">
            {features.map((item, i) => (
              <li
                key={i}
                className={`inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#ff9100]
                            transition-all duration-300 ${
                              showDetails
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0"
                            }`}
                style={{ transitionDelay: `${i * 150 + 300}ms` }}
              >
                <svg
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="3"
                  className="stroke-[#ff9100]"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="12"
                  width="12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

 
    </div>
  );
};

export default ProductCard;
