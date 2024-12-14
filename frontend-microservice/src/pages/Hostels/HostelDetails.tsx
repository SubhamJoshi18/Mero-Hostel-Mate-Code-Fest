/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import axios from 'axios';
import Swal from "sweetalert2";
import {
  Button,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axiosInstance from "../../configs/axiosConfig";
import { RenderStar } from "../../components/Cards/RenderStar";

const mapContainerStyle = {
  width: "100%",
  height: "400px", // Adjust height as needed
};

const defaultCenter = { lat: 27.7107273, lng: 85.3109501 }; // Default center coordinates

export default function HostelDetails() {
  const { place_id } = useParams();

  const [hostelItem, setHostelItem] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [location, setLocation] = useState(defaultCenter);
  const [savedHostels, setSavedHostels] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentDistance, setCurrentDistance] = useState("");
  const [currentDuration, setCurrentDuration] = useState("");

  useEffect(() => {
    const fetchHostelDetails = async () => {
      console.log("Hostel Id", place_id);
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/hostel/${place_id}`);
        const data = response.data.hostel;
        console.log(data);

        if (data) {
          setHostelItem(data);
          setReviews(data.review_comments || []);
        }
      } catch (error) {
        console.error("Error fetching hostel details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHostelDetails();

    // Load saved hostels from localStorage
    const saved = JSON.parse(localStorage.getItem("savedHostels")) || [];
    setSavedHostels(saved);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, [place_id]);

  const calculateRoute = async () => {
    if (!hostelItem) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: location,
        destination: {
          lat: hostelItem.location.latitude,
          lng: hostelItem.location.longitude,
        },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
          setCurrentDistance(result.routes[0].legs[0].distance.text);
          setCurrentDuration(result.routes[0].legs[0].duration.text);
          handleOpenDialog(); // Open dialog when route is calculated
        } else {
          console.error("Error fetching directions:", result);
        }
      }
    );
  };

  const handleSaveHostel = async (place_id: any) => {
    try {
      const response = await axiosInstance.post(`/book/hostel/${place_id}`);
      if (response) {
        setSavedHostels([...savedHostels, response.data.hostel]);
      }
      Swal.fire({
        title: "Success!",
        text: "Hostel booked successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Failed to book hostel. Please Log in First to Book Hostel",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <div className="w-full h-20 bg-[--tertiary-color]"></div>
      <div className="container mx-auto">
        <h2 className="text-center text-5xl font-semibold py-12">
          Hostel <span className="text-[--primary-color]">Details</span>
        </h2>

        {hostelItem ? (
          <div className="hostel">
            <div className="grid grid-cols-12 gap-4 px-12 py-5 items-center">
              <div className="bg-[--primary-color] shadow-xl flex justify-center rounded-md overflow-hidden h-96 w-full col-span-5">
                <img
                  className="h-full w-full"
                  src={
                    hostelItem.img
                      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hostelItem.img}&key=AIzaSyChRHG8gb0TwMq2YOdf_djXNkDxtokdAJI`
                      : hostelItem.icon
                  }
                  alt={hostelItem.name}
                />
              </div>
              <div className="bg-white p-2 h-full col-span-4">
                <h2 className="text-3xl font-semibold mb-2">
                  {hostelItem.name}
                </h2>
                {RenderStar(hostelItem.rating)}
                <p className="pt-2 pb-2 text-sm flex">
                  <LocationOnOutlinedIcon
                    fontSize="small"
                    style={{ color: "var(--primary-color)" }}
                  />
                  {hostelItem.address}
                </p>
                <div className="flex flex-col gap-y-1 mb-4 border-t border-b py-1 w-max">
                  <div className="flex gap-2">
                    <h3 className="font-medium text-[17px]">Owner Name:</h3>
                    <p>
                      {hostelItem.owner || (
                        <span className="italic">No Info</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <h3 className="font-medium text-[17px]">Hostel Type:</h3>
                    <p>
                      {hostelItem.type || (
                        <span className="italic">No Info</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <h3 className="font-medium text-[17px]">Hostel Price:</h3>
                    <p>
                      {`NPR. ${hostelItem.price}` || (
                        <span className="italic">No Price</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <h3 className="font-medium text-[17px]">
                      Hostel Owner Phone Number:
                    </h3>
                    <p>
                      {` ${hostelItem.phoneNumber}` || (
                        <span className="italic">No Phone Number</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="buttons-links flex flex-wrap gap-4 items-center">
                  <button
                    className="flex justify-center border border-gray-300 px-8 py-2 rounded-lg font-semibold hover:bg-[--btn-primary] hover:text-white active:translate-y-0.5 transition-all"
                    onClick={() => handleSaveHostel(hostelItem.place_id)}
                  >
                    Book
                  </button>
                  <button
                    className="flex justify-center border border-gray-300 px-8 py-2 rounded-lg font-semibold hover:bg-[--btn-primary] hover:text-white active:translate-y-0.5 transition-all"
                    onClick={calculateRoute}
                  >
                    Get Direction
                  </button>
                  <FavoriteIcon
                    className="cursor-pointer"
                    style={{ color: "#F5F7F8" }}
                  />
                </div>
              </div>
              <div className="col-span-3 h-full w-full">
                <LoadScript googleMapsApiKey="AIzaSyChRHG8gb0TwMq2YOdf_djXNkDxtokdAJI">
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={location}
                    zoom={15}
                  >
                    <Marker position={location} label="You" />
                    <Marker
                      position={{
                        lat: hostelItem.location.latitude,
                        lng: hostelItem.location.longitude,
                      }}
                      label={hostelItem.name}
                    />
                    {directionsResponse && (
                      <DirectionsRenderer directions={directionsResponse} />
                    )}
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center gap-10 mb-10">
              <button
                className={`px-0 py-2 ${
                  activeTab === "description"
                    ? "border-b-2 border-[--primary-color] font-semibold text-[--primary-color]"
                    : "font-semibold"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`px-0 py-2 ${
                  activeTab === "reviews"
                    ? "border-b-2 border-[--primary-color] font-semibold text-[--primary-color]"
                    : "font-semibold"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "description" ? (
              <div className="px-12 py-4">
                <h3 className="text-2xl font-semibold mb-2">Description</h3>
                <p>{hostelItem.description || "No description available."}</p>
              </div>
            ) : (
              <div className="px-12 py-4 mb-12">
                <h3 className="text-3xl font-semibold mb-8">Reviews</h3>
                <div className="gap-8 flex flex-wrap">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div
                        key={review.time}
                        className="border-2 border-gray-300 rounded-lg p-4 w-full hover:scale-105"
                      >
                        <div className="flex justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={review.profile_photo_url}
                              alt={review.author_name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <h3 className="font-semibold text-xl">
                                {review.author_name}
                              </h3>
                              <a
                                href={review.author_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-500"
                              >
                                View Profile
                              </a>
                            </div>
                          </div>
                          <div>{RenderStar(review.rating)}</div>
                        </div>
                        <p>{review.text}</p>
                        <p className="text-sm text-gray-500">
                          {review.relative_time_description}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No reviews available</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>Hostel not found</p>
        )}

        {/* Directions Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Directions to {hostelItem?.name}</DialogTitle>
          <DialogContent>
            <Typography variant="body1">Distance: {currentDistance}</Typography>
            <Typography variant="body1">Duration: {currentDuration}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
