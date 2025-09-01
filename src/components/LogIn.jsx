import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext"; 

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      const data = response.data;

      if (!data.token || !data.user) {
        alert("Login failed: No token or user data received.");
        return;
      }

      login(data.token, data.user);

      alert("Login successful!");
      navigate("/main-page");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#28546a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h2 className="text-white text-3xl sm:text-4xl mb-10 text-center pb-30">Log In</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6 sm:mb-10">
            <input
              type="email"
              placeholder="Please enter your Email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 placeholder-gray-300 text-white py-2 focus:outline-none focus:border-white"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Please enter your Password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 placeholder-gray-300 text-white py-2 focus:outline-none focus:border-white"
              required
            />
          </div>

          <div className="flex flex-col items-center space-y-8 mt-6 sm:mt-10">
            <button
              type="submit"
              className="bg-gray-100 text-[#28546a] font-medium py-2 px-6 rounded-md hover:bg-white transition"
            >
              Next
            </button>

            <Link to="/signup1">
              <button
                type="button"
                className="bg-gray-100 text-[#28546a] font-medium py-2 px-6 rounded-md hover:bg-white transition"
              >
                SIGN UP
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
