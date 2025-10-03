"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet, TrendingDown, PiggyBank } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { cn, formatHighNumbersInCompact, getFirstLetter } from "@/lib/utils";
import { BACKEND_URL as BACKEND_URL_API } from "@/lib/constants";
import useSWR from "swr";
import { useState } from "react";

const BACKEND_URL = BACKEND_URL_API;

// fetcher helper
const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("authToken")}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch transactions");
  }
  return res.json();
};

export default function Portfolio() {
  const { user } = useUserProfile();
  const { data, error, isLoading } = useSWR(
    `${BACKEND_URL}/transactions/`,
    fetcher
  );

  const transactions = data?.transactions || [];

  const [filter, setFilter] = useState<
    "all" | "pending" | "successful" | "failed"
  >("all");

  const statusColor = (status: string) => {
    switch (status) {
      case "successful":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((txn: any) => txn.status === filter);

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen w-full">
      {/* Header */}
      <div className="bg-teal-900 text-white p-6 shadow-lg mb-20">
        <div className="flex justify-between items-center lg:max-w-6xl mx-auto">
          <h2 className="text-sm md:text-base font-medium">
            PT Live #{user?.account_id || "2738288335"}
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold">
              {getFirstLetter(user?.first_name)}
            </div>
            <div className="hidden lg:block">
              <h2 className="font-semibold text-lg">
                {user?.first_name} {user?.last_name}
              </h2>
              <p className="text-sm flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                Live account
              </p>
            </div>
          </div>
        </div>

        {/* Equity */}
        <p className="text-xl md:text-3xl font-bold mt-3 lg:max-w-6xl mx-auto">
          Equity: ${formatHighNumbersInCompact(user?.equity)}
        </p>
        <p className="text-red-400 text-sm md:text-base mt-1 lg:max-w-6xl mx-auto">
          Margin Level: {user?.margin_level}%
        </p>

        {/* Balance Info */}
        <div className="mt-6">
          <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
            <div className="flex md:grid md:grid-cols-3 gap-3 lg:max-w-6xl mx-auto min-w-max md:min-w-0 snap-x snap-mandatory">
              {/* Free Margin */}
              <Card className="shadow-md rounded-xl min-w-[140px] snap-center shrink-0">
                <CardContent className="p-3 text-teal-900 flex flex-col items-center">
                  <Wallet className="w-5 h-5 md:w-7 md:h-7 text-teal-800 mb-1" />
                  <p className="text-xs opacity-80 md:text-xl">Free Margin</p>
                  <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                    ${user?.free_margin}
                  </p>
                </CardContent>
              </Card>

              {/* Used Funds */}
              <Card className="shadow-md rounded-xl min-w-[140px] snap-center shrink-0">
                <CardContent className="p-3 text-teal-900 flex flex-col items-center">
                  <TrendingDown className="w-5 h-5 md:w-7 md:h-7 text-teal-800 mb-1" />
                  <p className="text-xs opacity-80 md:text-xl">Used Funds</p>
                  <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                    ${user?.user_funds}
                  </p>
                </CardContent>
              </Card>

              {/* Balance */}
              <Card className="shadow-md rounded-xl min-w-[140px] snap-center shrink-0">
                <CardContent className="p-3 text-teal-900 flex flex-col items-center">
                  <PiggyBank className="w-5 h-5 md:w-7 md:h-7 text-teal-800 mb-1" />
                  <p className="text-xs opacity-80 md:text-xl">Balance</p>
                  <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                    ${user?.user_funds}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="lg:max-w-6xl mx-auto px-4">
        <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {["all", "pending", "successful", "failed"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status as any)}
              className={cn(
                "capitalize hover:bg-teal-900 hover:text-white",
                filter === status ? "bg-teal-900" : ""
              )}
            >
              {status}
            </Button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <Card className="p-6 space-y-3">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </Card>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500 text-center mt-10">
            Failed to load transactions
          </p>
        )}

        {/* Transactions Table */}
        {filteredTransactions.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="capitalize">
                {filter} Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2">Ref</th>
                      <th className="px-3 py-2">Type</th>
                      <th className="px-3 py-2">Amount</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((txn: any) => (
                      <tr key={txn.id} className="border-b">
                        <td className="px-3 py-2">{txn.reference}</td>
                        <td className="capitalize px-3 py-2">
                          {txn.transaction_type}
                        </td>
                        <td className="px-3 py-2">${txn.amount}</td>
                        <td className="px-3 py-2">
                          <Badge
                            className={statusColor(txn.status) + " capitalize"}
                          >
                            {txn.status}
                          </Badge>
                        </td>
                        <td className="px-3 py-2">
                          {new Date(txn.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : (
          !isLoading && (
            <div className="text-center text-gray-500 mt-10">
              No transactions found.
            </div>
          )
        )}

        {/* Start Trading Button */}
        <div className="text-center mt-10 ">
          <Button className="mt-6 mb-50 px-6 py-2 text-sm md:text-base rounded-lg bg-teal-900 hover:bg-teal-800">
            Start Trading
          </Button>
        </div>
      </div>
    </div>
  );
}
