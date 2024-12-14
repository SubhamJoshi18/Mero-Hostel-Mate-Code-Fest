/* eslint-disable @typescript-eslint/no-explicit-any */
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import StarsIcon from "@mui/icons-material/Stars";
import EmailIcon from "@mui/icons-material/Email";
import BathtubIcon from "@mui/icons-material/Bathtub";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LayersIcon from "@mui/icons-material/Layers";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import VerifiedIcon from "@mui/icons-material/Verified";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { useState } from "react";
import { RenderStar } from "../../components/Cards/RenderStar";
import PrimaryButton from "../../components/Button/PrimaryButton";

const HostelData = [
  {
    id: 1,
    hostelName: "Nepzone Boyz Hostel",
    location: "Dillibazar, Kathmandu",
    phone: "123456789",
    PANno: 984564,
    roomType: "Shared",
    ownerName: "Ram Lal Upadhya",
    totalCapacity: 30,
    hostelType: "Boys",
    email: "nep.zoneboyzhostel@gmail.com",
    rating: 4,
    noOfRooms: 30,
    price: 12000,
    isElectricity: false,
    isHotWater: true,
    isParking: false,
    isLaundry: true,
    isLockerRoom: false,
    isWifi: true,
    description:
      "Nepzone Boyz Hostel is located at the very core area of Kathmandu city, delivering a safe, secured, and admirably hospitable student environment. It may be the best choice for students near Dillibazar.",
  },
];

export default function HostelDetails() {
  const [bookmarkAdded, setBookmarkAdded] = useState(false);

  const toggleBookmark = () => {
    setBookmarkAdded((prevState) => !prevState); // Toggle bookmark state
  };

  return (
    <>
      <div className="w-full h-20 bg-[--tertiary-color]"></div>
      <div className="container mx-auto">
        <h2 className="text-center text-5xl font-semibold py-8">
          Book Your <span className="text-[--primary-color]">Dream Hostel</span>
        </h2>

        <div className="hostelMap px-12">
          {HostelData.map((hostel) => (
            <div
              key={hostel.id}
              className="my-8 shadow-2xl p-8 border rounded-2xl"
            >
              {/* Header Section */}
              <div className="header flex items-center justify-between gap-4">
                <div className="flex flex-col gap-4">
                  <h1 className="font-semibold text-3xl text-[--primary-color]">
                    {hostel.hostelName}
                  </h1>
                  <p className="flex gap-2 items-center">
                    <LocationOnIcon style={{ color: "#00ff00" }} />
                    {hostel.location}
                  </p>
                </div>

                {/* Bookmark Icon Toggle */}
                <div onClick={toggleBookmark}>
                  {bookmarkAdded ? (
                    <BookmarkRemoveIcon
                      className="cursor-pointer"
                      style={{ color: "blue", fontSize: "60px" }}
                    />
                  ) : (
                    <BookmarkIcon
                      className="cursor-pointer"
                      style={{ color: "green", fontSize: "60px" }}
                    />
                  )}
                  <PrimaryButton title={"Book Now"} />
                </div>
              </div>

              {/* Details Section */}
              <div className="details-1 mt-8 gap-4 flex items-center justify-between">
                <div className="part-1 flex flex-col gap-4 rounded-xl shadow-xl border p-4 w-full">
                  <h3 className="flex gap-2 items-center">
                    <PhoneIcon style={{ color: "#041E42" }} />
                    {hostel.phone}
                  </h3>
                  <h3 className="flex gap-2 items-center">
                    <PersonPinIcon style={{ color: "#041E42" }} />
                    {hostel.ownerName}
                  </h3>
                </div>
                <div className="part-2 flex flex-col gap-4 rounded-xl shadow-xl border p-4 w-full">
                  <h3 className="flex gap-2 items-center">
                    <HomeIcon style={{ color: "#041E42" }} />
                    {hostel.roomType}
                  </h3>
                  <h3 className="flex gap-2 items-center">
                    <StarsIcon style={{ color: "#041E42" }} />
                    {RenderStar(hostel.rating)}
                  </h3>
                </div>
                <div className="part-3 flex flex-col gap-4 rounded-xl shadow-xl border p-4 w-full">
                  <h3 className="flex gap-2 items-center">
                    <EmailIcon style={{ color: "#041E42" }} />
                    {hostel.email}
                  </h3>
                  <h3 className="flex gap-2 items-center">
                    PAN no:{" " + hostel.PANno}
                  </h3>
                </div>
              </div>

              {/* Description Section */}
              <div className="hostelDetails mt-8">
                <h2 className="text-xl font-medium text-[--primary-color]">
                  Hostel Description
                </h2>
                <p className="mt-4">{hostel.description}</p>
              </div>
              <div className="details-1 pl-4 mt-8 gap-4 flex items-center justify-between">
                <div className="part-1 flex flex-col gap-4 w-full">
                  <h3 className="flex gap-2 items-center">
                    <HomeIcon style={{ color: "#333333" }} />
                    Rooms: 10
                  </h3>
                  <h3 className="flex gap-2 items-center">
                    <BathtubIcon style={{ color: "#333333" }} />
                    Hot Water:
                    {hostel.isHotWater ? " Yes" : " No"}
                  </h3>
                </div>
                <div className="part-2 flex flex-col gap-4 w-full">
                  <h3 className="flex gap-2 items-center">
                    <AttachMoneyIcon style={{ color: "#333333" }} />
                    Price:
                    {" " + hostel.price}
                  </h3>
                  <h3 className="flex gap-2 items-center">
                    <LayersIcon style={{ color: "#333333" }} />
                    Floors: "N/A"
                  </h3>
                </div>
                <div className="part-3 flex flex-col gap-4 w-full">
                  <h3 className="flex gap-2 items-center">
                    <PeopleAltIcon style={{ color: "#333333" }} />
                    Total Students: "N/A"
                  </h3>
                  <h3 className="flex gap-2 items-center">
                    <StarsIcon style={{ color: "#333333" }} />
                    {RenderStar(hostel.rating)}
                  </h3>
                </div>
              </div>

              {/* Features Section */}
              <div className="hostelDetails mt-8">
                <h2 className="text-xl font-medium text-[--primary-color]">
                  Hostel Features
                </h2>
                <div className="details-1 pl-4 mt-8 gap-4 flex items-center justify-between">
                  <div className="part-1 flex flex-col gap-4 w-full">
                    <h3 className="flex gap-2 items-center">
                      <VerifiedIcon style={{ color: "#00ff00" }} />
                      {hostel.isElectricity
                        ? "24hrs Electricity"
                        : "No Electricity"}
                    </h3>
                    <h3 className="flex gap-2 items-center">
                      <VerifiedIcon style={{ color: "#00ff00" }} />
                      {hostel.isWifi ? "Reliable Wi-Fi" : "No Wi-Fi"}
                    </h3>
                  </div>
                  <div className="part-2 flex flex-col gap-4 w-full">
                    <h3 className="flex gap-2 items-center">
                      <VerifiedIcon style={{ color: "#00ff00" }} />
                      {hostel.isHotWater ? "Hot Water" : "No Hot Water"}
                    </h3>
                    <h3 className="flex gap-2 items-center">
                      <VerifiedIcon style={{ color: "#00ff00" }} />
                      {hostel.isParking ? "Parking" : "No Parking"}
                    </h3>
                  </div>
                  <div className="part-3 flex flex-col gap-4 w-full">
                    <h3 className="flex gap-2 items-center">
                      <VerifiedIcon style={{ color: "#00ff00" }} />
                      {hostel.isLaundry ? "Laundry" : "No Laundry"}
                    </h3>
                    <h3 className="flex gap-2 items-center">
                      <VerifiedIcon style={{ color: "#00ff00" }} />
                      {hostel.isLockerRoom
                        ? "Locker Facility"
                        : "No Locker Facility"}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="map-location mt-8">
                <h2 className="font-medium text-xl text-[--primary-color]">
                  {hostel.hostelName + " Location"}
                </h2>
                <div className="mt-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1585252284285!2d85.34202727481528!3d27.71239132527021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1970a9ff7041%3A0xfcaa45db29104458!2sTexas%20International%20College!5e0!3m2!1sen!2snp!4v1734182003395!5m2!1sen!2snp"
                    width="100%"
                    height="450"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
