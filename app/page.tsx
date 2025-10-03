"use client";
import Link from "next/link";

export default function Home() {
  return (
    <>
      This is the Home route. Go to <Link href={"/portfolio"}>Dasboard.</Link>
    </>
  );
}
