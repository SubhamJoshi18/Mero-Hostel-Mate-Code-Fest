import React, { useState, useEffect } from 'react';
import { FileUpload } from './FileUpload';
import axiosInstance from '../../../configs/axiosConfig';
import Swal from 'sweetalert2';

const HostelRegistrationForm = () => {
  const [formData, setFormData] = useState({
    hostelName: '',
    address: '',
    panNumber: '',
    price: '',
    roomType: '',
    hostelType: '',
    email: '',
    phone: '',
    numberOfRooms: '',
    totalCapacity: '',
    features: {
      electricity24Hours: false,
      hotWater: false,
      laundry: false,
      wifi: false,
      parking: false,
      lockerRoom: false,
    },
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchHostelData = async () => {
      const hostelId = localStorage.getItem('hostel_id');
      if (hostelId) {
        setIsEditMode(true);
        try {
          const response = await axiosInstance.get(`/hostel/${hostelId}`);
          const hostelData = response.data;
          setFormData({
            hostelName: hostelData.name,
            address: hostelData.address,
            panNumber: hostelData.pan_number,
            price: hostelData.price,
            roomType: hostelData.room_type,
            hostelType: hostelData.hostel_type,
            email: hostelData.email,
            phone: hostelData.phone,
            numberOfRooms: hostelData.number_of_rooms,
            totalCapacity: hostelData.total_capacity,
            features: hostelData.features,
          });
        } catch (error) {
          console.error('Error fetching hostel data:', error);
        }
      }
    };

    fetchHostelData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFeatureChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      features: {
        ...prevState.features,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const hostelId = localStorage.getItem('hostel_id');
      if (isEditMode && hostelId) {
        // Update existing hostel
        await axiosInstance.put(`/hostel/${hostelId}`, formData, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        Swal.fire({
          icon: 'success',
          title: 'Hostel Updated Successfully',
          text: 'Your changes have been saved!',
        });
      } else {
        // Create new hostel
        const response = await axiosInstance.post(
          '/register/hostel',
          formData,
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        localStorage.setItem('hostel_id', response.data.response);
        Swal.fire({
          icon: 'success',
          title: 'Hostel Registered Successfully',
          text: 'Welcome back!',
        });
      }
      setSuccessMessage('Hostel saved successfully!');
    } catch (error) {
      setErrorMessage('Error saving hostel. Please try again.');
      console.error('Error saving hostel:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-4xl text-[--primary-color] font-bold mb-16 mt-4 text-center">
          {isEditMode ? 'Edit Hostel' : 'Hostel Registration Form'}
        </h2>

        {/* Success and Error Messages */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {errorMessage}
          </div>
        )}

        {/* Hostel Details Section */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="hostelName"
            >
              Hostel Name
            </label>
            <input
              type="text"
              name="hostelName"
              value={formData.hostelName}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Hostel Name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Full Address"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="panNumber"
            >
              PAN Number
            </label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter PAN Number"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Price"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="roomType"
            >
              Room Type
            </label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" hidden>
                Choose Your Room Type
              </option>
              <option value="Single">Single</option>
              <option value="Shared">Shared</option>
              <option value="Both">Both</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="hostelType"
            >
              Hostel Type
            </label>
            <select
              name="hostelType"
              value={formData.hostelType}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" hidden>
                Choose Your Hostel Type
              </option>
              <option value="Girls">Girls</option>
              <option value="Boys">Boys</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Phone Number"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="numberOfRooms"
            >
              Number of Rooms
            </label>
            <input
              type="number"
              name="numberOfRooms"
              value={formData.numberOfRooms}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Number of Rooms"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="totalCapacity"
            >
              Total Capacity
            </label>
            <input
              type="number"
              name="totalCapacity"
              value={formData.totalCapacity}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Total Capacity"
              required
            />
          </div>
        </div>

        {/* virtual tour upload */}
        <FileUpload />

        {/* Features Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Hostel Features
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(formData.features).map(([feature, value]) => (
              <div key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  name={feature}
                  checked={value}
                  onChange={handleFeatureChange}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="text-gray-700">
                  {feature
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, function (str) {
                      return str.toUpperCase();
                    })}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center mt-12">
          <button
            type="submit"
            className="text-white text-lg bg-[--btn-primary] px-6 py-3 rounded-md hover:bg-[--btn-secondary] transition-all active:translate-y-0.5"
            disabled={loading}
          >
            {loading
              ? 'Saving...'
              : isEditMode
              ? 'Save Changes'
              : 'Register Hostel'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HostelRegistrationForm;
