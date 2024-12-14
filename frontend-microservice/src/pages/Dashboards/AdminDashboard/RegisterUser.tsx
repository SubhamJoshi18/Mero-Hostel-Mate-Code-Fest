import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function RegisterUser() {
  const [hostelers, setHostelers] = useState([]);
  const [newHosteler, setNewHosteler] = useState({
    name: "",
    college: "",
    gender: "",
    faculty: "",
    address: "",
    contact: "",
    dateofbirth: "",
    roomNumber: "",
  });

  const handleHostelerChange = (e) => {
    const { name, value } = e.target;
    setNewHosteler({ ...newHosteler, [name]: value });
  };

  const registerHosteler = async () => {
    if (!newHosteler.name || !newHosteler.contact || !newHosteler.roomNumber) {
      alert('Please fill all required fields');
      return;
    }
    setHostelers([...hostelers, newHosteler]);
    setNewHosteler({
      name: '',
      college: '',
      gender: '',
      faculty: '',
      address: '',
      contact: '',
      dateofbirth: '',
      roomNumber: '',
    });
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Hosteler Registration Section */}
      <div>
        <h2 className="text-3xl font-medium text-[--primary-color] mb-4">
          Register Hosteler
        </h2>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium">Name:</label>
              <input
                type="text"
                name="name"
                value={newHosteler.name}
                onChange={handleHostelerChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-medium">College:</label>
              <input
                type="text"
                name="college"
                value={newHosteler.college}
                onChange={handleHostelerChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-medium">Gender:</label>
              <input
                type="text"
                name="gender"
                value={newHosteler.gender}
                onChange={handleHostelerChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-medium">Faculty:</label>
              <input
                type="text"
                name="faculty"
                value={newHosteler.faculty}
                onChange={handleHostelerChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-medium">Address:</label>
              <input
                type="text"
                name="address"
                value={newHosteler.address}
                onChange={handleHostelerChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-medium">Contact:</label>
              <input
                type="text"
                name="contact"
                value={newHosteler.contact}
                onChange={handleHostelerChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-medium">Date of Birth:</label>
              <input
                type="date"
                name="dateofbirth"
                value={newHosteler.dateofbirth}
                onChange={handleHostelerChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-medium">Room Number:</label>
              <input
                type="text"
                name="roomNumber"
                value={newHosteler.roomNumber}
                onChange={handleHostelerChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>
          </div>
          <button
            onClick={registerHosteler}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Register Hosteler
          </button>
        </div>

        <div>
          <h3 className="text-3xl font-medium text-[--primary-color] mb-4">
            Registered Hostelers
          </h3>
          {hostelers.length === 0 ? (
            <p>No hostelers registered yet.</p>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">College</th>
                  <th className="border border-gray-300 px-4 py-2">Gender</th>
                  <th className="border border-gray-300 px-4 py-2">Faculty</th>
                  <th className="border border-gray-300 px-4 py-2">Address</th>
                  <th className="border border-gray-300 px-4 py-2">Contact</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Date of Birth
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Room Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {hostelers.map((hosteler, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {hosteler.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {hosteler.college}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {hosteler.gender}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {hosteler.faculty}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {hosteler.address}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {hosteler.contact}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {hosteler.dateofbirth}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {hosteler.roomNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
