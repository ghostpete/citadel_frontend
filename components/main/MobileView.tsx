"use client";

import { useState } from "react";
import {
  Search,
  BarChart2,
  Users,
  Briefcase,
  Wallet,
  Menu,
} from "lucide-react";
import Image from "next/image";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { usePathname, useRouter } from "next/navigation";

// Grouped instruments (like desktop Sidebar)
const assets = {
  Forex: [
    {
      symbol: "EURUSD",
      flag: "/eurousd_nobg.png",
      change: 0.02,
      bid: 1.18031,
      ask: 1.18051,
      low: 1.17626,
      high: 1.18199,
      time: "10:47:52",
    },
    {
      symbol: "GBPUSD",
      flag: "/gbpusd_nobg.png",
      change: -0.04,
      bid: 1.35043,
      ask: 1.35082,
      low: 1.34869,
      high: 1.35278,
      time: "10:47:52",
    },
  ],
  Crypto: [
    {
      symbol: "BTCUSD",
      flag: "/btc_nobg.png",
      change: 2.4,
      bid: 27350,
      ask: 27370,
      low: 27000,
      high: 27500,
      time: "10:47:52",
    },
    {
      symbol: "ETHUSD",
      flag: "/eth_nobg.png",
      change: -1.2,
      bid: 1650,
      ask: 1655,
      low: 1600,
      high: 1680,
      time: "10:47:52",
    },
  ],
  Commodities: [
    {
      symbol: "XAUUSD",
      flag: "/gold_nobg.png",
      change: 0.5,
      bid: 1920,
      ask: 1922,
      low: 1900,
      high: 1935,
      time: "10:47:52",
    },
    {
      symbol: "XAGUSD",
      flag: "/silver_nobg.png",
      change: -0.3,
      bid: 24.1,
      ask: 24.3,
      low: 23.9,
      high: 24.5,
      time: "10:47:52",
    },
  ],
};

export default function MarketWatch() {
  const [filter, setFilter] = useState<keyof typeof assets>("Forex");
  const [activeNav, setActiveNav] = useState("Instruments");

  const setInstrument = useInstrumentStore((s) => s.setInstrument);

  const router = useRouter();

  const pathname = usePathname();

  console.log(pathname);

  return (
    <div className="h-screen flex bg-white text-sm">
      {/* Desktop Sidebar (unchanged) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-20 lg:border-r bg-white items-center py-4 space-y-6 shadow-sm">
        {[
          { name: "Instruments", icon: BarChart2, href: "/" },
          { name: "COOMA", icon: Users, href: "/social" },
          { name: "Portfolio", icon: Briefcase, href: "/portfolio" },
          { name: "Wallet", icon: Wallet, href: "/portfolio" },
          { name: "Menu", icon: Menu, href: "/menu" },
        ].map(({ name, icon: Icon, href }) => (
          <button
            key={name}
            onClick={() => router.push(href)}
            className={`flex flex-col items-center transition ${
              pathname === href
                ? "text-[#00B074]"
                : "text-gray-500 hover:text-green-500"
            }`}
          >
            <Icon size={24} />
            <span className="text-[10px] mt-1">{name}</span>
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-teal-900 text-xl text-white p-4 border-b flex justify-between items-center font-semibold shadow-sm">
          {filter} Market
          <button className="text-white text-xl cursor-pointer">⋮</button>
        </div>

        {/* Search + Filters */}
        <div className="p-3 border-b">
          {/* Search Bar */}
          <div className="flex items-center bg-gray-100 rounded px-2 py-2 md:px-3 md:py-3 mb-2">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent flex-1 outline-none text-sm"
            />
          </div>

          {/* Filter Tabs (works like Sidebar select) */}
          <div className="flex flex-wrap gap-2 text-xs overflow-x-auto pb-1">
            {Object.keys(assets).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as keyof typeof assets)}
                className={`px-3 md:px-4 py-1 md:py-2 rounded-full text-sm font-medium transition ${
                  filter === tab
                    ? "bg-[#00B074] text-white shadow"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Instruments List (filtered) */}
        <div className="flex-1 overflow-y-auto">
          {assets[filter].map((item) => (
            <div
              onClick={() => {
                setInstrument(item);
                router.push("/instrument");
              }}
              key={item.symbol}
              className="cursor-pointer px-3 py-2 border-b flex items-center justify-between hover:bg-gray-50 transition"
            >
              {/* Left Side */}
              <div>
                <div className="flex items-center gap-2">
                  <Image src={item.flag} width={40} height={40} alt="" />
                  <span className="font-semibold text-sm md:text-xl">
                    {item.symbol}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      item.change >= 0 ? "text-[#00B074]" : "text-red-600"
                    }`}
                  >
                    {item.change >= 0 ? "+" : ""}
                    {item.change}%
                  </span>
                </div>
                <div className="text-[11px] text-gray-500">
                  {item.time} &nbsp; L:{item.low} &nbsp; H:{item.high}
                </div>
              </div>

              {/* Right Side (Bid / Ask) */}
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-[12px] md:text-sm shadow">
                  {item.bid}
                </button>
                <button className="px-2 py-1 bg-[#00B074] hover:bg-[#00915e] text-white rounded-md text-[12px] md:text-sm shadow">
                  {item.ask}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 border-t flex justify-around items-center bg-teal-900 shadow-inner">
        {[
          { name: "Instruments", icon: BarChart2, href: "/" },
          { name: "COOMA", icon: Users, href: "/social" },
          { name: "Portfolio", icon: Briefcase, href: "/portfolio" },
          { name: "Wallet", icon: Wallet, href: "/wallet" },
          { name: "Menu", icon: Menu, href: "/menu" },
        ].map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => setActiveNav(name)}
            className={`flex flex-col items-center transition ${
              activeNav === name ? "text-white" : "text-white/80"
            }`}
          >
            <Icon size={22} />
            <span className="text-[11px]">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
