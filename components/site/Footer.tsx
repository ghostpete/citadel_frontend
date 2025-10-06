"use client";

import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#012F2D] text-gray-200 py-12">
        <Container>
          {/* Bottom Row - Links */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-sm">
            {/* Markets */}
            <div>
              <h3 className="font-semibold mb-3 text-white">Markets</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/forex" className="hover:underline">
                    Forex
                  </Link>
                </li>
                <li>
                  <Link href="/commodities" className="hover:underline">
                    Commodities
                  </Link>
                </li>
                <li>
                  <Link href="/stocks" className="hover:underline">
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
              </ul>
            </div>

            {/* Tools & Platforms */}
            <div>
              <h3 className="font-semibold mb-3 text-white">
                Tools & Platforms
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/login" className="hover:underline">
                    CitadelMarketPro Web
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:underline">
                    CitadelMarketPro Mobile
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    About CitadelMarketPro
                  </Link>
                </li>
              </ul>
            </div>

            {/* Account Features */}
            <div>
              <h3 className="font-semibold mb-3 text-white">
                Account Features
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/register" className="hover:underline">
                    Open Account
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:underline">
                    Demo Account
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:underline">
                    Account Types
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:underline">
                    Deposits
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:underline">
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
                  <Link href="/about" className="hover:underline">
                    About Us
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
        </Container>
      </footer>

      {/* ✅ Legal / Regulatory Section */}
      <section className="bg-[#012F2D] text-gray-200 text-sm px-2 md:px-6 py-10 leading-relaxed">
        <div className="max-w-3xl mx-auto space-y-1 !text-[10px]">
          <p>
            CitadelMarketPro stands at the forefront of online trading,
            dedicated to delivering an unparalleled trading experience as a
            Straight Through Processing (STP) broker. It’s essential for our
            clients to know that all trades on CitadelMarketPro are executed
            through third-party liquidity providers, with whom the
            responsibility for the execution of client orders lies. As an STP
            broker, CitadelMarketPro does not have control over the swaps and
            fees determined by market conditions and liquidity providers.
          </p>

          <h4 className="font-semibold text-[#012F2D]">
            CitadelMarketPro’s Role
          </h4>
          <p>
            As a licensed intermediary, CitadelMarketPro facilitates trades
            between clients and third-party liquidity providers. Consequently,
            CitadelMarketPro (PTY) LTD operates only as a trading platform and
            does not make a market, issue or sell financial instruments, nor act
            as a money manager or fund manager.
          </p>

          <h4 className="font-semibold text-[#012F2D]">
            Global Authorization and Regulation
          </h4>
          <p>
            CitadelMarketPro (PTY) LTD is authorized and regulated in various
            jurisdictions, adhering to the highest standards of compliance and
            transparency. We do not offer our products or services to residents
            of certain jurisdictions including, but not limited to, the USA and
            Canada.
          </p>

          <p>
            CitadelMarketPro United States: Operated by CitadelMarketPro (PTY)
            LTD (“CitadelMarketPro”), a corporation duly registered under the
            laws of United States Registration Number: 2021/883859/07, having
            its address at 47 W 13th St, New York, NY 10011, USA, 8451,
            regulated by the Securities and Exchange Commission (SEC, 100020).
          </p>

          <h4 className="font-semibold text-[#012F2D]">
            Trademark and Legal Notices
          </h4>
          <p>
            The CitadelMarketPro (PTY) LTD name, logo, and related trademarks
            are properties of the CitadelMarketPro Holding Group, protected
            under trademark law. Unauthorized use is strictly prohibited.
          </p>

          <h4 className="font-semibold text-[#012F2D]">Risk Warning</h4>
          <p>
            Trading online carries a high level of risk and may not be suitable
            for all investors. Before deciding to trade, consider your
            investment objectives, experience level, and risk appetite. Note
            that you could sustain a loss of some or all of your initial
            investment.
          </p>

          <h4 className="font-semibold text-[#012F2D]">
            Accuracy and Liability Disclaimer
          </h4>
          <p>
            CitadelMarketPro (PTY) LTD takes care to ensure the accuracy of
            website information but cannot guarantee it is error-free. We
            disclaim liability for losses or damages arising from the use of
            this site.
          </p>

          <h4 className="font-semibold text-[#012F2D]">
            Privacy and Data Protection
          </h4>
          <p>
            For privacy concerns, contact{" "}
            <a
              href="mailto:privacy@citadelmarketspro.com"
              className="text-[#00C896] underline"
            >
              privacy@citadelmarketspro.com
            </a>
            . Read our Privacy Policy for details on data handling.
            CitadelMarketPro (PTY) LTD is compliant with the Protection of
            Personal Information Act and registered with the American
            Information Regulator.
          </p>

          <h4 className="font-semibold text-[#012F2D]">
            Leveraged Trading Note
          </h4>
          <p>
            Leveraged trading is complex and comes with a high risk of losing
            money rapidly due to leverage. Most retail investor accounts lose
            money when trading. Understand the risks involved and consider
            seeking independent advice.
          </p>

          <p>
            The investment amount refers to the net amount of funds (excluding
            withdrawals) deposited by the client for trading CFDs and making
            independent investment decisions.
          </p>
        </div>

        {/* General Links (Optional row below) */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-xs text-gray-400 text-center">
          <p>
            © {new Date().getFullYear()} CitadelMarketPro. All rights reserved.
          </p>
        </div>
      </section>
    </>
  );
}
