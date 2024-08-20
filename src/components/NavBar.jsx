import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth, signOut } from '../firebase'; 

function NavBar() {
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-blue-800 text-white px-2 shadow-lg w-full relative">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <NavLink to="/" className="text-2xl font-bold hover:text-gray-200 transition duration-300">
          StockCompare
        </NavLink>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white lg:hidden focus:outline-none"
          aria-label="Toggle navigation"
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
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <ul
          className={`lg:flex lg:items-center lg:space-x-6 ${isOpen ? 'block' : 'hidden'} lg:static absolute top-full left-0 w-full bg-blue-800 lg:bg-transparent lg:shadow-none shadow-lg rounded-lg lg:p-0 p-4 transition-all duration-300 ease-in-out z-50`}
          style={{ justifyContent: 'center' }} 
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-lg font-medium ${isActive ? 'text-orange-500 border-b-2 border-gray-200 text-xl duration-300' : 'hover:text-gray-300'} transition duration-300 `
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/compare"
              className={({ isActive }) =>
                `text-lg font-medium ${isActive ? 'text-orange-500 border-b-2 border-gray-200 text-xl duration-300' : 'hover:text-gray-300'} transition duration-300`
              }
              onClick={() => setIsOpen(false)}
            >
              Compare
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-lg font-medium ${isActive ? 'text-orange-500 border-b-2 border-gray-200 text-xl duration-300' : 'hover:text-gray-300'} transition duration-300`
              }
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
          </li>
        </ul>
        <div className="hidden lg:flex items-center space-x-6">
          <span className="text-sm font-semibold">{currentTime}</span>
          {user ? (
            <div className="flex items-center space-x-4 p-2">
              <span className="text-lg font-semibold">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-6 py-1 rounded-2xl hover:bg-red-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <NavLink
              to="/signin"
              className="bg-blue-600 text-white px-4 py-2 my-2 rounded-lg hover:bg-blue-500 transition duration-300 "
            >
              SignIn
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
