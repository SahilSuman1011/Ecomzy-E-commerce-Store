import React, { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`bg-gray-500 ${isDarkMode ? 'bg-gray-900' : ''}`}>
      <div className="flex flex-row justify-between items-center px-4 py-2">
        <NavLink to="/">
          <div>
            <img src="../logo.png" className="h-14" alt="Shop Now" />
          </div>
        </NavLink>
        <div className="flex space-x-4 items-center">
          <NavLink to="/" className={`text-${isDarkMode ? 'white' : 'black'}`}>
            <p>Home</p>
          </NavLink>
          <NavLink to="/cart" className={`text-${isDarkMode ? 'white' : 'black'}`}>
            <div>
              <FaShoppingCart />
            </div>
          </NavLink>
          <button
            className="ml-4 bg-gray-300 dark:bg-gray-800 text-black dark:text-white py-2 px-4 rounded"
            onClick={toggleTheme}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
