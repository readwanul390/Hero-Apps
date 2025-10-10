import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { FaDownload } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom"; 
import Footer from '../../components/Footer/Footer';

// Loading Component
const Loading = () => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div className="w-16 h-16 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
  </div>
);

function AppPage() {
  const [apps, setApps] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredApps, setFilteredApps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch data initially
  useEffect(() => {
    setIsLoading(true);
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setApps(data);
        setFilteredApps(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Search handler
  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsLoading(true);

    // Simulate async search
    setTimeout(() => {
      const results = apps.filter(app =>
        app.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredApps(results);
      setIsLoading(false);
    }, 500); // simulate network delay
  };

  // Navigation with loader
  const handleNavigate = (url) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(url);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div>
      <Navbar />

      {isLoading && <Loading />}

      <p className="text-center mt-3 text-3xl font-semibold">Our All Applications</p>
      <p className="text-center text-[#627382]">Explore All Apps on the Market developed by us. We code for Millions</p>

      <div className="flex justify-between p-4 items-center">
        <p>({filteredApps.length}) Apps Found</p>
        
        <div className="relative w-64">
          <input
            type="search"
            required
            placeholder="Search Apps"
            className="border rounded-md p-2 pl-8 w-full"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <svg
            className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>
      </div>

      {filteredApps.length > 0 ? (
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4 p-4">
          {filteredApps.map((app, index) => (
            <div key={index} onClick={() => handleNavigate(`/app/${app.id}`)}>
              <div className="card bg-base-100 w-auto shadow-sm cursor-pointer hover:shadow-lg transition">
                <figure>
                  <img src={app.image} alt={"App Image"} />
                </figure>
                <div className="card-body">
                  <p>{app.title}</p>
                  <div className="flex justify-between">
                    <button className="btn bg-[#F1F5E8] text-[#00D390]">
                      <FaDownload /> {app.downloads}
                    </button>
                    <button className="btn bg-[#FFF0E1] text-[#FF8811]">
                      <FaStar /> {app.ratingAvg}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8 text-lg">No App Found</p>
      )}

      <Footer />
    </div>
  );
}

export default AppPage;
