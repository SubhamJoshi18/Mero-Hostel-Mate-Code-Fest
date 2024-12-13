import React, { useState } from 'react';

const PendingBooking = () => {
  // Sample initial data for pending bookings
  const [bookings, setBookings] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1 (555) 456-7890',
      status: 'Pending',
    },
  ]);

  // Handler for accepting a booking
  const handleAccept = (id) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: 'Accepted' } : booking
      )
    );
  };

  // Handler for rejecting a booking
  const handleReject = (id) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: 'Rejected' } : booking
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Bookings</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{booking.name}</td>
                <td className="px-4 py-3">{booking.email}</td>
                <td className="px-4 py-3">{booking.phone}</td>
                <td className="px-4 py-3 text-center">
                  {booking.status === 'Pending' ? (
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
