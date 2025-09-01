import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useTaskContext } from "../context/TaskContext";
import Footer from "../components/Footer";

const SearchAndSort = () => {
  const {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = useTaskContext(); 

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const options = ["Name", "Date", "Status", "Category"];

  const handleSortChange = (option) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(option);
      setSortOrder("asc");
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto p-4 sm:p-6 space-y-6 text-gray-500">
          {/* Search Bar */}
          <div className="relative border-b border-gray-300 pb-2">
            <input
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-8 bg-transparent focus:outline-none placeholder-gray-400 text-gray-500 text-sm sm:text-base"
            />
            <Search className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-1 text-gray-500 text-sm sm:text-base focus:outline-none"
            >
              <span>Sort by: {sortBy} ({sortOrder})</span>
              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </button>

            {isDropdownOpen && (
              <div className="absolute mt-2 w-32 rounded-md shadow-lg bg-gray-50 ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  {options.map((option) => (
                    <button
                      key={option}
                      className="block w-full text-left px-4 py-2 text-sm sm:text-base text-gray-500 hover:bg-gray-100"
                      onClick={() => handleSortChange(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchAndSort;
