import React, { useState } from 'react';
import PrimaryButton from '../../components/Button/PrimaryButton';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import axiosInstance from '../../configs/axiosConfig';
import { RenderStar } from '../../components/Cards/RenderStar';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const SearchOption = () => {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyChRHG8gb0TwMq2YOdf_djXNkDxtokdAJI';
  const [showDiv, setShowDiv] = useState('search1');
  const [trainData, setTrainData] = useState([]);
  const [formData, setFormData] = useState({
    location: '',
    priceRange: '',
    gender: '',
    faculty: '',
    collegeName: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSearchClick = (searchType) => {
    setShowDiv(searchType);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchPhotoUrl = (photoReference) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_MAPS_API_KEY}`;
  };

  const fetchPhotoReference = async (placeId) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}`
      );
      if (
        response.data.result.photos &&
        response.data.result.photos.length > 0
      ) {
        return response.data.result.photos[0].photo_reference;
      } else {
        return null;
      }
    } catch (error) {
      console.error(
        'Error fetching photo reference from Google Places:',
        error
      );
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const queryParams = {} as any;

    // Construct query parameters based on selected fields
    if (formData.priceRange) queryParams.priceRange = formData.priceRange;
    if (formData.gender) queryParams.gender = formData.gender;
    if (formData.faculty) queryParams.faculty = formData.faculty;
    if (formData.collegeName) queryParams.collegeName = formData.collegeName;

    // Manually encode query parameters
    const encodedQueryParams = Object.keys(queryParams)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
      )
      .join('&');

    try {
      const response = await axiosInstance.get(`/search?${encodedQueryParams}`);
      const data = await Promise.all(
        response.data.data.map(async (hostel) => {
          const photoReference = await fetchPhotoReference(hostel.place_id);
          const img = photoReference ? fetchPhotoUrl(photoReference) : null;
          return { ...hostel, img };
        })
      );
      console.log('This is data', data);
      setTrainData(data);
      setLoading(false);

      // Handle the response data as needed
    } catch (error) {
      console.error('Error fetching hostels:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex space-x-4 justify-center mb-4">
        <div
          className={`text-lg font-medium cursor-pointer ${
            showDiv === 'search1'
              ? 'text-[--primary-color] border-b-2 border-b-[--primary-color]'
              : 'text-black'
          }`}
          onClick={() => handleSearchClick('search1')}
        >
          <h3>By Preference</h3>
        </div>
        <div
          className={`text-lg font-medium cursor-pointer ${
            showDiv === 'search2'
              ? 'text-[--primary-color] border-b-2 border-b-[--primary-color]'
              : 'text-black'
          }`}
          onClick={() => handleSearchClick('search2')}
        >
          <h3>By Nearby</h3>
        </div>
      </div>
      {showDiv === 'search1' ? (
        <form onSubmit={handleSubmit}>
          <div className="overflow-hidden w-[80%] mx-auto pt-4">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <input
                  className="py-2 px-2 w-full outline-none text-gray-500 border rounded-md"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter Location"
                />
              </div>
              <div>
                <input
                  className="py-2 px-1 w-full outline-none text-gray-500 border rounded-md"
                  type="number"
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleInputChange}
                  placeholder="Price Range"
                />
              </div>
              <div>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="py-2 px-2 outline-none border rounded-md text-gray-500 w-full"
                >
                  <option value="" disabled hidden>
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <select
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleInputChange}
                  className="py-2 px-2 outline-none border w-full rounded-md text-gray-500"
                >
                  <option value="" disabled hidden>
                    Choose Your Faculty
                  </option>
                  <option value="IT">IT</option>
                  <option value="SCIENCE">SCIENCE</option>
                  <option value="MANAGEMENT">MANAGEMENT</option>
                  <option value="LAW">LAW</option>
                  <option value="ENGINEERING">ENGINEERING</option>
                  <option value="OPTIONAL">OPTIONAL</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 items-center pt-4">
              <div className="col-span-9">
                <input
                  type="text"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  className="py-2 px-2 w-full outline-none border text-gray-500 rounded-lg shadow placeholder-gray-400"
                  placeholder="Enter College Name (Optional)"
                />
              </div>
              <div className="col-span-3">
                <PrimaryButton
                  title={'Submit'}
                  className="py-3 w-full text-white bg-[--btn-primary] px-6 hover:bg-[--btn-secondary] rounded-lg shadow-md transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="text-center text-gray-500">
          {/* Content for "By Nearby" */}
          <h2 className="text-2xl font-semibold">Search By Nearby</h2>
          <p className="mt-2">Coming soon! Stay tuned for updates.</p>
        </div>
      )}

      <div
        data-aos="fade-up"
        className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 py-10 px-16"
      >
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          trainData.map((hostel) => (
            <Link to={`/hostel/${hostel.place_id}`} key={hostel.place_id}>
              <div className="shadow-lg border border-gray-200 rounded-2xl cursor-pointer overflow-hidden hover:-translate-y-2 transition-transform">
                <div className="object-cover">
                  <img
                    src={hostel.img}
                    alt={hostel.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="px-5">
                  <p className="text-lg py-2 font-semibold">{hostel.title}</p>
                  {RenderStar(hostel.rating)}
                  <p className="mb-4 text-[#acacac] text-sm mt-1">
                    <LocationOnOutlinedIcon
                      fontSize="small"
                      style={{ color: 'var(--btn-primary)' }}
                    />
                    {hostel.address}
                  </p>
                  <button className="w-full flex justify-center mb-5 border border-gray-300 lg:px-12 lg:py-2 md:px-16 md:py-2 px-16 py-2 rounded-lg font-semibold gap-2 hover:bg-[--btn-primary] hover:border-none hover:text-white transition-all">
                    View
                  </button>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
};
