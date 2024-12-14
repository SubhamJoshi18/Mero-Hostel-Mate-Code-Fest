import React, { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const [isHostelerDropdownOpen, setHostelerDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleHostelerDropdown = () => setHostelerDropdownOpen((prev) => !prev);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[--tertiary-color] p-4 shadow-md">
      <div className="scrolled-logo">
        <NavLink to="/dashboard-admin">
          <img
            className="h-12 my-2 w-auto flex-shrink-0"
            src="/assets/mhmlogo_White.png"
            alt="Scrolled logo"
          />
        </NavLink>
      </div>
      <nav>
        <ul className="space-y-3">
          {/* Dashboard Link */}
          <NavLink
            to="/dashboard-admin"
            className={({ isActive }) =>
              isActive
                ? "p-3 flex items-center rounded-lg bg-[--primary-color] text-white"
                : "p-3 flex items-center rounded-lg text-white"
            }
            end
          >
            <HomeOutlinedIcon />
            <span className="ml-2">Dashboard</span>
          </NavLink>

          {/* Create Hostel Link (Static) */}

          <li className="text-white  flex items-center">
            <NavLink
              to="/dashboard-admin/hostelregister"
              className={({ isActive }) =>
                isActive
                  ? "p-3 flex items-center rounded-lg bg-[--primary-color] text-white"
                  : "p-3 flex items-center rounded-lg text-white"
              }
            >
              {/* <span className="ml-2">Hosteller List</span> */}
              <AddHomeOutlinedIcon />
              <span className="ml-2">Register Hostel</span>
            </NavLink>
          </li>

          {/* Hostelers Details with Dropdown */}
          <li>
            <button
              className="w-full text-white p-3 flex items-center justify-between"
              onClick={toggleHostelerDropdown}
            >
              <PeopleAltOutlinedIcon />
              <span className="ml-2">Hostelers Details</span>
              <span className="ml-2">
                {isHostelerDropdownOpen ? (
                  <ExpandLessOutlinedIcon />
                ) : (
                  <ExpandMoreOutlinedIcon />
                )}
              </span>
            </button>
            {isHostelerDropdownOpen && (
              <ul className="pl-8 space-y-2">
                <li>
                  <NavLink
                    to="/dashboard-admin/hostelerlist"
                    className={({ isActive }) =>
                      isActive
                        ? "p-3 flex items-center rounded-lg bg-[--primary-color] text-white"
                        : "p-3 flex items-center rounded-lg text-white"
                    }
                  >
                    <span className="ml-2">Hosteller List</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard-admin/registeruser"
                    className={({ isActive }) =>
                      isActive
                        ? "p-3 flex items-center rounded-lg bg-[--primary-color] text-white"
                        : "p-3 flex items-center rounded-lg text-white"
                    }
                  >
                    <PersonAddAltOutlinedIcon />
                    <span className="ml-2">Register User</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard-admin/attendance"
                    className={({ isActive }) =>
                      isActive
                        ? "p-3 flex items-center rounded-lg  bg-[--primary-color] text-white"
                        : "p-3 flex items-center rounded-lg text-white"
                    }
                  >
                    <EditNoteOutlinedIcon />
                    <span className="ml-2">Attendance</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard-admin/pendingbooking"
                    className={({ isActive }) =>
                      isActive
                        ? "p-3 flex items-center rounded-lg bg-[--primary-color] text-white"
                        : "p-3 flex items-center rounded-lg text-white"
                    }
                  >
                    <PendingActionsOutlinedIcon />
                    <span className="ml-2">Pending Booking</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Other Static Links */}
          <li className="text-white p-3 flex items-center">
            <MarkUnreadChatAltOutlinedIcon />
            <span className="ml-2">Chat</span>
          </li>
          <li className="text-white p-3 flex items-center">
            <AccountBalanceWalletOutlinedIcon />
            <span className="ml-2">Payments</span>
          </li>

          <li className="text-white p-3 flex items-center">
            <NotificationsNoneOutlinedIcon />
            <span className="ml-2">Notification</span>
          </li>
          <li className="text-white p-3 flex items-center">
            <FeedOutlinedIcon />
            <span className="ml-2">News</span>
          </li>
          <li className="text-white p-3 flex items-center">
            <SupportAgentOutlinedIcon />
            <span className="ml-2">Support</span>
          </li>
          <li className="text-white p-3 flex items-center">
            <SettingsOutlinedIcon />
            <span className="ml-2">Setting</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
