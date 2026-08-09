import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold">Aqeel.</div>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-400"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-400"
            }
          >
            Sign Up
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-400"
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/setinstructions"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-400"
            }
          >
            Setinstructions
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
