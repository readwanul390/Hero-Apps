import React, { useState, useEffect } from "react";
import { FaDownload, FaStar } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


function AppStore() {
  const [apps, setApps] = useState([]);
  
    useEffect(() => {
      fetch("/data.json")
        .then((response) => response.json())
        .then((data) => setApps(data));
    }, []);
  
  return (
    <div className="w-full mx-auto">
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