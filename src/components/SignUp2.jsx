import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext"; 

const SignUp2 = () => {
  const navigate = useNavigate();
  const { login } = useUser(); 

  const [form, setForm] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/users/register", {
        name: form.name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
      });

      const data = response.data;

      if (!data.token || !data.user) {
        alert("Registration failed. No token or user data received.");
        return;
      }

      login(data.token, data.user);

      navigate("/main-page"); 
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#254556] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-medium mb-8 sm:mb-10">
        Sign Up
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs sm:max-w-md md:max-w-lg space-y-6 sm:space-y-8 text-white"
      >
        <div>
          <label className="block text-base sm:text-lg md:text-xl mb-1">First Name</label>
          <input
            type="text"
            name="name"
            placeholder="Please enter your first name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-b-2 border-white placeholder-gray-300 focus:outline-none py-2 text-sm sm:text-base md:text-lg"
          />
        </div>

        <div>
          <label className="block text-base sm:text-lg md:text-xl mb-1">Last Name</label>
          <input
            type="text"
            name="last_name"
            placeholder="Please enter your last name"
            value={form.last_name}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-b-2 border-white placeholder-gray-300 focus:outline-none py-2 text-sm sm:text-base md:text-lg"
          />
        </div>

        <div>
          <label className="block text-base sm:text-lg md:text-xl mb-1">Email address</label>
          <input
            type="email"
            name="email"
            placeholder="Please enter your email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-b-2 border-white placeholder-gray-300 focus:outline-none py-2 text-sm sm:text-base md:text-lg"
          />
        </div>

        <div>
          <label className="block text-base sm:text-lg md:text-xl mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Please enter your password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-b-2 border-white placeholder-gray-300 focus:outline-none py-2 text-sm sm:text-base md:text-lg"
          />
        </div>

        <div>
          <label className="block text-base sm:text-lg md:text-xl mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-b-2 border-white placeholder-gray-300 focus:outline-none py-2 text-sm sm:text-base md:text-lg"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-white text-[#254556] px-8 sm:px-10 py-2 sm:py-3 rounded-md font-semibold shadow-md hover:bg-gray-200 transition text-sm sm:text-base md:text-lg"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp2;
