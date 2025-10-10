import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Banner from './components/Banner/Banner'
import Cards from './components/Cards/Cards'
import Footer from './components/Footer/Footer'


const Loading = () => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const loadPage = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
    };
    
    loadPage();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      
      <Navbar />
      <Banner />
      <Cards />
      <Footer />
    </>
  )
}

export default App