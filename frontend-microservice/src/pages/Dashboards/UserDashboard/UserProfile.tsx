import React, { useState } from 'react';
import { Edit, Save, User, Phone, MapPin, School, Trash } from 'lucide-react';
import { useEffect } from 'react';
import axiosInstance from '../../../configs/axiosConfig';

const UserProfile = () => {
  // State for user profile
  const [userProfile, setUserProfile] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    collegeName: '',
    faculty: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/user/profile', {
          headers: {
            Authorization: token,
          },
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  // State to track edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Hostel static information
  const hostelInfo = {
    name: 'Green Valley Hostel',
    address: '123 Campus Road, University Area',
    phoneNumber: '+91 9876543210',
    email: 'contact@greenvalleyhostel.com',
  };

  // State for bookmarked hostels
  const [bookmarkedHostels, setBookmarkedHostels] = useState([
    {
      id: 1,
      name: 'Green Valley Hostel',
      location: 'Kathmandu, Nepal',
    },
    {
      id: 2,
      name: 'Sunrise Residency',
      location: 'Pokhara, Nepal',
    },
    {
      id: 3,
      name: 'Himalayan Retreat',
      location: 'Lalitpur, Nepal',
    },
  ]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Save profile
  const saveProfile = () => {
    // In a real app, you would send this to a backend
    console.log('Profile Saved:', userProfile);
    setIsEditing(false);
  };

  // Remove a hostel from bookmarks
  const removeHostel = (id) => {
    setBookmarkedHostels(
      bookmarkedHostels.filter((hostel) => hostel.id !== id)
    );
  };

  return (
    <div className="min-h-screen p-0 ">
      <div className="w-full mx-auto rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#ff4f18] rounded-xl text-white p-4 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold">User Profile</h1>
          {!isEditing ? (
            <button
              onClick={toggleEditMode}
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-blue-50 flex items-center"
            >
              <Edit className="mr-2" size={20} />
              Edit Profile
            </button>
          ) : (
            <button
              onClick={saveProfile}
              className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-50 flex items-center"
            >
              <Save className="mr-2" size={20} />
              Save Profile
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 py-4">
          {/* User Profile Section */}
          <div className="p-6 bg-gray-300 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Personal Information
            </h2>

            <div className="space-y-4">
              {/* Name Input */}
              <div className="flex items-center">
                <User className="mr-3 text-blue-600" size={24} />
                <div className="flex-grow">
                  <label className="block text-gray-700 font-medium mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={userProfile.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-gray-600">
                      {userProfile.name || 'Not set'}
                    </p>
                  )}
                </div>
              </div>

              {/* Address Input */}
              <div className="flex items-center">
                <MapPin className="mr-3 text-blue-600" size={24} />
                <div className="flex-grow">
                  <label className="block text-gray-700 font-medium mb-1">
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={userProfile.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your current address"
                    />
                  ) : (
                    <p className="text-gray-600">
                      {userProfile.address || 'Not set'}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Number Input */}
              <div className="flex items-center">
                <Phone className="mr-3 text-blue-600" size={24} />
                <div className="flex-grow">
                  <label className="block text-gray-700 font-medium mb-1">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={userProfile.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <p className="text-gray-600">
                      {userProfile.phoneNumber || 'Not set'}
                    </p>
                  )}
                </div>
              </div>

              {/* College Name Input */}
              <div className="flex items-center">
                <School className="mr-3 text-blue-600" size={24} />
                <div className="flex-grow">
                  <label className="block text-gray-700 font-medium mb-1">
                    College Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="collegeName"
                      value={userProfile.collegeName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your college name"
                    />
                  ) : (
                    <p className="text-gray-600">
                      {userProfile.collegeName || 'Not set'}
                    </p>
                  )}
                </div>
              </div>

              {/* Faculty Input */}
              <div className="flex items-center">
                <School className="mr-3 text-blue-600" size={24} />
                <div className="flex-grow">
                  <label className="block text-gray-700 font-medium mb-1">
                    Faculty/Department
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="faculty"
                      value={userProfile.faculty}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your faculty or department"
                    />
                  ) : (
                    <p className="text-gray-600">
                      {userProfile.faculty || 'Not set'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Hostel Information Section */}
          <div className=" bg-orange-300 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Hostel Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="mr-3 text-green-600" size={24} />
                <div>
                  <h3 className="font-medium text-gray-700">
                    {hostelInfo.name}
                  </h3>
                  <p className="text-gray-600">{hostelInfo.address}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 text-green-600" size={24} />
                <div>
                  <p className="text-gray-600">{hostelInfo.phoneNumber}</p>
                </div>
              </div>
              <div className="flex items-center">
                <User className="mr-3 text-green-600" size={24} />
                <div>
                  <p className="text-gray-600">{hostelInfo.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bookmarked Hostels Section */}
        <div className="p-6 bg-white rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Bookmarked Hostels
          </h2>
          {bookmarkedHostels.length > 0 ? (
            <ul className="space-y-3">
              {bookmarkedHostels.map((hostel) => (
                <li
                  key={hostel.id}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm"
                >
                  <div>
                    <h3 className="font-medium text-gray-700">{hostel.name}</h3>
                    <p className="text-gray-600">{hostel.location}</p>
                  </div>
                  <button
                    onClick={() => removeHostel(hostel.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash size={20} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No hostels bookmarked.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
