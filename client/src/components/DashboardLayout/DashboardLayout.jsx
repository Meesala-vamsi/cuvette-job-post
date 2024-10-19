import React from 'react'
import { IoHome } from 'react-icons/io5';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex px-5 py-0 min-h-screen">
      <div className='border-r-2 pr-4 border-gray-500'>
        <IoHome className='text-xl' />
      </div>
      <div className='w-full'>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout