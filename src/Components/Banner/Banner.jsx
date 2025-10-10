import React from "react";
import Image from "../../assets/hero.png";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaAppStore } from "react-icons/fa";
import { Link } from "react-router-dom";



function Banner() {
  return (
    <section className="bg-white text-center flex flex-col items-center py-16 px-[10px]">
      <div className="max-w-3xl">
        <h1 className="md:text-5xl font-bold text-2xl ">
          We Build 
          <span className="text-[#6A2EEA]"> Productive</span> Apps
        </h1>
        <p className="text-gray-600 mt-4">
          At <span className="font-semibold">HERO.IO</span>, we craft innovative apps designed 
          to make everyday life simpler, smarter, and more exciting. 
          Our goal is to turn your ideas into digital experiences 
          that truly make an impact.
        </p>


        <div className="flex justify-center gap-4 mt-6">
          <Link to="/playstore">
            <button className="btn bg-gray-200 hover:bg-gray-300 text-gray-800 border-none flex items-center gap-2">
            <IoLogoGooglePlaystore className="text-xl  text-[#47BCFF]" /> Google Play
          </button>
          </Link>
          <Link to="/appstore">
            <button className="btn bg-gray-200 hover:bg-gray-300 text-gray-800 border-none flex items-center gap-2">
            <FaAppStore className="text-xl text-[#00BFFC]"/> App Store
            </button>
          </Link>
        </div>
      </div>

      <div className="relative mt-12">
        <img
          src={Image}
          alt="App Preview"
          className="md:w-[500px] mx-auto drop-shadow-2xl w-[300px]"
        />
      </div>

      {/* --- Stats Section --- */}
      <div className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white mt-16 rounded-2xl p-10 w-[90%] lg:w-[900px] relative top-[-63px]">
        <h2 className="text-2xl font-semibold mb-8">
          Trusted By Millions, Built For You
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Downloads */}
          <div>
            <p className="text-lg opacity-80">Total Downloads</p>
            <p className="text-4xl font-bold mt-1">29.6M</p>
            <p className="text-sm opacity-80 mt-1">
              21% More Than Last Month
            </p>
          </div>

          {/* Reviews */}
          <div>
            <p className="text-lg opacity-80">Total Reviews</p>
            <p className="text-4xl font-bold mt-1">906K</p>
            <p className="text-sm opacity-80 mt-1">
              46% More Than Last Month
            </p>
          </div>

          {/* Active Apps */}
          <div>
            <p className="text-lg opacity-80">Active Apps</p>
            <p className="text-4xl font-bold mt-1">132+</p>
            <p className="text-sm opacity-80 mt-1">
              31 More Will Launch
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
