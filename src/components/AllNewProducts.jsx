import React from "react";

export default function NewProductCards() {
  const products = [
    {
      id: 1,
      title: "Silk Scarf",
      image:
        "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      title: "Ethnic Kurta",
      image:
        "https://images.unsplash.com/photo-1583744946564-b52ac1c389c9?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      title: "Handmade Earrings",
      image:
        "https://images.unsplash.com/photo-1598550874175-4d5f1a517a6b?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      title: "Jute Bag",
      image:
        "https://images.unsplash.com/photo-1620331311527-7c917b2e74a8?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 5,
      title: "Boho Bracelet",
      image:
        "https://images.unsplash.com/photo-1617038449616-6b97c96e8881?auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <div className=" py-2">
      {/* ✅ Mobile Horizontal Scroll */}
      <div className="block sm:hidden overflow-x-auto no-scrollbar">
        <div className="flex space-x-3 w-max px-2 py-2">
          {products.map((p) => (
            <div
              key={p.id}
              className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl 
                         transition-transform duration-300 cursor-pointer flex flex-col items-center 
                         justify-between flex-shrink-0 w-[100px] h-[120px] border border-gray-100 
                         transform hover:-translate-y-1 hover:rotate-[0.5deg]"
            >
              {/* 🌈 Top Ribbon */}
              <div className="w-full bg-gradient-to-r from-orange-400 to-red-500 py-1 text-center shadow-sm">
                <p className="text-white text-[10px] font-semibold tracking-wide uppercase">
                  New Product
                </p>
              </div>

              {/* 🖼️ Image */}
              <div className="flex-1 w-full flex items-center justify-center bg-gray-100">
                <img
                  src={p.image}
                  alt={p.title}
                  className="object-cover w-[65%] h-[65%] rounded-md transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* 🏷️ Title */}
              <div className="w-full text-center py-1">
                <p className="text-[10px] font-semibold text-gray-700 group-hover:text-red-500 transition-all duration-300 truncate">
                  {p.title}
                </p>
              </div>

              {/* 💫 Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                           bg-gradient-to-t from-transparent via-orange-50/60 to-transparent pointer-events-none"
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Desktop Grid (unchanged) */}
      <div
        className="hidden sm:grid sm:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center"
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="relative group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl 
                       transition-transform duration-300 cursor-pointer flex flex-col items-center 
                       justify-between w-full max-w-[140px] h-[140px] border border-gray-100 transform 
                       hover:-translate-y-1 hover:rotate-[0.5deg]"
          >
            {/* 🌈 Top Ribbon */}
            <div className="w-full bg-gradient-to-r from-orange-400 to-red-500 py-1 text-center shadow-sm">
              <p className="text-white text-xs font-semibold tracking-wide uppercase">
                New Product
              </p>
            </div>

            {/* 🖼️ Image Section */}
            <div className="flex-1 w-full flex items-center justify-center bg-gray-100">
              <img
                src={p.image}
                alt={p.title}
                className="object-cover w-[65%] h-[65%] rounded-md transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* 🏷️ Title */}
            <div className="w-full text-center py-1">
              <p className="text-sm font-semibold text-gray-700 group-hover:text-red-500 transition-all duration-300 truncate">
                {p.title}
              </p>
            </div>

            {/* 💫 Light Glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                         bg-gradient-to-t from-transparent via-orange-50/60 to-transparent pointer-events-none"
            ></div>
          </div>
        ))}
      </div>

      {/* 🔒 Hide Scrollbar on Mobile */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
