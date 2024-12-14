import { ReactNode } from "react";
import UserSideBar from "./UserSlideBar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function UserDashBoard({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 fixed top-0 left-0 h-full bg-white shadow-md">
        <UserSideBar />
      </div>
      <div className="ml-64 flex-1 p-6">{children}</div>
    </div>
  );
}
