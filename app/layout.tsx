import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  // pick the weights you need
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "CitadelMarketPro - Your Passport to Global Investment",
  description:
    "At CitadelMarketPro, our clients are at the heart of everything we do. \
    We are dedicated to providing a safe, transparent, and secure trading environment, \
    reinforced by robust government regulation under the FSCA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
