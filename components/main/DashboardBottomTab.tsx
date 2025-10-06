"use client";

import { BarChart2, Briefcase, Menu, Users, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardBottomTab = () => {
  const router = useRouter();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 border-t flex justify-around items-center bg-teal-900 shadow-inner">
      {[
        { name: "Instruments", icon: BarChart2, href: "/instrument" },
        { name: "COOMA", icon: Users, href: "/social" },
        { name: "Portfolio", icon: Briefcase, href: "/portfolio" },
        { name: "Deposit", icon: Wallet, href: "/deposit" },
        { name: "Menu", icon: Menu, href: "/menu" },
      ].map(({ name, icon: Icon, href }) => (
        <button
          key={name}
          className="flex flex-col items-center transition text-white"
          onClick={() => router.push(href)}
        >
          <Icon className="h-[25px] w-[25px]" />
          <span className="mt-1 text-[11px]">{name}</span>
        </button>
      ))}
    </div>
  );
};

export default DashboardBottomTab;
