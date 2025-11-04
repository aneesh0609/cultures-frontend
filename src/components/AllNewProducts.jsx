import React from "react";

export default function NewProductCards() {
  const products = [
    { id: 1, title: "Silk Scarf", image: "/silk.jpg" },
    {
      id: 2,
      title: "Ethnic Kurta",
      image:
        "https://i.pinimg.com/originals/e1/72/12/e172121a2329991fc429c568119fac2a.jpg",
    },
    {
      id: 3,
      title: "Handmade Earrings",
      image:
        "https://i.etsystatic.com/22545476/r/il/bb3abd/4901171969/il_fullxfull.4901171969_6wb5.jpg",
    },
    {
      id: 4,
      title: "Jute Bag",
      image:
        "https://cdn.pixabay.com/photo/2018/05/18/16/47/jute-cotton-handle-bag-3411533_640.jpg",
    },
    {
      id: 5,
      title: "Boho Bracelet",
      image:
        "https://img.freepik.com/free-photo/stylish-woman-vacation-beach-colorful-yellow-sunglasess-smiling-happy-accessories-jewelry_285396-6638.jpg",
    },
  ];

  return (
    <div className="py-2">
      {/* ✅ Mobile Horizontal Scroll */}
      <div className="block sm:hidden overflow-x-auto no-scrollbar">
        <div className="flex space-x-3 w-max px-2 py-2">
          {products.map((p) => (
            <div
              key={p.id}
              className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl 
              transition-transform duration-300 cursor-pointer flex flex-col flex-shrink-0 
              w-[100px] h-[120px] border border-gray-100 hover:-translate-y-1 hover:rotate-[0.5deg]"
            >
              {/* 🌈 Top Ribbon */}
              <div className="w-full bg-gradient-to-r from-orange-400 to-red-500 py-1 text-center shadow-sm">
                <p className="text-white text-[10px] font-semibold tracking-wide uppercase">
                  New Product
                </p>
              </div>

              {/* 🖼️ Image */}
              <div className="flex-1 w-full bg-gray-100 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* 🏷️ Title */}
              <div className="w-full text-center py-1">
                <p className="text-[10px] font-semibold text-gray-700 truncate">
                  {p.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Desktop Grid */}
      <div className="hidden sm:grid sm:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
        {products.map((p) => (
          <div
            key={p.id}
            className="relative group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl 
            transition-transform duration-300 cursor-pointer flex flex-col 
            w-full max-w-[140px] h-[140px] border border-gray-100 hover:-translate-y-1 hover:rotate-[0.5deg]"
          >
            {/* 🌈 Top Ribbon */}
            <div className="w-full bg-gradient-to-r from-orange-400 to-red-500 py-1 text-center shadow-sm">
              <p className="text-white text-xs font-semibold tracking-wide uppercase">
                New Product
              </p>
            </div>

            {/* 🖼️ Image */}
          <div className="flex-1 w-full bg-white overflow-hidden">
  <img
    src={p.image}
    alt={p.title}
    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
  />
</div>


            {/* 🏷️ Title */}
            <div className="w-full text-center py-1">
              <p className="text-sm font-semibold text-gray-700 truncate">
                {p.title}
              </p>
            </div>
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
