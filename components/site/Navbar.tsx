"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/images/icon-umarketpro.svg"
            alt="CitadelMarketPro"
            className="w-10 h-10"
          />
          <span className="text-xl font-bold text-gray-800">
            Citadel<span className="text-[#00C896]">MarketPro</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div
          ref={dropdownRef}
          className="hidden md:flex items-center space-x-8 text-gray-700 font-medium"
        >
          {/* About */}
          <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
            {/* About */}
            <div className="relative">
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-1 hover:text-[#00C896]"
              >
                Home
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
            {/* About */}
            <div className="relative">
              <button
                onClick={() => router.push("/about")}
                className="flex items-center gap-1 hover:text-[#00C896]"
              >
                About Us
              </button>
            </div>
          </div>

          {/* Dropdown - Markets */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("markets")}
              className="flex items-center gap-1 hover:text-[#00C896]"
            >
              Markets <ChevronDown size={16} />
            </button>
            <AnimatePresence>
              {activeDropdown === "markets" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-10 left-0 bg-white shadow-lg rounded-lg py-3 w-44"
                >
                  <Link
                    href="/forex"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Forex
                  </Link>
                  <Link
                    href="/stocks"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Stocks
                  </Link>
                  <Link
                    href="/commodities"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Commodities
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Button */}
          <Link
            href="/register"
            className="ml-4 px-6 py-2 rounded-full text-white font-semibold bg-[#00C896] hover:bg-[#00b184] transition"
          >
            Open Account
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-inner"
          >
            <div className="flex flex-col px-6 py-4 space-y-3 text-gray-700 font-medium">
              <Link href="/" className="hover:text-[#00C896]">
                Home
              </Link>
              <Link href="/about" className="hover:text-[#00C896]">
                About Us
              </Link>
              <Link href="/forex" className="hover:text-[#00C896]">
                Forex
              </Link>
              <Link href="/stocks" className="hover:text-[#00C896]">
                Stocks
              </Link>
              <Link href="/commodities" className="hover:text-[#00C896]">
                Commodities
              </Link>
              <Link
                href="/register"
                className="mt-3 px-6 py-3 rounded-full text-center text-white font-semibold bg-[#00C896] hover:bg-[#00b184] transition"
              >
                Open Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
