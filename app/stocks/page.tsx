"use client";

import React from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Container from "@/components/site/Container";
import BackgroundFact from "@/components/site/BackgroundFact";
import { Button } from "@/components/ui/button";
import { Globe2, Users2, LineChart, Coins } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const StocksPage: React.FC = () => {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="relative min-h-[56vh] w-full  bg-center flex items-center justify-center pt-20"
        style={{ backgroundImage: "url(/images/chart-bckg.webp)" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 left-0 right-0 bg-black/40 bottom-0 h-screen"></div>

        <Container>
          <div className="relative z-10 flex items-center flex-col md:flex-row gap-6 sm:gap-6 justify-between h-full text-white">
            {/* Left side - Text */}
            <div className="space-y-3 flex-1">
              <h1 className="text-sm md:text-base font-extrabold text-[#00C896]">
                Stocks
              </h1>

              <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-2xl">
                CitadelMarketPro understands the complexities of stock trading
                and is dedicated to providing South Africans with a superior
                online trading experience. We equip our clients with essential
                tools, resources, and unmatched support needed to succeed in the
                market.
              </p>

              <div className="flex items-center gap-4 mt-6 mb-6">
                <Button
                  asChild
                  className="bg-[#00C896] hover:bg-[#00b37a] text-white px-6 py-4 rounded-full font-semibold shadow-md transition"
                >
                  <Link href="/register">Open Account</Link>
                </Button>
              </div>
            </div>

            {/* Right side image (decorative) */}
            <div className="flex-1 p-2 md:p-6 hidden sm:block">
              <Image
                src="/images/pro_woman_1.jpg"
                alt="stock hero"
                width={900}
                height={700}
                className="rounded-2xl object-cover w-full max-w-[480px] shadow-2xl"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* BackgroundFact (re-usable, responsive; uses background image) */}
      <BackgroundFact
        title={"Start Your Stock Trading Journey with CitadelMarketPro"}
        text={`Recognizing the complexities of stock investments, CitadelMarketPro equips you with a suite of exclusive tools designed to enhance your trading experience. Our goal is to accelerate your learning process, ensuring a smooth and successful trading experience.`}
        subText={`With our extensive resources and unwavering commitment to education, CitadelMarketPro ensures you are well-prepared to navigate the global markets with confidence and expertise.`}
        imagePath={"/images/stock-chart-bg.jpg"}
      />

      {/* Key Benefits */}
      <section className="py-12 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Key Benefits of Stock Trading with CitadelMarketPro
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Learn more about Stocks and maximize your returns with
              CitadelMarketPro.
            </p>
            <div className="mt-4">
              <Button
                asChild
                className="bg-[#00C896] hover:bg-[#00926d] text-white rounded-full px-6 py-4 font-semibold"
              >
                <Link href="/register">Open Account</Link>
              </Button>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 bg-white">
              <div className="text-[#00C896] mb-4">
                <Globe2 className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                User-Friendly Interface
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed break-words">
                CitadelMarketPro provides an intuitive platform designed to
                enhance the trading experience for both novice and experienced
                investors.
              </p>
            </div>

            <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 bg-white">
              <div className="text-[#00C896] mb-4">
                <LineChart className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Empowerment Through Knowledge
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed break-words">
                Equipped with real-time market insights, charting capabilities,
                and technical analysis, we empower you to make informed
                decisions.
              </p>
            </div>

            <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 bg-white">
              <div className="text-[#00C896] mb-4">
                <Coins className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Cost-Effective Trading Structure
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed break-words">
                CitadelMarketPro offers competitive pricing with zero
                commissions, making stock trading more affordable and
                accessible.
              </p>
            </div>

            <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 bg-white">
              <div className="text-[#00C896] mb-4">
                <Users2 className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Diverse Asset Selection
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed break-words">
                Access a broad array of local and international stocks for
                portfolio diversification across regions and sectors.
              </p>
            </div>

            <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 bg-white col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="text-[#00C896] mb-4">
                <Globe2 className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Seamless Access to Global Markets
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed break-words">
                Engage in international markets from desktop, tablet, or mobile
                with commission-free trading across the globe.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Transform Your Investment Strategy */}
      <section className="relative bg-[#012F2D] py-16 text-white overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Transform Your Investment Strategy
              </h2>
              <p className="text-gray-200 leading-relaxed max-w-xl">
                Experience the advantages of trading with CitadelMarketPro,
                where competitive and transparent pricing aligns with your
                investment goals. Our platform combines powerful tools and
                educational resources to give you a trading edge.
              </p>

              <Button
                asChild
                className="bg-[#00C896] hover:bg-[#00926d] text-white rounded-full px-6 py-4 font-semibold"
              >
                <Link href="/register">Start Trading Stocks</Link>
              </Button>
            </div>

            <div className="flex justify-center md:justify-end">
              <Image
                src="/images/pro_woman_2.jpg"
                alt="Transform investments"
                width={600}
                height={400}
                className="rounded-xl object-cover w-full max-w-md shadow-2xl"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA - green box */}
      <section className="py-10 mt-20">
        <Container className="max-w-3xl -mt-14">
          <div className="bg-[#00C896] min-h-[24vh] w-full rounded-xl py-10 px-6 md:px-10 text-white shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold">
                  Ready to Trade Stocks with CitadelMarketPro?
                </h3>
                <p className="text-sm md:text-base mt-2 max-w-xl">
                  Whether you’re a beginner or an experienced trader,
                  CitadelMarketPro is committed to supporting all levels of
                  expertise with the tools and guidance you need.
                </p>
              </div>

              <div>
                <Button
                  asChild
                  className="rounded-full bg-white text-[#00C896] px-6 py-4 font-semibold hover:bg-gray-100"
                >
                  <Link href="/register">Start Trading Stocks</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default StocksPage;
