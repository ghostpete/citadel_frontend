"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { DataTable } from "./components/data-table";
import { columns, Trader } from "./components/columns";
import { useRouter } from "next/navigation";

const traders: Trader[] = [
  {
    id: 1,
    name: "João Tomás Caçoete",
    country: "Portugal",
    avatar: "https://i.pravatar.cc/60?img=1",
    gain: 194.32,
    risk: 2,
    capital: "$304,471",
    copiers: 88,
    avgTradeTime: "1 week",
    trades: 123,
  },
  {
    id: 2,
    name: "Wadooa Aladraj",
    country: "Germany",
    avatar: "https://i.pravatar.cc/60?img=2",
    gain: 32.14,
    risk: 3,
    capital: "$661,569",
    copiers: 37,
    avgTradeTime: "5 days",
    trades: 254,
  },
];

export default function CopyTradersPage() {
  const [activeTab, setActiveTab] = useState("Most Copied");

  const router = useRouter();

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white font-poppins">
        {/* Header */}
        <div className="flex items-center bg-teal-900 text-white px-4 py-3">
          <div className="cursor-pointer" onClick={() => router.back()}>
            <ArrowLeft className="w-6 h-6 mr-3" />
          </div>
          <h1 className="text-lg md:text-xl font-semibold">Copy Traders</h1>
        </div>

        <div className="flex-1 p-4 md:p-6">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6 flex flex-wrap gap-3 text-sm text-gray-700 justify-center md:justify-start">
            {[
              "All Categories",
              // "Most Copied",
              // "Editors' Choice",
              // "Most Profitable",
              // "Trending",
              // "Top Investors",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-3 border-b-2 transition ${
                  activeTab === tab
                    ? "border-teal-900 text-teal-900 font-medium"
                    : "border-transparent hover:text-teal-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* DataTable */}
          <DataTable columns={columns} data={traders} />
        </div>
      </div>
    </>
  );
}
