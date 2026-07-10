import React from "react";
import { Link } from "react-router-dom";
import logoimage from "../assets/logo.png";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-2 bg-white border-b border-gray-100">
      {/* Left: Logo (Adjusted size here) */}
      <div className="flex items-center">
        <Link to="/">
          <img 
            src={logoimage} 
            alt="Logo" 
            className="w-auto h-20 object-contain" 
          />
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div className="flex items-center gap-6 text-gray-600 font-medium text-sm">
        <Link to="/" className="hover:text-black">Home</Link>
        <Link to="/explore" className="hover:text-black">Explore</Link>
        <Link to="/categories" className="hover:text-black">Categories</Link>
        <Link to="/trending" className="hover:text-black">Trending</Link>
        <Link to="/writers" className="hover:text-black">Writers</Link>
        <Link to="/about" className="hover:text-black">About</Link>
        <Link to="/contact" className="hover:text-black">Contact</Link>
      </div>

      {/* Right: Search and Action */}
      <div className="flex items-center gap-6">
        <button className="text-gray-600 hover:text-black font-medium text-sm">Search</button>
        <Link 
          to="/become-a-writer" 
          className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition"
        >
          Become a Writer
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;