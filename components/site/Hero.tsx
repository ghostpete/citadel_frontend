"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import Container from "./Container";

import { Globe2, Users2, LineChart, Coins } from "lucide-react";

export default function Hero() {
  return (
    <>
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
              <h1 className="font-extrabold leading-tight text-xl sm:text-2xl md:text-3xl">
                Your Passport to Global Investment
              </h1>
              <p className="text-2xl md:text-2xl font-medium text-white">
                Turning potential into performance, trade by trade
              </p>
              <p className="text-sm text-gray-200 leading-relaxed max-w-lg">
                Step into a world of opportunities with CitadelMarketPro,
                America's new online trading platform built for ambitious
                professionals like you. More than just a broker, we are your
                partner in unlocking global market access, empowering you to
                compete with investors from the U.S., Europe, and Asia. At
                CitadelMarketPro, we’re here to fuel your growth and help you
                navigate the dynamic landscape of international finance.
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
                {/* <a
                href="#"
                className="flex items-center bg-black px-5 py-3 rounded-md shadow-md"
              >
                <Image
                src="/google-play-badge.png"
                alt="Get it on Google Play"
                width={120}
                height={36}
              />
              </a> */}
              </div>
            </div>

            {/* Right side - Text  */}
            <div className="flex-1 p-4 md:p-4 lg:p-10">
              {" "}
              {/* container controls size */}
              <Image
                src="/images/business-hero.jpg"
                alt="hero image"
                width={1536}
                height={1348}
                className="w-auto rounded-2xl" // or object-cover depending on what you need
              />
            </div>
          </div>
        </Container>
      </section>

      {/* icon-umarketpro.svg */}
      <section className="flex items-center">
        <Container className="flex justify-between items-center">
          <div className="w-50 hidden lg:block"></div>
          <div className="bg-[#00C896] min-h-[30vh] w-full rounded-xl py-10 md:px-4">
            <Container className="flex flex-col md:flex-row">
              {/* Logo */}
              <div className="flex items-center justify-center md:items-start md:justify-start">
                <Image
                  width={173}
                  height={150}
                  src={"/images/icon-umarketpro.svg"}
                  alt="logo"
                />
              </div>
              <div className="text-white p-3 space-y-7">
                <h2 className="text-2xl">
                  Join the CitadelMarketPro Community
                </h2>
                <p className="text-sm">
                  Discover a trading experience that feels as familiar as your
                  favorite social feed. With CitadelMarketPro’s social trading,
                  you can follow, learn, and trade alongside top investors.
                  Share strategies, celebrate wins, and grow together—because
                  trading is better when it’s social.
                </p>
                <Button asChild className="rounded-full">
                  <Link
                    href={"/login"}
                    className="border border-white py-6 px-9 rounded-full bg-transparent hover:bg-white hover:text-[#00C896] font-light"
                  >
                    Start Trading
                  </Link>
                </Button>
              </div>
            </Container>
          </div>
        </Container>
      </section>

      {/* Why CitadelMarketPro Stands Out Section */}
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
                <Link
                  href="/learn-more"
                  className="inline-flex items-center gap-2"
                >
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

      {/* Personalized Account Levels Section */}
      <section className="relative bg-[#012F2D] py-20 overflow-hidden min-h-[30vh] mt-4">
        <div className="w-full ">
          <Container className="flex w-full flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="text-white max-w-xl">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                Personalized Account Levels
              </h2>
              <p className="text-gray-200 mb-6 leading-relaxed">
                CitadelMarketPro offers a five-tiered account structure designed
                to meet the needs of every trader — from newcomers to seasoned
                professionals. As you advance in your trading journey, enjoy
                enhanced services and exclusive benefits tailored to your
                growth.
              </p>

              <Button
                asChild
                className="bg-[#00C896] hover:bg-[#00926d] text-white rounded-full px-8 py-6 font-semibold transition"
              >
                <Link href="/register">Discover Your Ideal Account</Link>
              </Button>
            </div>

            {/* Right Image */}
            <div className="relative w-full md:w-1/2 flex justify-center">
              <div className="relative transform rotate-6 md:rotate-3">
                <Image
                  src="/images/GLC-mobile.png"
                  alt="Trading App Preview"
                  width={400}
                  height={800}
                  className="w-auto drop-shadow-[0_0_20px_rgba(0,255,153,0.3)]"
                />
              </div>
            </div>
          </Container>
        </div>
        {/* Decorative Background Slant */}
        {/* <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-1/2 bg-[#012F2D] skew-y-3 origin-top-left z-[10]"></div> */}
      </section>

      <section>
        <Container className="-mt-20 sticky top-0 max-w-[800px]">
          <div className="bg-[#00C896] min-h-[30vh] w-full rounded-xl py-10 md:px-4">
            <div className="flex flex-col justify-center items-center">
              {/* Logo */}
              <div className="text-white p-3 space-y-4 md:space-y-6 text-center">
                <h2 className="text-2xl md:text-4xl max-w-[300px] md:max-w-[400px] mx-auto font-bold">
                  Your Trade, Our Bonus: Let’s Win Together!
                </h2>
                <p className="text-sm">
                  At CitadelMarketPro’s, we’re committed to supporting your
                  trading success. Our deposit bonus offers a direct way to add
                  value to your account, giving you a stronger start in the
                  markets. Ready to see how we can support your next move?
                </p>
                <Button asChild className="rounded-full">
                  <Link
                    href={"/login"}
                    className="border border-white py-6 px-9 rounded-full bg-transparent hover:bg-white hover:text-[#00C896] font-light"
                  >
                    Claim Welcome Bonus
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Another Section */}
      <section className="py-5 bg-white">
        <Container className="flex gap-3 flex-col md:flex-row ">
          <div className="p-3">
            {/* Left Image */}
            <div className="h-60 sm:h-70">
              <Image
                src="/images/business-1.jpg"
                alt="Business Vision"
                width={700}
                height={500}
                className="rounded-2xl h-full w-full object-cover"
              />
            </div>

            {/* Right Text */}
            <div className="space-y-5 mt-5">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Building Opportunities
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                At CitadelMarketPro, we believe in creating a trading ecosystem
                designed for long-term success. Our platform is built to provide
                the right tools, insights, and support you need to navigate the
                global financial markets confidently.
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
                src="/images/business-2.jpg"
                alt="Business Strategy"
                width={700}
                height={500}
                className="rounded-2xl w-full h-full object-cover"
              />
            </div>
            {/* Text in the Bottom */}
            <div className="space-y-5 mt-5">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Trusted by Professionals
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                Thousands of traders worldwide trust CitadelMarketPro to help
                them achieve their goals. Our platform combines innovation with
                regulatory compliance, giving you the confidence to focus on
                building wealth and making smart moves in the markets.
              </p>
              <Button
                asChild
                className="bg-[#00C896] hover:bg-[#00926d] text-white rounded-full px-7 py-5 font-semibold transition"
              >
                <Link href="/login">Explore More</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

    </>
  );
}
