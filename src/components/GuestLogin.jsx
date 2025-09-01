import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Guest() {
  const [selectedGender, setSelectedGender] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    if (!username || !selectedGender) {
      alert('Please enter a username and select your gender.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/guest', {
        username,
        gender: selectedGender,
      });

      const data = response.data;

      if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Guest login successful!');
        navigate('/main-page');
      } else {
        alert('Login failed. No token received.');
      }
    } catch (error) {
      console.error('Guest login error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Guest login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#385a6d] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      {/* Gender selection */}
      <div className="flex gap-8 sm:gap-12 mb-8">
        {/* Female */}
        <div className="flex flex-col items-center">
          <img
            src="https://tse4.mm.bing.net/th/id/OIP.H07JBjrn8t5YPts74taZnQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="female"
            className="w-24 h-24 rounded-full object-cover border-2 border-white"
          />
          <input
            type="checkbox"
            checked={selectedGender === 'female'}
            onChange={() => setSelectedGender('female')}
            className="mt-2 w-5 h-5"
          />
        </div>

        {/* Male */}
        <div className="flex flex-col items-center">
          <img
            src="/male.png"
            alt="male"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-white bg-gray-300"
          />
          <input
            type="checkbox"
            checked={selectedGender === 'male'}
            onChange={() => setSelectedGender('male')}
            className="mt-2 w-5 h-5"
          />
        </div>
      </div>

      {/* Username */}
      <input
        type="text"
        placeholder="UserName"
        className="bg-transparent border-b border-white text-white text-base sm:text-lg mb-6 w-56 sm:w-64 placeholder-gray-200 focus:outline-none"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Start Button */}
      <button
        onClick={handleGuestLogin}
        className="bg-gray-300 px-10 py-3 rounded-xl text-gray-800 text-lg font-medium hover:bg-gray-400 transition w-56 sm:w-64"
      >
        Let's start
      </button>
    </div>
  );
}

export default Guest;
