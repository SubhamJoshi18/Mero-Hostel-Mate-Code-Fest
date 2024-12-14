import React, { useState } from "react";
import { Calendar, Send, CheckCircle, XCircle } from "lucide-react";

// Leave Request Component (Student Side)
const RequestLeave = () => {
  const [leaveDetails, setLeaveDetails] = useState({
    studentName: "",
    roomNumber: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to backend
    console.log("Leave Request Submitted:", leaveDetails);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
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
                // rows="4"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
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
              Your request is pending approval from the hostel owner.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

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

export { RequestLeave};