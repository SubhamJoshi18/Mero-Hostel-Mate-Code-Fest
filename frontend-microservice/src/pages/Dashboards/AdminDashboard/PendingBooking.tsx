/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../configs/axiosConfig';

const PendingBooking = () => {
  // Sample initial data for pending bookings
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hostelToken = localStorage.getItem('hostel_id');
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`/pending/${hostelToken}`, {
          headers: {
            Authorization: token,
          },
        });
        console.log(response.data.hostel);
        setBookings(response.data.hostel);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // Handler for accepting a booking
  const handleAccept = async (id: any) => {
    try {
      const response = await axiosInstance.patch(`/approve/user/${id}`);
      console.log('update', response);
    } catch (err) {
      console.log(err);
    }
  };

  // Handler for rejecting a booking
  const handleReject = async (id) => {
    try {
      const response = await axiosInstance.patch(`/reject/user/${id}`);
      console.log('update', response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-medium text-[--primary-color] mb-4">
        Pending Bookings
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">College</th>
              <th className="px-4 py-3 text-left">Phone Number</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{booking.name}</td>
                <td className="px-4 py-3">{booking.college}</td>
                <td className="px-4 py-3">{booking.phoneNumber}</td>
                <td className="px-4 py-3 text-center">
                  {booking.status === 'pending' ? (
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleAccept(booking.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(booking.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`
                        px-3 py-1 rounded 
                        ${
                          booking.status === 'Accepted'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }
                      `}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingBooking;
