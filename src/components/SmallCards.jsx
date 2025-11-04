import React from "react";

const CulturalMiniCards = () => {
  const dresses = [
    {
      id: 1,
      name: "Indian Saree",
      country: "India 🇮🇳",
      image:
        "https://wallpapers.com/images/featured/saree-pictures-2d8qt1hau3xlfjdp.jpg",
    },
    {
      id: 2,
      name: "Japanese Kimono",
      country: "Japan 🇯🇵",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFB-RBHIclrDD4ESOYYz4LlctWVsDERdQ5hQ&s",
    },
    {
      id: 3,
      name: "Korean Hanbok",
      country: "Korea 🇰🇷",
      image:
        "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      name: "African Dashiki",
      country: "Africa 🌍",
      image:
        "https://t3.ftcdn.net/jpg/16/85/53/56/360_F_1685535695_1o3fKYwZxrP2hKeV0PW3eyZRtHceGzGL.jpg",
    },
    {
      id: 5,
      name: "Arabic Thobe",
      country: "Arabia 🇴🇲",
      image:
        "https://t3.ftcdn.net/jpg/05/35/98/18/360_F_535981807_IVqCzKaaDWEAW6jb8822qspaiw0z25jB.jpg",
    },
  ];

  return (
    <div className=" py-4">
      {/* ✅ Mobile Scroll Slider */}
      <div className="block sm:hidden overflow-x-auto no-scrollbar">
        <div className="flex space-x-3 w-max px-2 py-2">
          {dresses.map((dress) => (
            <div
              key={dress.id}
              className="flex-shrink-0 w-[80px] rounded-lg overflow-hidden shadow-md bg-white
                         hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={dress.image}
                  alt={dress.name}
                  className="w-full h-[75px] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
              </div>
              <div className="p-1 text-center">
                <h3 className="text-[10px] font-semibold text-gray-800 truncate">
                  {dress.name}
                </h3>
                <p className="text-[9px] text-gray-500 truncate">
                  {dress.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Desktop Grid — Now 5 cards per row */}
      <div
        className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
                   gap-3 justify-items-center"
      >
        {dresses.map((dress) => (
          <div
            key={dress.id}
            className="group w-[90px] rounded-lg overflow-hidden shadow-md bg-white
                       hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="relative">
              <img
                src={dress.image}
                alt={dress.name}
                className="w-full h-[85px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
            </div>
            <div className="p-1 text-center">
              <h3 className="text-[10px] font-semibold text-gray-800 truncate">
                {dress.name}
              </h3>
              <p className="text-[9px] text-gray-500 truncate">
                {dress.country}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CulturalMiniCards;
