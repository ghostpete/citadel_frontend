"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { BarChart3, Zap, BookOpen, Coins } from "lucide-react";
import Container from "@/components/site/Container";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { useRouter } from "next/navigation";

const CommoditiesPage = () => {

    const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full">
        {/* ===== HERO SECTION ===== */}
        <section
          className="relative w-full bg-center bg-cover flex items-center justify-center text-white py-24 px-6"
          style={{
            backgroundImage: "url('/images/commodities-bg.jpg')", // Replace with your background
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>

          <Container className="relative z-10  max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
              Commodities Trading
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-100">
              Enhancing Your Commodity Investment Strategy
            </p>
            <p className="text-gray-200 mb-8 leading-relaxed">
              Commodities, including precious metals, energy resources, and
              agricultural products, play a crucial role in our daily lives.
              Their ongoing demand makes them an appealing investment choice.
              With CitadelMarketPro, trading in commodities provides numerous
              advantages: portfolio diversification, protection against
              inflation, insights into global market dynamics, and the
              opportunity to invest in tangible assets with intrinsic value.
            </p>
            <Button
              onClick={() => router.push("/register")}
              className="bg-[#00C896] hover:bg-[#00926d] text-white rounded-full px-8 py-3 text-lg font-semibold"
            >
              Start Trading Now
            </Button>
          </Container>
        </section>

        {/* ===== UNLOCK POTENTIAL SECTION ===== */}
        <section className="py-16 px-6 bg-white ">
          <Container>
            <h2 className="text-2xl md:text-3xl font-bold text-[#00C896] mb-4">
              Unlock the Potential of Nature’s Resources
            </h2>
            <p className="text-gray-700 max-w-3xl leading-relaxed">
              CitadelMarketPro provides a diverse selection of commodities for
              trading, including gold, silver, crude oil, natural gas, wheat,
              and more. Our platform delivers real-time market insights to keep
              you updated on the ever-changing market landscape.
            </p>
          </Container>
        </section>

        {/* ===== MASTERY SECTION ===== */}
        <section className="bg-[#012F2D] text-white py-20 px-6">
          <Container className="">
            <h2 className="text-2xl md:text-3xl font-bold text-[#00C896] mb-6">
              Mastering the World of Commodity Investments
            </h2>
            <p className="text-gray-200 max-w-3xl mb-8 leading-relaxed">
              At CitadelMarketPro, trading commodities combines ease and
              effectiveness. Our intuitive platform, enhanced by advanced
              trading tools, allows you to monitor market trends, spot trading
              opportunities, and develop your strategies with precision.
            </p>
            <Button
              onClick={() => router.push("/register")}
              variant="outline"
              className="rounded-full border-white text-[#00C896] hover:bg-white hover:text-[#00C896] px-8 py-3 text-lg"
            >
              Discover Your Ideal Account
            </Button>
          </Container>
        </section>

        {/* ===== GLOBAL COMMODITIES SECTION ===== */}
        <section className="py-16 px-6 bg-gray-50">
          <Container className="">
            <h2 className="text-2xl md:text-3xl font-bold text-[#00C896] mb-4">
              Trade with Essential Global Commodities
            </h2>
            <p className="text-gray-700 max-w-3xl leading-relaxed">
              Commodities are the foundation of global trade, consistently
              influencing the economic landscape. CitadelMarketPro gives you
              access to these vital assets, allowing you to take advantage of
              international events, supply and demand shifts, and prevailing
              market sentiments.
            </p>
          </Container>
        </section>

        {/* ===== BENEFITS SECTION ===== */}
        <section className="bg-white py-20 px-6">
          <Container>
            <h2 className="text-2xl md:text-3xl font-bold text-[#00C896]  mb-12">
              Why Choose Commodity Trading with CitadelMarketPro?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div className="p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                <BarChart3 className="text-[#00C896] w-10 h-10 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  State-of-the-Art Trading Tools
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Equipped with real-time commodity pricing, advanced charting
                  tools, and essential market insights, CitadelMarketPro ensures
                  that investors stay well-informed and ready to make strategic
                  decisions.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                <Zap className="text-[#00C896] w-10 h-10 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Leverage Up to 1:200
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Harness the power of leverage to significantly enhance your
                  purchasing capacity and capitalize on market opportunities.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                <BookOpen className="text-[#00C896] w-10 h-10 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Education at the Forefront
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We prioritize education by offering a wide array of resources
                  and expert insights designed to equip traders with the
                  knowledge they need to navigate the complexities of commodity
                  trading.
                </p>
              </div>

              {/* Card 4 */}
              <div className="p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                <Coins className="text-[#00C896] w-10 h-10 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Zero Commission Trading
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Benefit from commission-free trading, maximizing your
                  potential returns on every transaction.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="bg-[#00C896] text-white py-20 px-6 ">
          <Container>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Embark on Your Trading Journey with CitadelMarketPro!
            </h2>
            <p className="text-white/90 max-w-2xl mb-8 leading-relaxed">
              Start your adventure with CitadelMarketPro at no cost. Explore a
              realm of trading opportunities and experience the benefits of
              being part of our dynamic community.
            </p>
            <Button
              onClick={() => router.push("/register")}
              variant="secondary"
              className="bg-white text-[#00C896] hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-semibold"
            >
              Join CitadelMarketPro Today
            </Button>
          </Container>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default CommoditiesPage;
