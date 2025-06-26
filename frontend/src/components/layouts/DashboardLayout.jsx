import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ activeMenu, children }) => {
  const { user } = useContext(UserContext);

  // If user is still loading (e.g., context hasn't hydrated yet)
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar activeMenu={activeMenu} />

      {user ? 
      (
        <div className="flex flex-col md:flex-row text-gray-100 bg-gray-950">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="grow mx-5">{children}</div>
        </div>
      ) 
      : 
      (
        <div className="p-4 text-center text-red-500">
          Please log in to access the dashboard.
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
