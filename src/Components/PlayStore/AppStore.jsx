import React, { useState, useEffect } from "react";
import { FaDownload, FaStar } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Loading = () => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin"></div>
  </div>
);

function AppStore() {
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadApps = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      const response = await fetch("/data.json");
      const data = await response.json();
      setApps(data);
      setIsLoading(false);
    };
    
    loadApps();
  }, []);
  
  return (
    <div className="w-full mx-auto">
      {isLoading && <Loading />}
      
      <Navbar></Navbar>
      <p className="text-4xl text-center">App Store</p>
      <div className="grid grid-cols-2 gap-4 p-4 lg:w-[500px] md:mx-auto">
        {apps.slice(0, 2).map((app, index) => (
          <Link to={`/app/${app.id}`} key={index}>
            <div className="card bg-base-100 w-auto shadow-sm cursor-pointer hover:shadow-lg transition">
              <figure>
                <img src={app.image} alt="App Image" />
              </figure>
              <div className="card-body">
                <p className="font-semibold">{app.title}</p>
                <div className="flex justify-between mt-2">
                  <button className="btn bg-[#F1F5E8] text-[#00D390]">
                    <FaDownload className="mr-1" /> {app.downloads}
                  </button>
                  <button className="btn bg-[#FFF0E1] text-[#FF8811]">
                    <FaStar className="mr-1" /> {app.ratingAvg}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/app">
        <button className="btn bg-[linear-gradient(to_right,#632EE3_0%,#9F62F2_100%)] mx-auto block mt-4">
          Show All
        </button>
      </Link>
      <Footer></Footer>
    </div>
  );
}

export default AppStore;