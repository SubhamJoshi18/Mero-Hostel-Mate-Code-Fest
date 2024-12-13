import React, { useState } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function SideBar() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleLogout = () => {
    if (localStorage.getItem('role') && localStorage.getItem('token')) {
      localStorage.removeItem('role');
      localStorage.removeItem('token');
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white p-4 shadow-md">
      <h2 className="text-xl font-bold mb-6">Mero Hostel Mate</h2>
      <nav>
        <ul className="space-y-3">
          {/* Dashboard Link */}
          <NavLink
            to="/dashboard-admin"
            className={({ isActive }) =>
              isActive
                ? 'p-3 flex items-center rounded-lg bg-gray-800 text-white'
                : 'p-3 flex items-center rounded-lg text-gray-600 hover:text-gray-900'
            }
          >
            <HomeOutlinedIcon />
            <span className="ml-2">Dashboard</span>
          </NavLink>

          {/* Create Hostel Link (Static) */}
          <li className="text-gray-600 hover:text-gray-900 p-3 flex items-center">
            <AddHomeOutlinedIcon />
            <span className="ml-2">Create Hostel</span>
          </li>

          {/* Register User Link */}
          <NavLink
            to="/dashboard-admin/registeruser"
            className={({ isActive }) =>
              isActive
                ? 'p-3 flex items-center rounded-lg bg-gray-800 text-white'
                : 'p-3 flex items-center rounded-lg text-gray-600 hover:text-gray-900'
            }
          >
            <PersonAddAltOutlinedIcon />
            <span className="ml-2">Register User</span>
          </NavLink>

          {/* Other Static Links */}
          <li className="text-gray-600 hover:text-gray-900 p-3 flex items-center">
            <MarkUnreadChatAltOutlinedIcon />
            <span className="ml-2">Chat</span>
          </li>
          <NavLink
            to="/dashboard-admin/attendance"
            className={({ isActive }) =>
              isActive
                ? 'p-3 flex items-center rounded-lg bg-gray-800 text-white'
                : 'p-3 flex items-center rounded-lg text-gray-600 hover:text-gray-900'
            }
          >
            <EditNoteOutlinedIcon />
            <span className="ml-2">Attendance</span>
          </NavLink>
          <li className="text-gray-600 hover:text-gray-900 p-3 flex items-center">
            <PeopleAltOutlinedIcon />
            <span className="ml-2">Hostelers</span>
          </li>
          <li className="text-gray-600 hover:text-gray-900 p-3 flex items-center">
            <PendingActionsOutlinedIcon />
            <span className="ml-2">Pending Booking</span>
          </li>
          <li className="text-gray-600 hover:text-gray-900 p-3 flex items-center">
            <NotificationsNoneOutlinedIcon />
            <span className="ml-2">Notification</span>
          </li>
          <li className="text-gray-600 hover:text-gray-900 p-3 flex items-center">
            <FeedOutlinedIcon />
            <span className="ml-2">News</span>
          </li>
          <li className="text-gray-600 hover:text-gray-900 p-3 flex items-center">
            <SupportAgentOutlinedIcon />
            <span className="ml-2">Support</span>
          </li>
          <li
            className="text-gray-600 hover:text-gray-900 p-3 flex items-center cursor-pointer"
            onClick={togglePopup}
          >
            <SettingsOutlinedIcon />
            <span className="ml-2">Setting</span>
          </li>
        </ul>
      </nav>

      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Settings</h3>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 mb-4"
            >
              Logout
            </button>
            <button
              onClick={togglePopup}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
