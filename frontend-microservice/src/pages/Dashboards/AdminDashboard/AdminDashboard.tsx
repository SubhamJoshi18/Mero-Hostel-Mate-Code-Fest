import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import { ReactNode, useEffect } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminDashBoard({ children }: AdminLayoutProps) {
 
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 fixed top-0 left-0 h-full bg-white shadow-md">
        <SideBar />
      </div>
      <div className="ml-64 flex-1 p-6">{children}</div>
    </div>
  );
}
