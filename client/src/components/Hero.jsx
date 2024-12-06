"use client";

import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full bg-gray-100 py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-green-500 mb-6">
          Welcome to AuthApp
        </h1>
        <p className="text-sm md:text-base text-gray-700 mb-8">
          Simplify your authentication processes with our secure and easy-to-use
          app.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/register"
            className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition text-sm md:text-base">
            Get Started
          </Link>
          <Link
            href="/login"
            className="bg-white text-green-500 font-bold py-3 px-6 rounded-lg border border-green-500 hover:bg-gray-100 transition text-sm md:text-base">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
