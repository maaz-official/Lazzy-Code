import React, { useState } from "react";
import {
  SearchIcon,
  PencilIcon,
  UserIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/solid";
import Logo from "../imgs/full-logo1.png"; // Replace with your logo file path
import { Link, Outlet } from "react-router-dom";
import { useTheme } from "../themecontext";

const NavBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const { theme, toggleTheme } = useTheme();

  const toggleMode = () => {
    toggleTheme();
  };

  return (
    <>
      <nav
        className={`shadow-lg p-3 flex items-center justify-between ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="hidden lg:flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className={`h-11 w-17 mr-14 ${
              theme === "dark" ? "filter invert" : ""
            }`}
          />
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search"
              className={`bg-gray-200 text-black py-2 px-4 rounded-full shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isSearchOpen ? "w-48" : "w-0"
              }`}
              style={{ display: isSearchOpen ? "block" : "none" }}
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center mr-3 cursor-pointer"
              onClick={toggleSearch}
            >
              <SearchIcon
                className={`h-5 w-5 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="flex lg:hidden items-center justify-between w-full">
          <img
            src={Logo}
            alt="Logo"
            className={`h-8 w-auto ${theme === "dark" ? "filter invert" : ""}`}
          />
          <div className="flex items-center space-x-4">
            <div
              className="flex items-center cursor-pointer"
              onClick={toggleSearch}
            >
              <SearchIcon
                className={`h-5 w-5 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              />
            </div>
            <input
              type="text"
              placeholder="Search"
              className={`bg-gray-200 text-black py-1 px-2 rounded-md transition-all duration-300 ${
                isSearchOpen ? "w-48" : "w-0"
              }`}
              style={{ display: isSearchOpen ? "block" : "none" }}
            />
            <button
              className={`bg-gray-700 text-black py-1 px-2 rounded-md flex items-center space-x-2 ${
                theme === "dark"
                  ? "dark:bg-gray-600 dark:text-white"
                  : "dark:bg-gray-900 dark:text-white"
              }`}
              onClick={toggleMode}
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </div>

        {/* Write and sign in/sign up icons for lg screens */}
        <div className="hidden lg:flex items-center space-x-4">
          <button className="bg-gray-700 text-black py-1 px-2 rounded-md flex items-center space-x-2">
            <PencilIcon
              className={`h-5 w-5 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            />
            <span className={theme === "dark" ? "text-white" : "text-black"}>
              Write
            </span>
          </button>
          <Link to="/sign-up">
            <button className="bg-gray-700 text-black py-1 px-2 rounded-md flex items-center space-x-2">
              <UserIcon
                className={`h-5 w-5 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              />
              <span className={theme === "dark" ? "text-white" : "text-black"}>
                Sign Up
              </span>
            </button>
          </Link>
          <Link to="/sign-in">
            <button className="bg-gray-700 text-black py-1 px-2 rounded-md flex items-center space-x-2">
              <UserIcon
                className={`h-5 w-5 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              />
              <span className={theme === "dark" ? "text-white" : "text-black"}>
                Sign In
              </span>
            </button>
          </Link>
          <button
            className="bg-gray-700 text-black py-1 px-2 rounded-md flex items-center space-x-2"
            onClick={toggleMode}
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5 text-white" />
            ) : (
              <MoonIcon className="h-5 w-5 text-black" />
            )}
            <span className={theme === "dark" ? "text-white" : "text-black"}>
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
