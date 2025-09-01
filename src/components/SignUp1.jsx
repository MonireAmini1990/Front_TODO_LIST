
import React from "react";
import { Link } from "react-router-dom";

const SignUp1 = () => {
  return (
<div className=" relative min-h-screen bg-[#254556] flex flex-col justify-center items-center text-white px-4 sm:px-6 md:px-8 ">
      
     
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 sm:mb-8 pb-40" >
        Sign Up
      </h1>

      <p className="text-base pt-0  sm:text-lg md:text-xl mb-20 sm:mb-20 text-center max-w-sm sm:max-w-md">
        Sign up to save your information
      </p>

      <Link to ="/signup2" className="bg-white text-[#254556] font-semibold px-8  sm:px-10 py-0 sm:py-3 rounded-md mb-20 sm:mb-20 shadow-md hover:bg-gray-200 transition text-sm sm:text-base">
      <button >
        SIGN UP
      </button>
      </Link>
      <Link to="/login"    className="text-l sm:text-xl md:text-2xl font-semibold mb-40 sm:mb-40 text-center max-w-sm sm:max-w-md">
      <h1 >
        Log In
      </h1>
      </Link>
      <Link to ="/guest-login" className=" text-md sm:text-lg text-white text-center absolute bottom-6 sm:bottom-8 px-4">
      <p>
        Continue without creating an account
      </p>
      </Link>
    </div>
  );
};

export default SignUp1;
