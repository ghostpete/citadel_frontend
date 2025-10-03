"use client";

import { useEffect, useRef } from "react";

// Declare TradingView globally so TypeScript knows about it
declare global {
  interface Window {
    TradingView: any;
  }
}

export default function TradingChart({ symbol }: { symbol?: string | null }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    // Clear old chart before rendering a new one
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol || "EURUSD", // fallback if null
          interval: "1",
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          locale: "en",
          container_id: "tradingview_chart",
        });
      }
    };

    container.current.appendChild(script);
  }, [symbol]);

  return (
    <div id="tradingview_chart" className="w-full h-full" ref={container}></div>
  );
}
