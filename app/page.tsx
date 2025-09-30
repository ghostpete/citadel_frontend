"use client";
import { useState } from "react";
import Header from "@/components/main/Header";
import OrderPanel from "@/components/main/OrderPanel";
import Sidebar from "@/components/main/Sidebar";
import TradingChart from "@/components/main/TradingChart";
import MarketWatch from "@/components/main/MobileView";

export default function Home() {
  const [symbol, setSymbol] = useState("FX:AUDCAD");
  return (
    <>
      <MarketWatch />
    </>
  );
}
