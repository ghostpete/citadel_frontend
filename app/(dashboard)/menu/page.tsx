"use client";

import { useUserProfile } from "@/hooks/useUserProfile";
import { getFirstLetter } from "@/lib/utils";
import {
  User,
  History,
  Wallet,
  HelpCircle,
  LogOut,
  Key,
  CheckCircle,
  CircleDollarSign,
  CirclePoundSterling,
} from "lucide-react";
import Link from "next/link";

const menuItems = [
  { label: "Personal Details", icon: User, href: "/profile-details" },
  { label: "Transaction History", icon: History, href: "/history" },
  { label: "Wallet", icon: Wallet, href: "/portfolio" },
  { label: "Payments", icon: CirclePoundSterling, href: "/payments" },
  { label: "Service Desk", icon: HelpCircle, href: "/service" },
  { label: "Withdraw", icon: CircleDollarSign, href: "/withdraw" },
  { label: "Change Password", icon: Key, href: "/change-password" },
  
];

export default function MenuPage() {
  const { user } = useUserProfile();

  console.log(user);

  const logoutAction = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50 font-poppins">
        {/* Profile Header */}
        <div className="bg-teal-900 text-white p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold">
            {getFirstLetter(user?.first_name)}
          </div>
          <div>
            <h2 className="font-semibold text-lg">
              {user?.first_name} {user?.last_name}
            </h2>
            <p className="text-sm flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
              Live account
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 p-4 mb-20">
          <h3 className="text-gray-600 mb-4 font-medium max-w-[900px] ml-auto">
            Menu
          </h3>
          <div className="space-y-4 max-w-[900px] ml-auto">
            {menuItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-teal-700" />
                  <span className="text-gray-800">{item.label}</span>
                </div>
              </Link>
            ))}

            {!user?.is_verified && (
              <Link
                href={"/account-verification"}
                className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-700" />
                  <span className="text-gray-800">Account Verification</span>
                </div>
              </Link>
            )}

            <div
              onClick={() => logoutAction()}
              className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-teal-700" />
                <span className="text-gray-800">Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
