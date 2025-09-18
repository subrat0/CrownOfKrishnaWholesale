"use client"; // Ensure client-side rendering
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import products from "@/data/products";

const HomeSection = () => {
  const [loadingIds, setLoadingIds] = useState({});

  const handleClick = (id) => {
    setLoadingIds((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="w-full text-white flex flex-col items-center font-bold text-3xl py-4 gap-6 m-4 px-6">
      <div className="heading cursor-pointer text-[20px] sm:text-[30px] md:text-[55px] lg:text-[60px] text-center">
        <h1>ORDER PRODUCTS IN WHOLESALE</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[...products].reverse().map((item) => (
          <Link
            key={item.id}
            href={`/Product/${item.id}`}
            onClick={() => handleClick(item.id)}
            className="cursor-pointer block"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 border border-white">
              <Image
                src={item.images[0]}
                alt={item.title}
                width={400}
                height={192}
                className="w-full h-48 object-contain cursor-pointer"
              />
              <div className="p-4 border-t-2 border-black bg-black text-white cursor-pointer">
                <h3 className="text-lg font-bold text-amber-50 cursor-pointer">{item.title}</h3>
                <p className="text-amber-50 text-sm mt-2 cursor-pointer">{item.desc}</p>
                <div className="flex mt-4 justify-center">
                  <button
                    disabled={loadingIds[item.id]}
                    className={`bg-yellow-500 text-[20px] px-5 py-3 text-black rounded-lg font-semibold hover:bg-yellow-600 transition ${
                      loadingIds[item.id] ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loadingIds[item.id] ? "Loading..." : "See Product"}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeSection;
