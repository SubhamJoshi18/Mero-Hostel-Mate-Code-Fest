import React, { useEffect, useState } from 'react';
import { Check, Eye, X } from 'lucide-react';
import axiosInstance from '../../../configs/axiosConfig';

const HostelerList = () => {
  const [hostelers, setHostelers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hostelToken = localStorage.getItem('hostel_id');
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`/approve/${hostelToken}`, {
          headers: {
            Authorization: token,
          },
        });
        console.log(response.data.hostel);
        setHostelers(response.data.hostel);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const [selectedHosteler, setSelectedHosteler] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    phoneNumber: '',
    faculty: '',
    additionalDetails: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const viewHostelerDetails = (hosteler) => {
    setSelectedHosteler(hosteler);
  };

  const closeHostelerDetails = () => {
    setSelectedHosteler(null);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      {/* Modal */}
      {selectedHosteler && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96 relative">
            <button
              onClick={closeHostelerDetails}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Hosteler Details</h2>
            <div>
              <p>
                <strong>Name:</strong> {selectedHosteler.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedHosteler.college}
              </p>
              <p>
                <strong>Phone:</strong> {selectedHosteler.phoneNumber}
              </p>
              <p>
                <strong>Faculty:</strong> {selectedHosteler.faculty}
              </p>
              {selectedHosteler.additionalDetails && (
                <p>
                  <strong>Additional Details:</strong>{' '}
                  {selectedHosteler.additionalDetails}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Active Hostelers */}
      <div className="bg-white shadow-md rounded-lg p-8 mb-8">
        <h2 className="text-3xl font-medium mb-4 text-[--primary-color]">
          Active Hostelers
        </h2>
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Faculty</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hostelers.map((hosteler) => (
              <tr key={hosteler.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{hosteler.name}</td>
                <td className="p-3">{hosteler.college}</td>
                <td className="p-3">{hosteler.phoneNumber}</td>
                <td className="p-3">{hosteler.faculty}</td>
                <td className="p-3">
                  <button
                    onClick={() => viewHostelerDetails(hosteler)}
                    className="text-blue-500 flex items-center gap-1 hover:text-blue-700"
                  >
                    <Eye size={20} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HostelerList;
