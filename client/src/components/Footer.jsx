"use client";

const Footer = () => {
  return (
    <footer className="w-full bg-green-500 text-white py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm md:text-base">
          © {new Date().getFullYear()} AuthApp. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
