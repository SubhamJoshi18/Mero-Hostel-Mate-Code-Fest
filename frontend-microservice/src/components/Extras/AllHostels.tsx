import { Link } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { RenderStar } from "../Cards/RenderStar";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "../../../public/image2.jpg";

export default function AllHostels() {
  const [hostelData, setHostelData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const GOOGLE_MAPS_API_KEY = "AIzaSyChRHG8gb0TwMq2YOdf_djXNkDxtokdAJI";
        const response = await axios.get(
          `http://localhost:3002/hostel/popular`
        );
        console.log(response.data.result);
        const data = response.data.result.map((hostel) => ({
          _id: hostel._id,
          title: hostel.name,
          location: hostel.address,
          rating: hostel.rating,
          img:
            hostel.photos.length > 0
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hostel.photos[0].photo_reference}&key=${GOOGLE_MAPS_API_KEY}`
              : Image,
        }));
        setHostelData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="h-auto w-screen container mx-auto mb-5">
        <div className="relative flex items-center justify-center">
          <h1
            data-aos="fade-up"
            className="text-[150px] text-gray-100 font-mono font-semibold"
            style={{ fontFamily: "Oswald" }}
          >
            COLLECTION
          </h1>
          <h2
            data-aos="fade-up"
            className="absolute tracking-widest text-center text-xl top-[47%] text-[--primary-color] font-sans uppercase"
          >
            AVAILABLE HOSTELS
          </h2>
        </div>
        <p data-aos="fade-up" className="text-center mb-8">
          Take a detour at our most popular hostel for this season
        </p>
        <div data-aos="fade-up" className="flex justify-center flex-wrap gap-5">
          <button className="px-3 py-1 rounded-3xl bg-[#0cafff] text-white">
            All
          </button>
          <button className="px-3 py-1 border rounded-3xl border-gray-500 hover:bg-[#0cafff]">
            Boys
          </button>
          <button className="px-3 py-1 border rounded-3xl border-gray-500 hover:bg-[#0cafff]">
            Girls
          </button>
        </div>
        <div
          data-aos="fade-up"
          className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 py-10 px-16"
        >
          {hostelData.map((hostel) => (
            <Link to={`/hostel/${hostel._id}`} key={hostel._id}>
              <div
                className="shadow-lg border border-gray-200 rounded-2xl cursor-pointer overflow-hidden hover:-translate-y-2 transition-transform"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0px 4px 8px rgba(0, 0, 0, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "";
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
                      style={{ color: "var(--btn-primary)" }}
                    />
                    {hostel.location}
                  </p>
                  <button className="w-full flex justify-center mb-5 border border-gray-300 lg:px-12 lg:py-2 md:px-16 md:py-2 px-16 py-2 rounded-lg font-semibold gap-2 hover:bg-[--btn-primary] hover:border-none hover:text-white transition-all">
                    view
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div data-aos="fade-up" className="flex justify-center">
          <button className="bg-white text-lg shadow-2xl px-6 py-3 rounded-lg font-semibold text-[--primary-color] hover:text-white hover:bg-[--btn-primary] border border-[--btn-primary] transition-all active:translate-y-0.5">
            View all Hostels
          </button>
        </div>
      </div>
    </>
  );
}
