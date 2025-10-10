import React from "react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="w-full bg-[#001931] text-white py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-6">

        <div className="flex items-center gap-3">
          <IoLogoGooglePlaystore className="text-3xl text-[#47BCFF]" />
          <p className="text-xl font-semibold">HERO.IO</p>
        </div>

        <div className="text-center md:text-right">
          <p className="font-semibold mb-3 text-gray-300">Follow Us</p>
          <div className="flex justify-center md:justify-end gap-5 text-2xl">
            <a href="#" className="hover:text-[#1877F2] transition-colors">
              <CiFacebook />
            </a>
            <a href="#" className="hover:text-[#E4405F] transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-[#1DA1F2] transition-colors">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>


      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} HERO.IO — All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
