import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaDownload, FaStar, FaTrash } from "react-icons/fa6";
import Navbar from "../../components/Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/Footer/Footer";


const Loading = () => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin"></div>
  </div>
);

function MyInstallation() {
  const [installedApps, setInstalledApps] = useState([]);
  const [sortOrder, setSortOrder] = useState("none"); 
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const loadApps = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      const apps = JSON.parse(localStorage.getItem("installedApps")) || [];
      setInstalledApps(apps);
      setIsLoading(false);
    };
    
    loadApps();
  }, []);

  const handleUninstall = (appId, appTitle) => {
    const updatedApps = installedApps.filter((app) => app.id !== appId);
    setInstalledApps(updatedApps);
    localStorage.setItem("installedApps", JSON.stringify(updatedApps));

    toast.error(`${appTitle} Uninstalled Successfully!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleCardClick = (appId) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/app/${appId}`);
      setIsLoading(false);
    }, 300);
  };

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);
    setIsLoading(true);

    setTimeout(() => {
      let sortedApps = [...installedApps];
      if (order === "high-low") {
        sortedApps.sort((a, b) => parseFloat(b.downloads) - parseFloat(a.downloads));
      } else if (order === "low-high") {
        sortedApps.sort((a, b) => parseFloat(a.downloads) - parseFloat(b.downloads));
      }

      setInstalledApps(sortedApps);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="bg-gray-50 md:w-auto w-full">
      <Navbar />

      {isLoading && <Loading />}

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Installed Apps
            </h1>
            <p className="text-gray-500">
              Explore All Trending Apps on the Market developed by us
            </p>
          </div>

          {installedApps.length > 0 && (
            <div className="mt-4 md:mt-0">
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="none">Sort by Downloads</option>
                <option value="high-low">High-Low</option>
                <option value="low-high">Low-High</option>
              </select>
            </div>
          )}
        </div>

        {installedApps.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No apps installed yet</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Browse Apps
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600 text-sm mb-3">
              {installedApps.length} Apps Found
            </p>

            {installedApps.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between bg-white shadow-sm border border-gray-100 rounded-lg md:p-4 hover:shadow-md transition md:w-auto w-full"
              >
                <div
                  className="flex items-center md:gap-4 cursor-pointer gap-2 "
                  onClick={() => handleCardClick(app.id)}
                >
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {app.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <FaDownload className="text-green-600" />
                        <span>{app.downloads}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <span>{app.ratingAvg}</span>
                      </div>
                      <div>{app.size} MB</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleUninstall(app.id, app.title)}
                  className="md:px-4 md:py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition flex items-center gap-2 p-1"
                >
                  <FaTrash className="text-sm" />
                  Uninstall
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <ToastContainer />
      <Footer />
    </div>
  );
}

export default MyInstallation;