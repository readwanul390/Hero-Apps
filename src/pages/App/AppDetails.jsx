import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaDownload, FaStar } from "react-icons/fa6";
import Navbar from "../../components/Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Footer from "../../components/Footer/Footer";

function AppDetails() {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const foundApp = data.find((a) => a.id === parseInt(id));
        setApp(foundApp);
        
       
        const installedApps = JSON.parse(localStorage.getItem("installedApps")) || [];
        const isInstalled = installedApps.some((installedApp) => installedApp.id === foundApp.id);
        setInstalled(isInstalled);
      });
  }, [id]);

  if (!app) return <p className="text-center mt-8">Loading App...</p>;

  const handleInstall = () => {
    
    const installedApps = JSON.parse(localStorage.getItem("installedApps")) || [];
    
    const alreadyInstalled = installedApps.some((installedApp) => installedApp.id === app.id);
    
    if (!alreadyInstalled) {
      installedApps.push(app);
      localStorage.setItem("installedApps", JSON.stringify(installedApps));
      setInstalled(true);
      
      toast.success(`${app.title} Installed Successfully!`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="p-6 w-full mx-auto">
      <Navbar />

      {/* App Header Section */}
      <div className="flex flex-col md:flex-row items-start gap-8 mt-6">
        {/* 🖼️ App Image */}
        <div className="md:w-1/3">
          <img
            src={app.image}
            alt={app.title}
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

        {/* ℹ️ App Information */}
        <div className="md:w-2/3 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{app.title}</h1>
          <p className="text-gray-600">
            Developed by{" "}
            <span className="text-blue-600 font-medium">{app.companyName}</span>
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-6 text-gray-700 font-medium">
            <div className="flex items-center gap-2 text-green-600">
              <FaDownload />
              <span>{app.downloads} Downloads</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-500">
              <FaStar />
              <span>{app.ratingAvg} / 5</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <span>{app.reviews} Reviews</span>
            </div>
          </div>

          {/* Install Button */}
          <button
            onClick={handleInstall}
            disabled={installed}
            className={`mt-4 px-6 py-2 rounded-lg text-white font-semibold transition ${
              installed
                ? "bg-green-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {installed ? "Installed" : `Install Now (${app.size}MB)`}
          </button>
        </div>
      </div>

      {/* 📊 Ratings Chart */}
      <div className="mt-10 bg-gray-50 p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Ratings Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            layout="vertical"
            data={app.ratings}
            margin={{ top: 10, right: 30, left: 50, bottom: 0 }}
          >
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#FF8811"
              barSize={25}
              radius={[5, 5, 5, 5]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📝 Description Section */}
      <div className="mt-10 bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          About This App
        </h2>
        <p className="text-gray-700 leading-relaxed">{app.description}</p>
      </div>
      <ToastContainer />
      <Footer></Footer>
    </div>
  );
}

export default AppDetails;