"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import StarsBackground from "../Starbackround/Starbg";
import { Menu, X, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative text-yellow-400 shadow-md  ">
      <StarsBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Logo + Brand Name */}
          <div className="flex items-center space-x-3">
            <Image
              src="/RealLogo.png" // put your logo inside /public
              alt="Crown of Krishna Logo"
              width={40}
              height={40}
              className="hover:scale-180 transition-transform duration-300 hover:cursor-pointer"
            />
            <span className=" font-bold tracking-wide">
             <span className="text-2xl">Crown </span>
              <span className="text-3xl">of </span>
              <span className="text-4xl">Krishna</span>
            </span>
          </div>

          {/* Right: Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <Link href="/About" className="hover:text-white transition">
              About
            </Link>
            <Link href="/Contact" className="hover:text-white transition">
              Contact
            </Link>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="flex items-center space-x-2 bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? (
                <X className="text-yellow-400" size={24} />
              ) : (
                <Menu className="text-yellow-400" size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden relative border-t font-bold border-yellow-400">
          <div className="flex flex-col space-y-3 px-4 py-3">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="/About" className="hover:text-white">
              About
            </Link>
            <Link href="/Contact" className="hover:text-white">
              Contact
            </Link>

            <Link
              href="/cart"
              className="flex items-center justify-center space-x-2 bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
            </Link>
          </div>
        </div>
      )} 
     <div className="w-full h-10 overflow-hidden">
  <svg
    viewBox="0 0 500 50"
    preserveAspectRatio="none"
    className="w-full h-full"
  >
    <defs>
      {/* Gradient Define */}
      <linearGradient id="goldenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFD700" />   {/* Golden */}
        <stop offset="50%" stopColor="#FFFACD" /> {/* Light Shine */}
        <stop offset="100%" stopColor="#FFD700" /> {/* Golden */}
      </linearGradient>
    </defs>

    {/* Reverse curve */}
    <path
      d="M0,10 C150,50 350,50 500,10"
      stroke="url(#goldenGradient)"
      fill="transparent"
      strokeWidth="4"
    />
  </svg>
</div>




    </nav>
   
  );
}
