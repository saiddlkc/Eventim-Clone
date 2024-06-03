// src/components/TopBar.jsx
import React from 'react';

const TopBar = () => {
  return (
    <div className="bg-blue-gray-100  flex justify-between items-center p-1  ">
      <h2 className="text-2xl font-bold"></h2>
      <div className="flex items-center ">
        <span className='mr-2 '>USER</span>
        <img src="https://via.placeholder.com/40" alt="Profile" className="w-10 h-10 rounded-full mr-2" />
      </div>
    </div>
  );
};

export default TopBar;
