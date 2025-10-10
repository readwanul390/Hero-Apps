import React from "react";
import { useNavigate } from "react-router-dom";
import Erroo from '../../assets/error-404.png';
import Footer from "../../components/Footer/Footer";


function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
      <img src={Erroo} alt=""  className="mt-[100px]"/>
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 mb-6">
        The page you are looking for doesnt exist or was moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-[linear-gradient(90deg,#632EE3_0%,#9F62F2_100%)]  text-white rounded-lg cursor-pointer mb-3"
      >
        Go Home
      </button>
      <Footer></Footer>
    </div>
  );
}

export default ErrorPage;
