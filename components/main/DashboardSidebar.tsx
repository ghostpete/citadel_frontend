"use client";

import { BarChart2, Briefcase, Menu, Users, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardSidebar = () => {
  const router = useRouter();
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-20 lg:border-r bg-white py-6 space-y-6 shadow-sm fixed top-0 left-0 h-screen">
      {[
        { name: "Instruments", icon: BarChart2, href: "/" },
        { name: "COOMA", icon: Users, href: "/social" },
        { name: "Portfolio", icon: Briefcase, href: "/portfolio" },
        { name: "Deposit", icon: Wallet, href: "/deposit" },
        { name: "Menu", icon: Menu, href: "/menu" },
      ].map(({ name, icon: Icon, href }) => (
        <button
          key={name}
          onClick={() => router.push(href)}
          className="flex flex-col items-center justify-center w-full py-2 text-gray-600 hover:text-teal-600 transition-colors"
        >
          <Icon className="h-[22px] w-[22px]" />
          <span className="mt-1 text-[10px]">{name}</span>
        </button>
      ))}
    </aside>
  );
};

export default DashboardSidebar;
