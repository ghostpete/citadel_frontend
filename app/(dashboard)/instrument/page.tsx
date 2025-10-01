"use client";
import { useState } from "react";
import MarketWatch from "@/components/main/MobileView";

export default function Home() {
  const [symbol, setSymbol] = useState("FX:AUDCAD");
  return (
    <>
      <MarketWatch />
    </>
  );
}
