import React from "react";
import Lottie from "lottie-react";
import emptyAnimation from "../../assets/lottie/empty-animation.json";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-linear-to-br from-indigo-50 to-purple-50">

      <div className="w-64 h-64 md:w-80 md:h-80">
        <Lottie animationData={emptyAnimation} loop autoplay />
      </div>

      <h1 className="mt-8 text-2xl md:text-3xl font-bold text-gray-800 text-center">
        Oops! Not found.
      </h1>
      <p className="mt-2 text-sm md:text-base text-gray-600 text-center max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <button
        onClick={() => window.history.back()}
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
