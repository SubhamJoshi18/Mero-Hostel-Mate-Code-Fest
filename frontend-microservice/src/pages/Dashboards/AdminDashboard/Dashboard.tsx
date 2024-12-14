import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axiosInstance from "../../../configs/axiosConfig";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminHome() {
  const [projects, setProjects] = useState([]);
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState({} as any);
  const [userHostel, setUserHostel] = useState(null);
  const [studentRequests, setStudentRequests] = useState([
    { name: "John Doe", date: "2023-10-01" },
    { name: "Jane Smith", date: "2023-10-02" },
    { name: "Alice Johnson", date: "2023-10-03" },
  ]);
  const [statistics, setStatistics] = useState({
    totalHostelers: 0,
    present: 0,
    review: 0,
    pendingClient: studentRequests.length,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await axiosInstance.get("/user/profile");
        setUserData(userDetails.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userHostelDetails = await axiosInstance.get("/user/hostel");
        setUserHostel(userHostelDetails.data.response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Hostel Occupancy",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Hostel Occupancy Over Time",
      },
    },
  };

  return (
    <main className="p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-[--primary-color]">
            Dashboard
          </h1>
        </div>
        <input
          type="search"
          placeholder="Search here"
          className="outline-none rounded-xl w-[50%] py-2 px-4"
        />
        <div className="profile flex items-center gap-4">
          <AccountCircleIcon style={{ fontSize: "60px", color: "#ff4f18" }} />
          <div>
            <h1 className="font-bold text-xl">Admin 1</h1>
            <p>Hostel 420</p>
          </div>
        </div>
      </header>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-md shadow space-y-2">
          <h3 className="text-5xl font-bold">30</h3>
          <p className="text-lg font-bold text-gray-400">Total Hostelers</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow space-y-2">
          <h3 className="text-5xl font-bold">25</h3>
          <p className="text-lg font-bold text-gray-400">Present</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow space-y-2">
          <h3 className="text-5xl font-bold">5</h3>
          <p className="text-lg font-bold text-gray-400">Leave Requests</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow space-y-2">
          <h3 className="text-5xl font-bold">25</h3>
          <p className="text-lg font-bold text-gray-400">Pending Bookings</p>
        </div>
      </div>

      {/* Projects */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-lg font-bold mb-4">Projects</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>Material XD Version</span>
              <span className="text-gray-500">60%</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-lg font-bold mb-4">Orders Overview</h3>
          <ul className="space-y-2">
            <li>$2400, Design changes - 22 Dec 7:20 PM</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
