// components/Navbar.jsx
import React from "react";

const Navbar = () => (
  <nav className="bg-white shadow-md p-4 flex justify-between items-center">
    <div className="text-xl font-bold text-blue-600">💼 Portfolio Tracker</div>
    <div className="space-x-4 hidden md:flex">
      <button className="text-gray-600 hover:text-blue-600">Dashboard</button>
      <button className="text-gray-600 hover:text-blue-600">Assets</button>
      <button className="text-gray-600 hover:text-blue-600">Logout</button>
    </div>
  </nav>
);

export default Navbar;
