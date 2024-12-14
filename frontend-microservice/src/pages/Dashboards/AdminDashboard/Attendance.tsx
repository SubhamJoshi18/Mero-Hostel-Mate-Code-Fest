/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

const Attendance = () => {
  // Get today's date
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  // Initial students with added attendance tracking
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      contact: "+1 (555) 123-4567",
      faculty: "Computer Science",
      attendance: {
        [getTodayDate()]: null,
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      contact: "+1 (555) 987-6543",
      faculty: "Electrical Engineering",
      attendance: {
        [getTodayDate()]: null,
      },
    },
    {
      id: 3,
      name: "Mike Johnson",
      contact: "+1 (555) 456-7890",
      faculty: "Mechanical Engineering",
      attendance: {
        [getTodayDate()]: null,
      },
    },
  ]);

  const [attendanceHistory, setAttendanceHistory] = useState([
    {
      studentId: "",
      studentName: "",
      date: "",
      status: "",
    },
  ]);
  const [currentView, setCurrentView] = useState("attendance");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Mark attendance for a student
  const markAttendance = (studentId, status) => {
    const today = getTodayDate();

    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id === studentId) {
          // Check if attendance is already marked for today
          if (student.attendance[today] !== null) {
            alert("Attendance already marked for today!");
            return student;
          }

          // Create a new attendance object
          const updatedAttendance = {
            ...student.attendance,
            [today]: status,
          };

          // Add to attendance history
          setAttendanceHistory((prev) => [
            ...prev,
            {
              studentId: student.id as any,
              studentName: student.name as any,
              date: today as any,
              status: status as any,
            },
          ]);

          return {
            ...student,
            attendance: updatedAttendance,
          };
        }
        return student;
      })
    );
  };

  // View attendance history for a student
  const viewStudentHistory = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    const studentHistory = attendanceHistory.filter(
      (record) => record.studentId === studentId
    );

    setSelectedStudent(student);
    setAttendanceHistory(studentHistory);
    setCurrentView("history");
  };

  // Render main attendance table
  const renderAttendanceTable = () => {
    const today = getTodayDate();

    return (
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-medium text-[--primary-color] mb-4">
          Hostel Attendance ({today})
        </h2>
        <table className="w-full bg-white shadow-md">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Contact</th>
              <th className="px-4 py-3 text-left">Faculty</th>
              <th className="px-4 py-3 text-center">Attendance</th>
              <th className="px-4 py-3 text-center">History</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const todayAttendance = student.attendance[today];
              const isAttendanceMarked = todayAttendance !== null;

              return (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{student.name}</td>
                  <td className="px-4 py-3">{student.contact}</td>
                  <td className="px-4 py-3">{student.faculty}</td>
                  <td className="px-4 py-3 text-center">
                    {!isAttendanceMarked ? (
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => markAttendance(student.id, "Present")}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Present
                        </button>
                        <button
                          onClick={() => markAttendance(student.id, "Absent")}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Absent
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`
                          px-3 py-1 rounded 
                          ${
                            todayAttendance === "Present"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        `}
                      >
                        {todayAttendance}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => viewStudentHistory(student.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View History
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  // Render attendance history
  const renderAttendanceHistory = () => (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-medium text-[--primary-color] mb-4">
          Attendance History for {selectedStudent?.name}
        </h2>
        <button
          onClick={() => setCurrentView("attendance")}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
        >
          Back to Attendance
        </button>
      </div>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceHistory.map((record, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">{record.date}</td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`
                    px-3 py-1 rounded 
                    ${
                      record.status === "Present"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
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
  );
  return (
    <div>
      {currentView === "attendance"
        ? renderAttendanceTable()
        : renderAttendanceHistory()}
    </div>
  );
};

export default Attendance;
