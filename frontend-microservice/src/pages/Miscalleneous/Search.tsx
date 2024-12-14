import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { RenderStar } from "../../components/Cards/RenderStar";

export const Search = () => {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [faculty, setFaculty] = useState("");
  const [hostelData, setHostelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDiv, setShowDiv] = useState("search1"); // Set default to "search1"

  const googleMapsApiKey = "AIzaSyChRHG8gb0TwMq2YOdf_djXNkDxtokdAJI"; // Replace with your actual API Key

  const handleGetCoordinates = async () => {
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address: location,
            key: googleMapsApiKey,
          },
        }
      );
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error("No results found");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  const handleGetLocationRecommendation = async () => {
    setLoading(true);
    setError(null);
    const coordinates = await handleGetCoordinates();
    if (coordinates) {
      try {
        const response = await axios.get(
          "http://localhost:3002/hostel/location",
          {
            params: {
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
              faculty,
            },
          }
        );
        if (response.data && response.data.length > 0) {
          const data = response.data.map((hostel) => ({
            _id: hostel._id,
            title: hostel.name,
            location: hostel.address,
            rating: hostel.rating,
            img:
              hostel.photos.length > 0
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hostel.photos[0].photo_reference}&key=${googleMapsApiKey}`
                : Image,
          }));
          setHostelData(data);
        } else {
          throw new Error("No hostels found");
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setError("Failed to fetch hostel recommendations. Please try again.");
      }
    } else {
      setError("Failed to get coordinates for the specified location.");
    }
    setLoading(false);
  };

  const handleGetRecommendations = async () => {
    setLoading(true);
    setError(null);
    const coordinates = await handleGetCoordinates();
    if (coordinates) {
      try {
        const response = await axios.get(
          "http://localhost:3002/hostel/filter",
          {
            params: {
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
              price: Number(price),
              faculty,
            },
          }
        );

        if (response.data && response.data.length > 0) {
          const data = response.data.map((hostel) => ({
            _id: hostel._id,
            title: hostel.name,
            location: hostel.address,
            rating: hostel.rating,
            img:
              hostel.photos.length > 0
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hostel.photos[0].photo_reference}&key=${googleMapsApiKey}`
                : Image,
          }));
          setHostelData(data);
        } else {
          throw new Error("No hostels found");
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setError("Failed to fetch hostel recommendations. Please try again.");
      }
    } else {
      setError("Failed to get coordinates for the specified location.");
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (showDiv === "search1") {
      handleGetRecommendations();
    } else {
      handleGetLocationRecommendation();
    }
  };

  const handleSearchClick = (searchType) => {
    setShowDiv(searchType);
  };

  return (
    <>
      <div className="h-20 bg-[--tertiary-color]"></div>
      <div className="h-auto w-screen container mx-auto mb-5">
        {/* Search 1 and Search 2 buttons */}
        <div className="flex space-x-4 justify-center mb-6">
          <div
            className={`text-lg font-medium cursor-pointer ${
              showDiv === "search1"
                ? "text-[--primary-color] border-b-2 border-b-[--primary-color]"
                : "text-black"
            }`}
            onClick={() => handleSearchClick("search1")}
          >
            <h3>By Preference</h3>
          </div>
          <div
            className={`text-lg font-medium cursor-pointer ${
              showDiv === "search2"
                ? "text-[--primary-color] border-b-2 border-b-[--primary-color]"
                : "text-black"
            }`}
            onClick={() => handleSearchClick("search2")}
          >
            <h3>By Nearby</h3>
          </div>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex justify-center gap-5 mb-10"
        >
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded-lg p-2"
            required
          />
          {showDiv === "search1" && (
            <input
              type="text"
              placeholder="Price range"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border rounded-lg p-2"
            />
          )}
          <input
            type="text"
            placeholder="Faculty"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            className="border rounded-lg p-2"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#0cafff] text-white rounded-lg"
          >
            Search
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Loading and Results */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 py-10 px-16">
            {hostelData.map((hostel) => (
              <Link to={`/hostel/${hostel._id}`} key={hostel._id}>
                <div className="shadow-lg border border-gray-200 rounded-2xl cursor-pointer overflow-hidden hover:-translate-y-2 transition-transform">
                  <div className="object-cover bg-red-500">
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
                      View
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
