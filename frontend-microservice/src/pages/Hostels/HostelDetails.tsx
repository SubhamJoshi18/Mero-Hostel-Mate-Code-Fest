/* eslint-disable @typescript-eslint/no-explicit-any */
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import StarsIcon from '@mui/icons-material/Stars';
import EmailIcon from '@mui/icons-material/Email';
import BathtubIcon from '@mui/icons-material/Bathtub';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LayersIcon from '@mui/icons-material/Layers';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VerifiedIcon from '@mui/icons-material/Verified';
import { RenderStar } from '../../components/Cards/RenderStar';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { useEffect, useState } from 'react';
import axiosInstance from '../../configs/axiosConfig';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';

export default function HostelDetails() {
  const { place_id } = useParams();

  const [hostelItem, setHostelItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostelDetails = async () => {
      console.log('Hostel Id', place_id);
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/hostel/${place_id}`);
        const data = response.data.hostel;
        console.log(data);

        if (data) {
          setHostelItem(data);
        }
      } catch (error) {
        console.error('Error fetching hostel details:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch hostel details.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHostelDetails();
  }, [place_id]);

  const handleBookNow = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire({
        title: 'Not Logged In',
        text: 'Please log in to book a hostel.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }
    try {
      const response = await axiosInstance.post(
        `/book/hostel/${place_id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);

      Swal.fire({
        title: 'Booking Confirmed!',
        text: 'Your booking has been confirmed. We will contact you soon.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (err) {
      console.error('Error during booking:', err);
      Swal.fire({
        title: 'Booking Failed!',
        text: 'There was an error processing your booking. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  if (loading) return <CircularProgress />;

  if (!hostelItem) return <p>Hostel not found</p>;

  return (
    <>
      <div className="w-full h-20 bg-[--tertiary-color]"></div>
      <div className="container mx-auto">
        <h2 className="text-center text-5xl font-semibold py-8">
          Book Your <span className="text-[--primary-color]">Dream Hostel</span>
        </h2>

        <div className="hostelMap px-12">
          <div className="mt-8 shadow-2xl p-8 border rounded-2xl">
            <div className="header flex items-center justify-between gap-4">
              <div className="flex flex-col gap">
                <h1 className="font-semibold text-3xl text-[--primary-color]">
                  {hostelItem.name}
                </h1>
                <p className="flex gap-2 items-center">
                  <LocationOnIcon style={{ color: '#00ff00' }} />
                  {hostelItem.address}
                </p>
              </div>
              <div>
                <PrimaryButton title={'Book Now'} onClick={handleBookNow} />
              </div>
            </div>
            <div className="details-1 mt-8 gap-4 flex items-center justify-between">
              <div className="part-1 flex flex-col gap-4 rounded-xl shadow-xl border p-4 w-full">
                <h3 className="flex gap-2 items-center">
                  <PhoneIcon style={{ color: '#041E42' }} />
                  {hostelItem.phoneNumber}
                </h3>
                <h3 className="flex gap-2 items-center">
                  <PersonPinIcon style={{ color: '#041E42' }} />
                  {hostelItem.ownerName ? hostelItem.ownerName : 'No Owner'}
                </h3>
              </div>
              <div className="part-2 flex flex-col gap-4 rounded-xl shadow-xl border p-4 w-full">
                <h3 className="flex gap-2 items-center">
                  <HomeIcon style={{ color: '#041E42' }} />
                  {hostelItem.roomType}
                </h3>
                <h3 className="flex gap-2 items-center">
                  <StarsIcon style={{ color: '#041E42' }} />
                  {RenderStar(hostelItem.rating)}
                </h3>
              </div>
              <div className="part-3 flex flex-col gap-4 rounded-xl shadow-xl border p-4 w-full">
                <h3 className="flex gap-2 items-center">
                  <EmailIcon style={{ color: '#041E42' }} />
                  {hostelItem.email}
                </h3>
                <h3 className="flex gap-2 items-center">
                  PAN no:{' ' + hostelItem.pan_number}
                </h3>
              </div>
            </div>
            <div className="hostelDetails mt-8">
              <h2 className="text-xl font-medium text-[--primary-color]">
                Hostel Description
              </h2>
              <p className="mt-4">{hostelItem.description}</p>
              <div className="details-1 pl-4 mt-8 gap-4 flex items-center justify-between">
                <div className="part-1 flex flex-col gap-4 w-full">
                  <h3 className="flex gap-2 items-center">
                    <HomeIcon style={{ color: '#333333' }} />
                    Rooms: {hostelItem.number_of_rooms}
                  </h3>
                  <h3 className="flex gap-2 items-center">
                    <BathtubIcon style={{ color: '#333333' }} />
                    Hot Water:
                    {hostelItem.isHotWater ? ' Yes' : ' No'}
                  </h3>
                </div>
                <div className="part-2 flex flex-col gap-4 w-full">
                  <h3 className="flex gap-2 items-center">
                    <AttachMoneyIcon style={{ color: '#333333' }} />
                    Price:
                    {' ' + hostelItem.price}
                  </h3>
                  <h3 className="flex gap-2 items-center">
                    <LayersIcon style={{ color: '#333333' }} />
                    Floors: "N/A"
                  </h3>
                </div>
                <div className="part-3 flex flex-col gap-4 w-full">
                  <h3 className="flex gap-2 items-center">
                    <PeopleAltIcon style={{ color: '#333333' }} />
                    Total Students: "N/A"
                  </h3>
                  <h3 className="flex gap-2 items-center">
                    <StarsIcon style={{ color: '#333333' }} />
                    {RenderStar(hostelItem.rating)}
                  </h3>
                </div>
              </div>
            </div>
            <div className="hostelDetails mt-8">
              <h2 className="text-xl font-medium text-[--primary-color]">
                Hostel Features
              </h2>
              <div className="details-1 pl-4 mt-8 gap-4 flex items-center justify-between">
                <div className="part-1 flex flex-col gap-4 w-full">
                  <h3 className="flex gap-2 items-center">
                    <VerifiedIcon style={{ color: '#00ff00' }} />
                    {hostelItem.isElectricity
                      ? '24hrs Electricity'
                      : 'No Electricity'}
                  </h3>
                  <h3 className="flex gap-2 items-center">
                    <VerifiedIcon style={{ color: '#00ff00' }} />
                    {hostelItem.isWifi ? 'Reliable Wi-Fi' : 'No Wi-Fi'}
                  </h3>
                </div>
                <div className="part-2 flex flex-col gap-4 w-full">
                  <h3 className="flex gap-2 items-center">
                    <VerifiedIcon style={{ color: '#00ff00' }} />
                    {hostelItem.isHotWater ? 'Hot Water' : 'No Hot Water'}
                  </h3>
                  <h3 className="flex gap-2 items-center">
                    <VerifiedIcon style={{ color: '#00ff00' }} />
                    {hostelItem.isParking ? 'Parking' : 'No Parking'}
                  </h3>
                </div>
                <div className="part-3 flex flex-col gap-4 w-full">
                  <h3 className="flex gap-2 items-center">
                    <VerifiedIcon style={{ color: '#00ff00' }} />
                    {hostelItem.isLaundry ? 'Laundry' : 'No Laundry'}
                  </h3>
                  <h3 className="flex gap-2 items-center">
                    <VerifiedIcon style={{ color: '#00ff00' }} />
                    {hostelItem.isLockerRoom
                      ? 'Locker Facility'
                      : 'No Locker Facility'}
                  </h3>
                </div>
              </div>
            </div>
            <div className="map-location mt-8">
              <h2 className="font-medium text-xl text-[--primary-color]">
                {hostelItem.hostelName + ' Location'}
              </h2>
              <div className="mt-4">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1585252284285!2d85.34202727481528!3d27.71239132527021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1970a9ff7041%3A0xfcaa45db29104458!2s${encodeURIComponent(
                    hostelItem.name
                  )}!5e0!3m2!1sen!2snp!4v1734182003395!5m2!1sen!2snp`}
                  width="100%"
                  height="450"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
