import React, { useState, useEffect } from 'react';

const UserAttendanceHistory = () => {
  // Simulated student data (would typically come from backend/context)
  const [studentData, setStudentData] = useState({
    id: 1,
    name: 'John Doe',
    room: 'A-101',
    attendanceHistory: [
      { date: '2024-03-10', status: 'Present' },
      { date: '2024-03-09', status: 'Absent' },
      { date: '2024-03-08', status: 'Present' },
      { date: '2024-03-07', status: 'Present' },
      { date: '2024-03-06', status: 'Absent' }
    ]
  });

  // Function to get last 5 days of attendance
  const getLast5DaysAttendance = () => {
    return studentData.attendanceHistory.slice(0, 5);
  };

  // Function to determine status color
  const getStatusColor = (status) => {
    return status === 'Present' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  // Calculate attendance percentage
  const calculateAttendancePercentage = () => {
    const presentDays = studentData.attendanceHistory
      .slice(0, 5)
      .filter(record => record.status === 'Present').length;
    return ((presentDays / 5) * 100).toFixed(0);
  };

  return (
    <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-[#ff4f18] p-4">
        <h2 className="text-xl font-bold text-white">Attendance History</h2>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-gray-600">Name: {studentData.name}</p>
            <p className="text-gray-600">Room: {studentData.room}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Last 5 Days</p>
            <p className="text-2xl font-bold text-blue-600">
              {calculateAttendancePercentage()}%
            </p>
          </div>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {getLast5DaysAttendance().map((record, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{record.date}</td>
                <td className="p-2 text-center">
                  <span 
                    className={`
                      px-3 py-1 rounded-full 
                      inline-block text-sm font-semibold
                      ${getStatusColor(record.status)}
                    `}
                  >
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAttendanceHistory;