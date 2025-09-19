"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t-2 border-gray-700 py-8 px-4 md:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">Crown Of Krishna</h2>
            <p className="text-gray-300 text-sm text-center md:text-left">
              Discover the elegance of tradition with Crown Of Krishna. Your one-stop shop for authentic and premium products.
            </p>
              <Link
              href="/Contact"
              className="bg-amber-400 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-amber-500 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Contact Us
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-amber-50 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm flex md:flex-col gap-2 md:gap-0">
              <li>
                <Link href="/" className="hover:text-yellow-500 transition cursor-pointer">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/About" className="hover:text-yellow-500 transition cursor-pointer">
                  About
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-yellow-500 transition cursor-pointer">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-yellow-500 transition cursor-pointer">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Handles */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-amber-50 mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/1EnpaP25qu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-yellow-500 transition cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/crown_of_krishna?utm_source=ig_web_button_share_sheet&igsh=ZnpjeXd3Z21vbWt6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-yellow-500 transition cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://wa.me/7017714167"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-yellow-500 transition cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
              <a
                href="mailto:crownofkrishna@gmail.com"
                className="text-gray-300 hover:text-yellow-500 transition cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Div */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm cursor-pointer">
          <p>© 2025 CrownOfKrishna. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;