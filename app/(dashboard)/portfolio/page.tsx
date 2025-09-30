"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Wallet, TrendingDown, PiggyBank } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { formatHighNumbersInCompact, getFirstLetter } from "@/lib/utils";

export default function Portfolio() {
  const { user, error, loading } = useUserProfile();

  console.log(formatHighNumbersInCompact(1034000));

  console.log(user);
  return (
    <>
      <div className="space-y-6 bg-gray-50 min-h-screen w-full">
        <style jsx global>{`
          .no-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
            height: 0;
          }
        `}</style>

        {/* Header */}
        <div className="bg-teal-900 text-white p-6 shadow-lg mb-20">
          <div className="flex justify-between items-center lg:max-w-6xl mx-auto ">
            <h2 className="text-sm md:text-base font-medium">
              PT Live #{user?.account_id ? user.account_id : "2738288335"}
            </h2>

            <div className="text-white lg:p-6 flex items-center gap-4 ">
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
          <p className="text-xl md:text-3xl font-bold mt-3 lg:max-w-6xl mx-auto ">
            Equity: ${formatHighNumbersInCompact(user?.equity)}
          </p>
          <p className="text-red-400 text-sm md:text-base mt-1 lg:max-w-6xl mx-auto ">
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

        {/* Tabs */}
        <Tabs defaultValue="open" className="w-full lg:max-w-6xl mx-auto">
          <TabsList
            className="
            flex flex-col gap-2 
            sm:grid sm:grid-cols-3 sm:gap-0
            w-full rounded-xl shadow-sm
          "
          >
            <TabsTrigger value="open" className="w-full text-sm sm:text-base">
              Open Orders
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="w-full text-sm sm:text-base"
            >
              Pending Orders
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="w-full text-sm sm:text-base"
            >
              Trade History
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent
            value="open"
            className="mt-6 border-t border-gray-200 pt-6"
          >
            <p className="text-center text-gray-600">Open Orders content...</p>
          </TabsContent>
          <TabsContent
            value="pending"
            className="mt-6 border-t border-gray-200 pt-6"
          >
            <p className="text-center text-gray-600">
              Pending Orders content...
            </p>
          </TabsContent>
          <TabsContent
            value="history"
            className="mt-6 border-t border-gray-200 pt-6"
          >
            <p className="text-center text-gray-600">
              Trade History content...
            </p>
          </TabsContent>
        </Tabs>

        {/* No Open Trades */}
        <div className="text-center mt-10">
          {/* <p className="text-sm md:text-base text-gray-600">
            P/L <span className="text-teal-600 font-semibold">$0.00</span>
          </p> */}
          <div className="mt-8">
            <div className="mx-auto w-14 h-14 md:w-20 md:h-20 bg-gray-200 rounded-full flex items-center justify-center shadow">
              📂
            </div>
            <p className="text-gray-600 mt-4 font-medium text-base md:text-lg">
              No Open Trades
            </p>
            <p className="text-gray-400">You don&apos;t have any open trades</p>
            <Button className="mt-6 mb-30 px-6 py-2 text-sm md:text-base rounded-lg bg-teal-900 hover:bg-teal-800">
              Start Trading
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
