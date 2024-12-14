import React, { useState } from 'react';
import { Calendar, Send, CheckCircle } from 'lucide-react';

const RequestLeave = () => {
  const [leaveDetails, setLeaveDetails] = useState({
    studentName: '',
    roomNumber: '',
    phoneNumber: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [leaveHistory, setLeaveHistory] = useState([
    {
      studentName: 'John Doe',
      roomNumber: 'A101',
      phoneNumber: '1234567890',
      startDate: '2024-12-01',
      endDate: '2024-12-03',
      daysOut: 3,
      reason: 'Family visit',
    },
    {
      studentName: 'Jane Smith',
      roomNumber: 'B202',
      phoneNumber: '9876543210',
      startDate: '2024-12-05',
      endDate: '2024-12-07',
      daysOut: 3,
      reason: 'Medical appointment',
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateDaysOut = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const daysOut = calculateDaysOut(
      leaveDetails.startDate,
      leaveDetails.endDate
    );
    const newLeaveEntry = {
      ...leaveDetails,
      daysOut,
    };

    setLeaveHistory((prevHistory) => [...prevHistory, newLeaveEntry]);
    setSubmitted(true);

    // Reset form
    setLeaveDetails({
      studentName: '',
      roomNumber: '',
      phoneNumber: '',
      startDate: '',
      endDate: '',
      reason: '',
    });

    setTimeout(() => setSubmitted(false), 2000); // Reset submission status after 2 seconds
  };

  return (
    <div className="h-screen">
      <div className="h-100vh grid grid-cols-2 gap-4 p-6">
        {/* Leave Request Form */}
        <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
            Leave Request Form
          </h2>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Student Name
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={leaveDetails.studentName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Room Number
                </label>
                <input
                  type="text"
                  name="roomNumber"
                  value={leaveDetails.roomNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your room number"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={leaveDetails.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={leaveDetails.startDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={leaveDetails.endDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Reason for Leave
                </label>
                <textarea
                  name="reason"
                  value={leaveDetails.reason}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Explain your reason for leave"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#ff4f18] text-white py-2 rounded-md hover:bg-[#ff6918] transition duration-300 flex items-center justify-center"
              >
                <Send className="mr-2" size={20} />
                Submit Leave Request
              </button>
            </form>
          ) : (
            <div className="text-center">
              <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
              <h3 className="text-xl font-semibold mb-2">
                Leave Request Submitted
              </h3>
              <p className="text-gray-600">
                Your request has been added to the leave history.
              </p>
            </div>
          )}
        </div>

        {/* Leave History Section */}
        <div className="w-full mx-auto bg-[#9e918e] shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Leave History
          </h2>
          {leaveHistory.length > 0 ? (
            <div className="overflow-y-auto max-h-96">
              <table className="table-auto w-full text-left border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border border-gray-300">
                      Student Name
                    </th>
                    {/* <th className="px-4 py-2 border border-gray-300">Room Number</th> */}
                    <th className="px-4 py-2 border border-gray-300">Out</th>
                    <th className="px-4 py-2 border border-gray-300">In</th>
                    <th className="px-4 py-2 border border-gray-300">
                      Days Out
                    </th>
                    <th className="px-4 py-2 border border-gray-300">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveHistory.map((leave, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border border-gray-300">
                        {leave.studentName}
                      </td>
                      {/* <td className="px-4 py-2 border border-gray-300">{leave.roomNumber}</td> */}
                      <td className="px-4 py-2 border border-gray-300">
                        {leave.startDate}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {leave.endDate}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {leave.daysOut}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {leave.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-white text-center">
              No leave requests have been made yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestLeave;

// Hostel Owner Management Component
// const LeaveManagement = () => {
//   const [leaveRequests, setLeaveRequests] = useState([
//     {
//       id: 1,
//       studentName: "John Doe",
//       roomNumber: "101",
//       startDate: "2024-03-15",
//       endDate: "2024-03-20",
//       reason: "Family emergency",
//       status: "Pending",
//     },
//   ]);

//   const handleLeaveAction = (id, action) => {
//     setLeaveRequests((prev) =>
//       prev.map((request) =>
//         request.id === id
//           ? {
//               ...request,
//               status: action,
//               responseMessage:
//                 action === "Approved" ? "Leave Granted" : "Request Rejected",
//             }
//           : request
//       )
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           Leave Requests Management
//         </h2>
//         {leaveRequests.map((request) => (
//           <div
//             key={request.id}
//             className="border-b py-4 flex justify-between items-center"
//           >
//             <div>
//               <h3 className="font-semibold text-lg">{request.studentName}</h3>
//               <p className="text-gray-600">Room: {request.roomNumber}</p>
//               <p className="text-sm text-gray-500">
//                 {request.startDate} to {request.endDate}
//               </p>
//               <p className="italic mt-2">{request.reason}</p>
//               <span
//                 className={`
//                   mt-2 px-3 py-1 rounded-full text-sm
//                   ${
//                     request.status === "Pending"
//                       ? "bg-yellow-100 text-yellow-800"
//                       : request.status === "Approved"
//                       ? "bg-green-100 text-green-800"
//                       : "bg-red-100 text-red-800"
//                   }
//                 `}
//               >
//                 {request.status}
//               </span>
//             </div>
//             {request.status === "Pending" && (
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => handleLeaveAction(request.id, "Approved")}
//                   className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center"
//                 >
//                   <CheckCircle className="mr-2" size={20} />
//                   Approve
//                 </button>
//                 <button
//                   onClick={() => handleLeaveAction(request.id, "Rejected")}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center"
//                 >
//                   <XCircle className="mr-2" size={20} />
//                   Reject
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

export { RequestLeave };
