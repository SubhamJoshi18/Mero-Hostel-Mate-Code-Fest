import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from '../../../public/image2.jpg';
import PrimaryButton from '../Button/PrimaryButton';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { RenderStar } from '../Cards/RenderStar';
import './loader.css';
import axiosInstance from '../../configs/axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function AllHostels() {
  const [hostelData, setHostelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const GOOGLE_MAPS_API_KEY = 'AIzaSyChRHG8gb0TwMq2YOdf_djXNkDxtokdAJI';
        const response = await axiosInstance.get(
          `/hostels?lat=27.7219&lng=85.324`
        );
        console.log(response.data.hostels);
        const data = response.data.hostels.map((hostel) => ({
          _id: hostel.place_id,
          title: hostel.name,
          location: hostel.location,
          rating: hostel.rating,
          img: hostel.img
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hostel.img}&key=${GOOGLE_MAPS_API_KEY}`
            : Image,
        }));

        setHostelData(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <div className="h-auto w-screen container mx-auto mb-5">
      <div className="relative flex items-center justify-center">
        <h1
          data-aos="fade-up"
          className="text-[150px] text-gray-200 font-mono font-semibold"
          style={{ fontFamily: 'Oswald' }}
        >
          HOSTELS
        </h1>
        <h2
          data-aos="fade-up"
          className="absolute tracking-widest text-center text-xl top-[47%] text-[--primary-color] font-sans uppercase"
        >
          All Hostels
        </h2>
      </div>
      <p data-aos="fade-up" className="text-center mb-8">
        Explore all available hostels
      </p>
      <div data-aos="fade-up" className="flex justify-center flex-wrap gap-5">
        <PrimaryButton
          title={'All'}
          className="px-3 py-1 rounded-3xl bg-[--btn-primary] text-white"
        />
        <PrimaryButton
          title={'Boys'}
          className="px-3 py-1 border rounded-3xl hover:text-white border-gray-300 hover:bg-[--btn-primary]"
        />
        <PrimaryButton
          title={'Girls'}
          className="px-3 py-1 border rounded-3xl hover:text-white border-gray-300 hover:bg-[--btn-primary]"
        />
      </div>
      <div
        data-aos="fade-up"
        className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 py-10 px-16"
      >
        {hostelData.map((hostel) => (
          <div
            key={hostel._id}
            className="shadow-lg border border-gray-200 rounded-2xl cursor-pointer overflow-hidden hover:-translate-y-2 transition-transform"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                '0px 4px 8px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '';
            }}
          >
            <div className="object-cover">
              <img
                src={hostel.img}
                alt={hostel.title}
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
                {hostel.location}
              </p>
              <button
                className="w-full flex justify-center mb-5 border border-gray-300 lg:px-12 lg:py-2 md:px-16 md:py-2 px-16 py-2 rounded-lg font-semibold gap-2 hover:bg-[--btn-primary] hover:border-none hover:text-white transition-all"
                onClick={() => navigate(`/hostel/${hostel._id}`)}
              >
                view
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
