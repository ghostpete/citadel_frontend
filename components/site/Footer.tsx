"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-[#012F2D] text-gray-200 py-12">
      <Container>
        {/* Top Row - Payment Logos */}
        {/* <div className="flex flex-wrap justify-center gap-10 items-center mb-12">
          <Image src="/images/visa.svg" alt="Visa" width={90} height={50} />
          <Image
            src="/images/mastercard.svg"
            alt="Mastercard"
            width={90}
            height={50}
          />
          <Image
            src="/images/verified-visa.svg"
            alt="Verified by Visa"
            width={110}
            height={50}
          />
          <Image
            src="/images/mastercard-securecode.svg"
            alt="Mastercard SecureCode"
            width={160}
            height={50}
          />
        </div> */}

        {/* Bottom Row - Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-sm">
          {/* Markets */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Markets</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="hover:underline">
                  Forex
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  Commodities
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  Precious Metals
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  Stocks
                </Link>
              </li>
            </ul>
          </div>

          {/* Promotions */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Promotions</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  7.6% Interest Rate
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Invite a Friend
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Bonus & Credit
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Cashback
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Bonus Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Platforms */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Tools & Platforms</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  CitadelMarketPro
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  CitadelMarketPro Mobile
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  CitadelMarketPro Academy
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  Android App
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Features */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Account Features</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="hover:underline">
                  Demo Account
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  Account Types
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  Individual Account
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  Joint Account
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  Corporate Account
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  Deposits
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  Withdrawals
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  CitadelMarketPro Academy
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* General Links (Optional row below) */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-xs text-gray-400 text-center">
          <p>
            © {new Date().getFullYear()} CitadelMarketPro. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
