"use client";
import Footer from "@/components/site/Footer";
import Hero from "@/components/site/Hero";
import Navbar from "@/components/site/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
}
