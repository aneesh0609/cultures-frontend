import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = ["/1.png", "/2.png", "/3.png"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex justify-center items-center bg-transparent">
      <div
        className="
          relative
          w-full sm:w-[90%] lg:w-[85%] xl:w-[80%]
          h-[80px] sm:h-[180px] md:h-[220px] lg:h-[240px]
          overflow-hidden rounded-2xl sm:rounded-xl
          sm:mt-4 mt-0
        "
      >
        {/* Image Slider */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Slide ${i + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Navigation Arrows — hidden on mobile */}
        <div className="hidden sm:block">
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 
                       bg-white/60 hover:bg-white/90 text-gray-800 rounded-full p-2 shadow-md transition"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 
                       bg-white/60 hover:bg-white/90 text-gray-800 rounded-full p-2 shadow-md transition"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Indicator — only for sm and above */}
        <div className="hidden sm:flex absolute bottom-2 left-1/2 -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-orange-600 w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
