import { useState, useEffect } from "react";
import { LightModeIcon, DarkModeIcon } from "../utils/utils";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      navigate(`/search?error=empty`);
      return;
    }
    navigate(`/search?query=${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <nav className="relative shadow bg-gray-600 dark:bg-gray-800">
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-white">Note App</div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:justify-between w-full md:w-auto`}
        >
          <div className="flex flex-col md:flex-row md:mx-6">
            <NavLink
              to="/home"
              className=" p-1 my-1 text-sm text-white transition-colors duration-300 transform rounded-lg hover:bg-gray-700 md:mx-2 md:my-0"
            >
              Home Page
            </NavLink>
            <NavLink
              to="/notes"
              className=" p-1 my-1 text-sm text-white transition-colors duration-300 transform rounded-lg hover:bg-gray-700 md:mx-2 md:my-0"
            >
              Notes
            </NavLink>
            <NavLink
              to="/categories"
              className="p-1 my-1 text-sm text-white transition-colors duration-300 transform rounded-lg hover:bg-gray-700 md:mx-2 md:my-0"
            >
              Categories
            </NavLink>
            <NavLink
              to="/favorites"
              className="p-1 my-1 text-sm text-white transition-colors duration-300 transform rounded-lg hover:bg-gray-700 md:mx-2 md:my-0"
            >
              Favorites
            </NavLink>
            <NavLink
              to="/create-note"
              className="p-1 my-1 text-sm text-black transition-colors duration-300 transform rounded-lg bg-red-300 hover:bg-red-500 md:mx-2 md:my-0"
            >
              Create Note
            </NavLink>
          </div>

          <form
            onSubmit={handleSearch}
            className="relative mt-4 md:mt-0 flex items-center"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>

            <input
              type="text"
              className="min-w-4 py-2 pl-10 pr-10 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              <FaSearch />
            </button>
          </form>

          <button
            onClick={toggleDarkMode}
            className="ml-4 p-2 text-gray-700 transition-colors duration-300 transform rounded-full dark:text-gray-200 bg-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <LightModeIcon size={32} />
            ) : (
              <DarkModeIcon size={32} />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
