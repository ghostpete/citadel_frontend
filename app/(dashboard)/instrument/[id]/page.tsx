"use client";

import TradingChart from "@/components/main/TradingChart";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { useRouter, useParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export default function InstrumentPage() {
  const instrument = useInstrumentStore((s) => s.selectedInstrument);
  const router = useRouter();

  const param = useParams();

  console.log(param);

  // Modal state
  const [tradeType, setTradeType] = useState<"buy" | "sell" | null>(null);

  // Live price simulation
  const [price, setPrice] = useState(1.17974);
  const spread = 0.0002;
  const bid = (price - spread / 2).toFixed(5);
  const ask = (price + spread / 2).toFixed(5);

  // Lot size state
  const [lotSize, setLotSize] = useState(1.0);
  const contractSize = 100000;
  const baseCurrency = instrument?.symbol.split("/")[0] || "BASE";
  const leverage = 100;
  const accountFunds = 5000;

  const lotValue = lotSize * contractSize;
  const pipValueUSD = lotSize * 10;
  const requiredMargin = (lotSize * contractSize * price) / leverage;
  const availableFunds = accountFunds - requiredMargin;

  // Stop Loss / Take Profit state
  const [useSL, setUseSL] = useState(false);
  const [useTP, setUseTP] = useState(false);

  const [stopLoss, setStopLoss] = useState({
    pips: "",
    price: "",
    value: "",
  });

  const [takeProfit, setTakeProfit] = useState({
    pips: "",
    price: "",
    value: "",
  });

  useEffect(() => {
    if (!instrument) {
      router.push("/instrument");
    }
  }, [instrument, router]);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((prev) => {
        const movement = (Math.random() - 0.5) * 0.0003;
        return +(prev + movement).toFixed(5);
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  if (!instrument) return null;

  // Confirm trade action
  const handleConfirmTrade = () => {
    const tradeData = {
      type: tradeType,
      lotSize,
      entryPrice: tradeType === "buy" ? ask : bid,
      stopLoss: useSL ? stopLoss : null,
      takeProfit: useTP ? takeProfit : null,
    };
    console.log("Trade Executed:", tradeData);
    setTradeType(null); // close modal after trade
  };

  return (
    <>
      <div className="h-screen flex flex-col relative font-poppins">
        {/* Header */}
        <div className="p-4 border-b flex flex-row-reverse justify-between items-center font-semibold text-lg">
          {instrument?.symbol}
          <button onClick={() => router.back()}>← Back</button>
        </div>

        {/* TradingView Full Chart */}
        <div className="flex-1">
          <TradingChart symbol={instrument?.symbol} />
        </div>

        {/* Fixed Buy/Sell Buttons */}
        {/* <div className="fixed bottom-20 lg:bottom-6 md:left-1/2 md:-translate-x-1/2 right-0 flex gap-2 w-full md:w-1/3 px-2">
          <button
            onClick={() => setTradeType("sell")}
            className="flex-1 rounded-md bg-red-600 hover:bg-red-500 cursor-pointer text-white px-2 py-3 text-sm md:text-xl font-bold uppercase"
          >
            Sell {bid}
          </button>
          <button
            onClick={() => setTradeType("buy")}
            className="flex-1 rounded-md bg-[#00B074] hover:bg-[#08b078] cursor-pointer text-white px-2 py-3 text-sm md:text-xl font-bold uppercase"
          >
            Buy {ask}
          </button>
        </div> */}

        {/* Trade Popup Modal */}
        {tradeType && (
          <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex justify-center items-end md:items-center z-50">
            <div className="bg-white rounded-t-2xl md:rounded-2xl w-full md:w-[400px] max-h-[90vh] overflow-y-auto p-5">
              {/* Header */}
              <div className="flex justify-between items-center mb-4 sticky top-0 bg-white py-2 z-10">
                <h2 className="text-xl font-bold">
                  {tradeType === "buy" ? "Buy" : "Sell"} {instrument.symbol}
                </h2>
                <button
                  onClick={() => setTradeType(null)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>

              {/* Current Rate */}
              <p
                className={`${
                  tradeType === "buy" ? "text-green-600" : "text-red-600"
                } text-2xl font-bold mb-2`}
              >
                {tradeType === "buy" ? ask : bid}{" "}
                <span className="text-gray-600 text-sm">Current rate</span>
              </p>

              {/* Volume Selector */}
              <div className="bg-gray-100 p-3 rounded-lg mb-3">
                <p className="text-sm font-medium">Volume in lot</p>
                <div className="flex items-center justify-between mt-2">
                  <button
                    className="px-3 py-1 rounded-md bg-gray-200 font-bold text-xl"
                    onClick={() =>
                      setLotSize((prev) =>
                        Math.max(0.01, +(prev - 0.01).toFixed(2))
                      )
                    }
                  >
                    –
                  </button>
                  <span className="text-xl font-bold">
                    {lotSize.toFixed(2)}
                  </span>
                  <button
                    className="px-3 py-1 rounded-md bg-gray-200 font-bold text-xl"
                    onClick={() =>
                      setLotSize((prev) => +(prev + 0.01).toFixed(2))
                    }
                  >
                    +
                  </button>
                </div>
                <p className="text-sm mt-1 text-gray-500">
                  1 lot = {contractSize.toLocaleString()} {baseCurrency}
                </p>
              </div>

              {/* Trade Info */}
              <div className="text-sm space-y-1 mb-3">
                <p>
                  Lot Value:{" "}
                  <span className="font-bold">
                    {lotValue.toLocaleString()} {baseCurrency}
                  </span>
                </p>
                <p>
                  Pips Value:{" "}
                  <span className="font-bold">${pipValueUSD.toFixed(2)}</span>
                </p>
                <p>
                  Required Margin:{" "}
                  <span className="font-bold">
                    ${requiredMargin.toFixed(2)}
                  </span>
                </p>
                <p>
                  Available Funds:{" "}
                  <span className="font-bold">
                    ${availableFunds.toFixed(2)}
                  </span>
                </p>
              </div>

              {/* Stop Loss & Take Profit */}
              <div className="grid grid-cols-1 gap-3 mb-4">
                {/* Stop Loss */}
                <div>
                  <label className="flex items-center gap-2 text-sm mb-1">
                    <Checkbox
                      checked={useSL}
                      onCheckedChange={(v) => setUseSL(!!v)}
                    />
                    Stop Loss
                  </label>
                  {useSL && (
                    <div className="rounded p-2 text-sm flex items-center gap-2">
                      <div className="flex gap-4 flex-col">
                        <p>Pips:</p>
                        <p>Price:</p>
                        <p>Value:</p>
                      </div>
                      <div>
                        <Input
                          placeholder="1203"
                          className="border p-2"
                          value={stopLoss.pips}
                          onChange={(e) =>
                            setStopLoss({ ...stopLoss, pips: e.target.value })
                          }
                        />
                        <Input
                          placeholder="1347"
                          className="border p-2"
                          value={stopLoss.price}
                          onChange={(e) =>
                            setStopLoss({ ...stopLoss, price: e.target.value })
                          }
                        />
                        <Input
                          placeholder="2032"
                          className="border p-2"
                          value={stopLoss.value}
                          onChange={(e) =>
                            setStopLoss({ ...stopLoss, value: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Take Profit */}
                <div>
                  <label className="flex items-center gap-2 text-sm mb-1">
                    <Checkbox
                      checked={useTP}
                      onCheckedChange={(v) => setUseTP(!!v)}
                    />
                    Take Profit
                  </label>
                  {useTP && (
                    <div className="rounded p-2 text-sm flex items-center gap-2">
                      <div className="flex gap-4 flex-col">
                        <p>Pips:</p>
                        <p>Price:</p>
                        <p>Value:</p>
                      </div>
                      <div>
                        <Input
                          placeholder="1203"
                          className="border p-2"
                          value={takeProfit.pips}
                          onChange={(e) =>
                            setTakeProfit({
                              ...takeProfit,
                              pips: e.target.value,
                            })
                          }
                        />
                        <Input
                          placeholder="1347"
                          className="border p-2"
                          value={takeProfit.price}
                          onChange={(e) =>
                            setTakeProfit({
                              ...takeProfit,
                              price: e.target.value,
                            })
                          }
                        />
                        <Input
                          placeholder="2032"
                          className="border p-2"
                          value={takeProfit.value}
                          onChange={(e) =>
                            setTakeProfit({
                              ...takeProfit,
                              value: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirmTrade}
                className={`w-full py-3 rounded-lg font-bold text-white ${
                  tradeType === "buy" ? "bg-[#00B074]" : "bg-red-600"
                }`}
              >
                {tradeType === "buy" ? "BUY" : "SELL"} @{" "}
                {tradeType === "buy" ? ask : bid}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
