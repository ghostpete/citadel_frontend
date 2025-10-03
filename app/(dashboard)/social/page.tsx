"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { DataTable } from "./components/data-table";
import { columns, Trader } from "./components/columns";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/constants";

// Define the response type from Django API
type TraderApiResponse = {
  id: number;
  name: string;
  country: string;
  avatar: string; // cloudinary URL
  gain: string | number; // may come as string from API
  risk: string;
  capital: string | number;
  copiers: number;
  avg_trade_time: string;
  trades: number;
};

export default function CopyTradersPage() {
  const [activeTab, setActiveTab] = useState("All Categories");
  const [traders, setTraders] = useState<Trader[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchTraders = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/traders/`);
        if (!res.ok) throw new Error("Failed to fetch traders");
        const data: TraderApiResponse[] = await res.json();

        // Map Django API fields to your Trader type
        const formatted: Trader[] = data.map((t, index: number) => ({
          id: t.id || index,
          name: t.name,
          country: t.country,
          avatar: t.avatar,
          gain: typeof t.gain === "string" ? parseFloat(t.gain) : t.gain,
          risk: typeof t.risk === "string" ? parseFloat(t.risk) : t.risk, // ✅ fixed here
          capital: `$${t.capital}`,
          copiers: t.copiers,
          avgTradeTime: t.avg_trade_time,
          trades: t.trades,
        }));

        setTraders(formatted);
      } catch (err) {
        console.error("Error fetching traders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTraders();
  }, []);

  return (
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
          {["All Categories"].map((tab) => (
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

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center h-40 text-gray-500">
            Loading traders...
          </div>
        ) : (
          <DataTable columns={columns} data={traders} />
        )}
      </div>
    </div>
  );
}
