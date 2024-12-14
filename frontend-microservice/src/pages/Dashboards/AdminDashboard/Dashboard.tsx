import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import axiosInstance from '../../../configs/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import PrimaryButton from '../../../components/Button/PrimaryButton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashBoard() {
  const [onClick, setOnClick] = useState(false);
  const [projects, setProjects] = useState([]);
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState({} as any);
  const [userHostel, setUserHostel] = useState(null);

  const [statistics, setStatistics] = useState({
    totalHostelers: 0,
    totalApproved: 0,
    review: 0,
    totalPendings: 0,
  });
  const triggerClick = () => {
    setOnClick(!onClick);
  };

  useEffect(() => {
    const fetchHostelData = async () => {
      try {
        const userDetails = await axiosInstance.get('/user/profile', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        setUserData(userDetails.data.data);
        if (userDetails.data.response) {
          setStatistics((prevStats) => ({
            ...prevStats,
            totalHostelers: 30,
            present: 25,
            review: 5,
            pendingClient: 25,
          }));
        } else {
          setStatistics((prevStats) => ({
            ...prevStats,
            totalHostelers: 0,
            present: 0,
            review: 0,
            pendingClient: 0,
          }));
        }
      } catch (error) {
        console.error('Error fetching hostel data:', error);
      }
    };

    fetchHostelData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hostelId = localStorage.getItem('hostelId');
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`/dashboard/${hostelId}`, {
          headers: {
            Authorization: token,
          },
        });
        setStatistics(response.data.response);
      } catch (err) {
        console.log('Error fetching data:', err);
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

  const pieData = {
    labels: [
      'Total Hostelers',
      'Present',
      'Leave Requests',
      'Pending Bookings',
    ],
    datasets: [
      {
        data: [
          statistics.totalHostelers,
          statistics.totalApproved,
          statistics.review,
          statistics.totalPendings,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Hostel Statistics',
      },
    },
  };

  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  return (
    <main>
      {/* Header */}
      <header className="flex justify-between  items-center mb-6">
        <div className="flex items-center gap-4 text-[--primary-color]">
          <h1 className="text-4xl font-bold">Dashboard</h1>
        </div>
        {!onClick && (
          <div
            className="accountIcon cursor-pointer"
            onClick={() => triggerClick()}
          >
            <AccountCircleIcon style={{ color: '#ff4f18', fontSize: '50px' }} />
          </div>
        )}
      </header>
      <div
        className={`d absolute rounded-b-2xl  right-0 top-0 bg-[--tertiary-color] w-[20%] pl-2 h-[40vh] pt-16 ${
          onClick ? 'visible' : 'hidden'
        }`}
      >
        <div className="userDetails flex flex-col text-white gap-2">
          <div
            className="absolute right-6 top-6"
            onClick={() => triggerClick()}
          >
            <NoAccountsIcon className="block" style={{ fontSize: '50px' }} />
          </div>
          <h2 className="block">{username}</h2>
          <h2 className="block">{email}</h2>
          <div>
            <PrimaryButton
              title={'Logout'}
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            />
          </div>
        </div>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-md shadow space-y-2">
          <h3 className="text-5xl font-bold">{statistics.totalHostelers}</h3>
          <p className="text-lg font-bold text-gray-400">Total Hostelers</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow space-y-2">
          <h3 className="text-5xl font-bold">{statistics.totalApproved}</h3>
          <p className="text-lg font-bold text-gray-400">Present</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow space-y-2">
          <h3 className="text-5xl font-bold">{statistics.review}</h3>
          <p className="text-lg font-bold text-gray-400">Leave Requests</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow space-y-2">
          <h3 className="text-5xl font-bold">{statistics.totalPendings}</h3>
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
      {/* Charts */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-4 rounded-md shadow">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div className="bg-white p-4 rounded-md shadow">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </main>
  );
}
