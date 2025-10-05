import BackgroundFact from "@/components/site/BackgroundFact";
import Container from "@/components/site/Container";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";
import { Button } from "@/components/ui/button";
import { Coins, Globe2, LineChart, Users2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ForexPage = () => {
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
                Forex
              </h1>

              <p className="text-sm text-gray-200 leading-relaxed max-w-lg">
                CitadelMarketPro is your trusted partner in the complex realm of
                Forex trading. We provide a comprehensive range of Forex
                solutions designed for precision and effectiveness. Our
                experienced team, well-versed in the intricacies of Forex, is
                dedicated to offering our members valuable insights and
                unwavering support.
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
                src="/images/business-hero.jpg"
                alt="hero image"
                width={1536}
                height={1348}
                className="w-auto rounded-2xl" // or object-cover depending on what you need
              />
            </div>
          </div>
        </Container>
      </section>{" "}
      <BackgroundFact
        title={"Start Your Stock Trading Journey with CitadelMarketPro"}
        text={`CitadelMarketPro equips you with a suite of exclusive tools
              designed to enhance your trading experience. Our goal is to
              accelerate your learning process, ensuring a smooth and successful
              trading experience.`}
        subText={`
                With our extensive resources and unwavering commitment to
              education, CitadelMarketPro ensures you are well-prepared to
              navigate the global markets with confidence and expertise.
                `}
        imagePath={"/images/stock-chart-bg.jpg"}
      />
      <section className="bg-[#012F2D] py-20 text-white">
        <Container className="space-y-20">
          {/* Row 1 */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Left Text */}
            <div className="flex-1 space-y-5">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Trade with Confidence
              </h2>
              <p className="text-gray-200 leading-relaxed text-base">
                CitadelMarketPro offers a transparent and efficient way to
                engage with the Forex market. Enjoy competitive spreads and no
                commission fees to maximize your transaction value. With
                leverage options of up to 1:200, you can seize trading
                opportunities even with a modest investment. Plus, our extensive
                educational resources and dedicated customer support ensure that
                you have a well-informed and supported trading journey.
              </p>

              <Button
                asChild
                className="bg-[#00C896] hover:bg-[#00926d] text-white rounded-full px-8 py-6 font-semibold transition mt-4"
              >
                <Link href="/register">Discover Your Ideal Account →</Link>
              </Button>
            </div>

            {/* Right Image */}
            <div className="flex-1 flex justify-center md:justify-end">
              <Image
                src="/images/confidence-1.jpg"
                alt="Trade with confidence"
                width={600}
                height={400}
                className="rounded-xl object-cover w-full max-w-md"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-10">
            {/* Left Image */}
            <div className="flex-1 flex justify-center md:justify-start">
              <Image
                src="/images/confidence-2.jpg"
                alt="Maximized Returns, Minimized Risks"
                width={600}
                height={400}
                className="rounded-xl object-cover w-full max-w-md"
              />
            </div>

            {/* Right Text */}
            <div className="flex-1 space-y-5">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Maximized Returns, Minimized Risks
              </h2>
              <p className="text-gray-200 leading-relaxed text-base">
                At CitadelMarketPro, your safety is our top priority. We utilize
                cutting-edge security measures to protect your transactions and
                personal data. Our adherence to industry standards guarantees
                compliance with stringent financial regulations, ensuring a
                secure trading environment.
              </p>
            </div>
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
                Achieve Forex Mastery with CitadelMarketPro
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
      <Footer />
    </>
  );
};

export default ForexPage;
