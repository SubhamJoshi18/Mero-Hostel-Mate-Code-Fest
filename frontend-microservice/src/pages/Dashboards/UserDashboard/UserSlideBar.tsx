import React, { useState } from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
// import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
// import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { NavLink } from "react-router-dom";

export default function UserSideBar() {
  const [isHostelerDropdownOpen, setHostelerDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleHostelerDropdown = () => setHostelerDropdownOpen((prev) => !prev);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[--tertiary-color] p-4 shadow-md">
      <div className="scrolled-logo">
        <NavLink to="/dashboard-user">
          <img
            className="h-12 my-2 mb-4 w-auto flex-shrink-0"
            src="/assets/mhmlogo_White.png"
            alt="Scrolled logo"
          />
        </NavLink>
      </div>
      <nav>
        <ul className="space-y-3">
          {/* Dashboard Link */}
          <NavLink
            to="/dashboard-user"
            className={({ isActive }) =>
              isActive
                ? "p-3 flex items-center rounded-lg bg-[--primary-color] text-white"
                : "p-3 flex items-center rounded-lg text-white"
            }
            end
          >
            <AccountCircleOutlinedIcon />
            <span className="ml-2">Profile</span>
          </NavLink>

          {/* User Details with Dropdown */}
          <li>
            <button
              className=" text-white p-3 flex items-center justify-between"
              onClick={toggleHostelerDropdown}
            >
              <PeopleAltOutlinedIcon />
              <span className="ml-2">User Details</span>
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
                    to="/dashboard-user/mydocuments"
                    className={({ isActive }) =>
                      isActive
                        ? "p-3 flex items-center rounded-lg bg-[--primary-color] text-white"
                        : "p-3 flex items-center rounded-lg text-white"
                    }
                  >
                    <FormatListBulletedIcon />
                    <span className="ml-2">My Documents</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard-user/requestleave"
                    className={({ isActive }) =>
                      isActive
                        ? "p-3 flex items-center rounded-lg bg-[--primary-color] text-white"
                        : "p-3 flex items-center rounded-lg text-white"
                    }
                  >
                    <PendingActionsOutlinedIcon />
                    <span className="ml-2">Request Leave</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard-user/userattendancehistory"
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
              </ul>
            )}
          </li>

          {/* Other Static Links */}
          <li>
            <NavLink
              to="/dashboard-user/userchat"
              className={({ isActive }) =>
                isActive
                  ? "p-3 flex items-center rounded-lg  bg-[--primary-color] text-white"
                  : "p-3 flex items-center rounded-lg text-white"
                }
                >
                  <MarkUnreadChatAltOutlinedIcon />
                  <span className="ml-2">Chat</span>
                </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard-user/userpayments"
              className={({ isActive }) =>
                isActive
                  ? "p-3 flex items-center rounded-lg  bg-[--primary-color] text-white"
                  : "p-3 flex items-center rounded-lg text-white"
                }
                >
                  <AccountBalanceWalletOutlinedIcon />
                  <span className="ml-2">Payments</span>
                </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard-user/hostelsmarket"
              className={({ isActive }) =>
                isActive
                  ? "p-3 flex items-center rounded-lg  bg-[--primary-color] text-white"
                  : "p-3 flex items-center rounded-lg text-white"
                }
                >
                  <HomeOutlinedIcon />
                  <span className="ml-2">Hostel</span>
                </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard-user/usernotification"
              className={({ isActive }) =>
                isActive
                  ? "p-3 flex items-center rounded-lg  bg-[--primary-color] text-white"
                  : "p-3 flex items-center rounded-lg text-white"
                }
                >
                  <NotificationsNoneOutlinedIcon />
                  <span className="ml-2">Notification</span>
                </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard-user/usernews"
              className={({ isActive }) =>
                isActive
                  ? "p-3 flex items-center rounded-lg  bg-[--primary-color] text-white"
                  : "p-3 flex items-center rounded-lg text-white"
                }
                >
                  <FeedOutlinedIcon />
                  <span className="ml-2">News</span>
                </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard-user/usersupport"
              className={({ isActive }) =>
                isActive
                  ? "p-3 flex items-center rounded-lg  bg-[--primary-color] text-white"
                  : "p-3 flex items-center rounded-lg text-white"
                }
                >
                  <SupportAgentOutlinedIcon />
                  <span className="ml-2">Support</span>
                </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard-user/usersetting"
              className={({ isActive }) =>
                isActive
                  ? "p-3 flex items-center rounded-lg  bg-[--primary-color] text-white"
                  : "p-3 flex items-center rounded-lg text-white"
                }
                >
                  <SettingsOutlinedIcon />
                  <span className="ml-2">Setting</span>
                </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
