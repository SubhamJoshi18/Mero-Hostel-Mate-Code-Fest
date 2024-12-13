import React, { useEffect, useState } from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import axiosInstance from '../../../configs/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DashBoard() {
  const [projects, setProjects] = useState([]);
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState({} as any);
  const [userHostel, setUserHostel] = useState(null);
  const [studentRequests, setStudentRequests] = useState([
    { name: 'John Doe', date: '2023-10-01' },
    { name: 'Jane Smith', date: '2023-10-02' },
    { name: 'Alice Johnson', date: '2023-10-03' },
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
        const userDetails = await axiosInstance.get('/user/profile');
        setUserData(userDetails.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userHostelDetails = await axiosInstance.get('/user/hostel');
        setUserHostel(userHostelDetails.data.response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Hostel Occupancy',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Hostel Occupancy Over Time',
      },
    },
  };

  return (
    <main className="p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <MenuOutlinedIcon style={{ height: '2rem' }} />
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <input
          type="search"
          placeholder="Search here"
          className="border rounded-xl py-2 px-4 focus:outline-none focus:ring"
        />
        <div className="profile flex items-center gap-4">
          <div className="bg-red-600 h-16 w-16 rounded-full">
            <img src="" alt="" />
          </div>
          <div>
            {}
            <h1 className="font-bold text-xl">
              {userData.name
                ? userData.email
                : 'Owner Does not Have Register Hostel'}
            </h1>
            <p>{userData.email}</p>
          </div>
        </div>
      </header>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-md shadow space-y-2">
          <h3 className="text-5xl font-bold">{statistics.totalHostelers}</h3>
          <p className="text-lg font-bold text-gray-400">Total Hostelers</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow space-y-2">
          <h3 className="text-5xl font-bold">{statistics.present}</h3>
          <p className="text-lg font-bold text-gray-400">Present</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow space-y-2">
          <h3 className="text-5xl font-bold">{statistics.review}</h3>
          <p className="text-lg font-bold text-gray-400">Review</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow space-y-2">
          <h3 className="text-5xl font-bold">{statistics.pendingClient}</h3>
          <p className="text-lg font-bold text-gray-400">Pending Client</p>
        </div>
      </div>

      {/* Projects */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-lg font-bold mb-4">Projects</h3>
          <ul className="space-y-2">
            {projects.map((project, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{project.name}</span>
                <span className="text-gray-500">{project.progress}%</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-lg font-bold mb-4">Orders Overview</h3>
          <ul className="space-y-2">
            {orders.map((order, index) => (
              <li key={index}>
                {order.description} - {order.date}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* User Hostel Information */}
      <div className="bg-white p-4 rounded-md shadow mt-6">
        <h3 className="text-lg font-bold mb-4">User Hostel Information</h3>
        {userHostel ? (
          <div>
            <p>Hostel Name: {userHostel.name}</p>
            <p>Hostel Address: {userHostel.address}</p>
            {/* Add more hostel details as needed */}
          </div>
        ) : (
          <p>No hostel for Owner, Please Register the Hostel First</p>
        )}
      </div>

      {/* Student Requests */}
      <div className="bg-white p-4 rounded-md shadow mt-6">
        <h3 className="text-lg font-bold mb-4">Current Student Requests</h3>
        <ul className="space-y-2">
          {studentRequests.map((request, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{request.name}</span>
              <span className="text-gray-500">{request.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hostel Occupancy Graph */}
      <div className="bg-white p-4 rounded-md shadow mt-6">
        <h3 className="text-lg font-bold mb-4">Hostel Occupancy Graph</h3>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </main>
  );
}
