import Container from "@/components/site/Container";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";
import { Button } from "@/components/ui/button";
import { Coins, Globe2, LineChart, Users2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <section
        className="relative min-h-[60vh] w-full  bg-center flex items-center justify-center pt-20"
        style={{ backgroundImage: "url(/images/chart-bckg.webp)" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        <Container>
          {/* Content on top */}
          <div className="relative z-10 flex items-center flex-col md:flex-row gap-6 sm:gap-4 justify-center h-full text-white">
            {/* Left side - Text */}
            <div className="space-y-3 flex-1">
              <h1 className="font-extrabold leading-tight text-sm text-[#00C896]">
                About Us
              </h1>

              <p className="text-sm text-gray-200 leading-relaxed max-w-lg">
                At CitadelMarketPro, our clients are at the center of everything
                we do. We are committed to providing a safe and secure trading
                environment, backed by robust government regulation through the
                FSCA. Our platform is designed to offer outstanding service at
                every step, from personalized support to advanced trading tools.
                We go beyond the basics with features that add real value to
                your trading experience. Our deposit bonus and referral programs
                create opportunities for growth, while our innovative rewards
                feature helps you make the most of your trading balances. With
                CitadelMarketPro, you have everything you need to succeed in the
                dynamic world of global markets.
              </p>

              <div className="flex items-center gap-4 mt-6 mb-6">
                <Button
                  asChild
                  className="bg-[#00C896] hover:bg-[#00C896] text-white px-7 py-5 rounded-full font-semibold shadow-lg transition "
                >
                  <Link href={"/register"} className="inline-block">
                    Open Account
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right side - Text  */}
            <div className="flex-1 p-4 md:p-4 lg:p-10">
              {" "}
              {/* container controls size */}
              <Image
                src="/images/young-woman-working.jpg"
                alt="hero image"
                width={1536}
                height={1348}
                className="w-auto rounded-2xl" // or object-cover depending on what you need
              />
            </div>
          </div>
        </Container>
      </section>{" "}
      <section className="py-5 bg-white">
        <Container className="flex gap-3 flex-col md:flex-row ">
          <div className="p-3">
            {/* Left Image */}
            <div className="h-60 sm:h-70">
              <Image
                src="/images/stock-work.jpg"
                alt="Business Vision"
                width={700}
                height={500}
                className="rounded-2xl h-full w-full object-cover"
              />
            </div>

            {/* Right Text */}
            <div className="space-y-5 mt-5">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                The CitadelMarketPro Vision
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                At CitadelMarketPro, we’re committed to delivering exceptional
                email support. Every inquiry is handled with care and urgency,
                ensuring you receive a prompt and thorough response from our
                expert team. It’s all part of our commitment to providing a
                seamless and supportive experience for every trader.
              </p>
              <Button
                asChild
                className="bg-[#00C896] hover:bg-[#00926d] text-white rounded-full px-7 py-5 font-semibold transition"
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>

          {/* Second Row */}
          <div className="p-3">
            {/* Text in the Top */}
            <div className="hh-60 sm:h-70">
              <Image
                src="/images/about-1.jpg"
                alt="Business Strategy"
                width={700}
                height={500}
                className="rounded-2xl w-full h-full object-cover"
              />
            </div>
            {/* Text in the Bottom */}
            <div className="space-y-5 mt-5">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Safety and Regulation
              </h2>

              <p className="text-gray-600 leading-relaxed text-base">
                The ESMA is Europe’s regulatory body for market conduct,
                ensuring that financial markets operate with integrity and
                transparency. It supervises financial service providers like
                uMarketpro, ensuring adherence to ethical practices and
                compliance with all legal requirements. This oversight aligns
                with international standards, enhancing the trustworthiness and
                reliability of the financial services it regulates.
              </p>
              <Button
                asChild
                className="bg-[#00C896] hover:bg-[#00926d] text-white rounded-full px-7 py-5 font-semibold transition"
              >
                <Link href="/register">Open an Account</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-5 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Left Side Text */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Why CitadelMarketPro Stands Out?
              </h2>
              <p className="text-gray-600 text-base md:text-lg">
                Learn more about how you can maximize your returns with
                CitadelMarketPro.
              </p>
              <Button
                asChild
                className="bg-[#00C896] hover:bg-[#00926d] text-white rounded-full px-7 py-5 font-semibold transition"
              >
                <Link href="/about" className="inline-flex items-center gap-2">
                  Learn More
                  <span className="text-lg">→</span>
                </Link>
              </Button>
            </div>

            {/* Right Side Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300">
                <div className="text-[#00C896] mb-4">
                  <Globe2 className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  Global Market Access
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Step into a world of limitless opportunities with
                  CitadelMarketPro. Gain access to top markets across the U.S.,
                  Europe, Asia, and beyond.
                </p>
              </div>

              {/* Card 2 */}
              <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300">
                <div className="text-[#00C896] mb-4">
                  <Users2 className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  Social Trading Network
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Trade smarter with the power of community. Follow top traders,
                  learn strategies, and share insights globally.
                </p>
              </div>

              {/* Card 3 */}
              <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300">
                <div className="text-[#00C896] mb-4">
                  <LineChart className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  Advanced Trading Tools
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Empower your trading with real-time analytics, precise tools,
                  and data-driven decision-making.
                </p>
              </div>

              {/* Card 4 */}
              <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300">
                <div className="text-[#00C896] mb-4">
                  <Coins className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  Earn While You Trade
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Maximize your potential with CitadelMarketPro’s innovative
                  dual-balance system, rewarding active and passive investors
                  alike.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default AboutPage;
