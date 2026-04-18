"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      {/* Added a main tag with padding-top so your text isn't hidden behind the fixed Navbar */}
      <main className="pt-20 px-4">
        <p>my name is saurabh</p>
      </main>
    </>
  );
}