"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export type Trader = {
  id: number;
  name: string;
  country: string;
  avatar: string;
  gain: number;
  risk: number;
  capital: string;
  copiers: number;
  avgTradeTime: string;
  trades: number;
};

export const columns: ColumnDef<Trader>[] = [
  {
    accessorKey: "name",
    header: "Leader Name",
    cell: ({ row }) => {
      const trader = row.original;
      return (
        <div className="flex items-center gap-3">
          <Image
            src={trader.avatar}
            alt={trader.name}
            width={45}
            height={45}
            className="rounded-full"
          />
          <span className="truncate max-w-[120px] md:max-w-none text-[16px]">
            {trader.name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "gain",
    header: "Gain",
    cell: ({ row }) => {
      const gain = row.original.gain;
      return (
        <span
          className={`font-bold ${
            gain >= 0 ? "text-teal-600" : "text-red-600"
          }`}
        >
          {gain}%
        </span>
      );
    },
  },
  {
    accessorKey: "risk",
    header: "Risk",
    cell: ({ row }) => {
      const risk = row.original.risk;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border ${
            risk <= 3
              ? "bg-teal-100 text-teal-700 border-teal-300"
              : "bg-red-100 text-red-700 border-red-300"
          }`}
        >
          {risk}
        </span>
      );
    },
  },
  {
    accessorKey: "capital",
    header: "Capital",
  },
  {
    accessorKey: "copiers",
    header: "Copiers",
  },
  {
    accessorKey: "avgTradeTime",
    header: "Avg. Trade Time",
  },
  {
    accessorKey: "trades",
    header: "Trades",
  },
  {
    id: "fav",
    header: "Fav",
    cell: () => <Star size={18} className="text-gray-500 cursor-pointer" />,
  },
  {
    id: "actions",
    header: "Action",
    cell: () => (
      <Button
        size="sm"
        className="bg-teal-600 rounded-none px-6 hover:bg-teal-700 text-white"
      >
        COPY
      </Button>
    ),
  },
];
