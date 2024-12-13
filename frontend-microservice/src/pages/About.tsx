import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import GppGoodIcon from "@mui/icons-material/GppGood";
import HandshakeIcon from "@mui/icons-material/Handshake";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

export default function About() {
  // Initialize AOS in useEffect
  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration
      once: true, // Whether animation should happen only once or every time you scroll
    });
    AOS.refresh(); // Refresh AOS after the component is rendered
  }, []);

  return (
    <>
      <div className="bg-[url(/assets/2.webp)] bg-center bg-no-repeat bg-cover top-0 w-full">
        <div className="container mx-auto">
          <div className="Hero-section h-[100vh] py-32 pt-48 flex-col flex items-center justify-center mx-auto px-12 text-white leading-none">
            <h1
              className="text-[150px] font-extrabold uppercase tracking-wider"
              style={{ fontFamily: "Oswald" }}
            >
              About us
            </h1>
            <p className="w-[700px] text-center leading-loose mt-8">
              Experience comfort and convenience with our expertly curated
              hostel listings, designed to match students with their perfect
              living space.
            </p>
            <div className="images grid grid-cols-4 items-center gap-4 h-52 mt-8">
              <div className="h-52 w-auto shadow-2xl">
                <img
                  className="rounded-2xl h-full"
                  src="/assets/3.webp"
                  alt="images"
                />
              </div>
              <div>
                <img
                  className="rounded-2xl shadow-2xl"
                  src="/assets/4.webp"
                  alt="images"
                />
              </div>
              <div className="h-52 w-auto shadow-2xl">
                <img
                  className="rounded-2xl h-full"
                  src="/assets/5.webp"
                  alt="images"
                />
              </div>
              <div>
                <img
                  className="rounded-2xl shadow-2xl"
                  src="/assets/10.webp"
                  alt="images"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-12 w-full py-24">
        <div className="relative flex flex-col items-center justify-center">
          <h1
            data-aos="fade-up"
            className="text-[150px] text-gray-100 font-mono font-semibold uppercase"
            style={{ fontFamily: "Oswald" }}
          >
            Welcome to
          </h1>
          <h2
            data-aos="fade-up"
            className="absolute tracking-widest text-center text-xl top-[47%] text-[--primary-color] font-sans uppercase"
          >
            Mero hostel mate
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-8 w-full mt-12 leading-loose">
          <p className="w-full">
            Your trusted platform for student-friendly hostel accommodations. We
            believe that finding the perfect place to stay during your academic
            journey should be simple, reliable, and tailored to your needs.
          </p>
          <p className="w-full">
            That's why we've created a service designed specifically with
            students in mind, ensuring a hassle-free experience from booking to
            move-in day.
          </p>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <h1
          data-aos="fade-up"
          className="text-[150px] text-gray-100 font-mono font-semibold uppercase"
          style={{ fontFamily: "Oswald" }}
        >
          Missions
        </h1>
        <h2
          data-aos="fade-up"
          className="absolute tracking-widest text-center text-xl top-[47%] text-[--primary-color] font-sans uppercase"
        >
          Our Missions
        </h2>
      </div>
      <div className="grid grid-cols-2 items-center gap-8 w-full container mx-auto px-12 py-16">
        <div className="w-full">
          <img
            className="rounded-xl"
            src="/assets/our_mission.png"
            alt="our mission"
          />
        </div>
        <div className="w-full">
          <h2 className="text-5xl mb-8" style={{ fontFamily: "Oswald" }}>
            We ensure every hosteler's need
          </h2>
          <p className="w-full leading-loose">
            At Mero Hostel Mate, we aim to revolutionize the way students find
            housing. We connect you with verified hostels that offer comfort,
            community, and convenience.
          </p>
          <div className="border-l-4 border-[--primary-color] pl-4">
            <p className="w-full leading-loose font-bold italic mt-4">
              "Everything you need to feel at home. Our platform simplifies the
              search and booking process, so you can focus on your studies while
              we take care of the rest."
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <h1
          data-aos="fade-up"
          className="text-[150px] text-gray-100 font-mono font-semibold uppercase"
          style={{ fontFamily: "Oswald" }}
        >
          Services
        </h1>
        <h2
          data-aos="fade-up"
          className="absolute tracking-widest text-center text-xl top-[47%] text-[--primary-color] font-sans uppercase"
        >
          What we offer
        </h2>
      </div>
      <div className="process grid grid-rows-4 container mx-auto px-12 mt-12 mb-28 gap-y-16">
        <div
          data-aos="fade-up"
          className="Hostel-planning w-96 mx-40 bg-gray-200 rounded-lg px-4 py-4 flex flex-col items-center justify-center"
          style={{ boxShadow: "5px 8px 8px 0px rgba(0, 0, 0, 0.5)" }}
        >
          <div className="bg-white rounded-full w-max p-4 shadow-lg">
            <InsertEmoticonIcon
              style={{ color: "var(--primary-color)", fontSize: 70 }}
            />
          </div>
          <h1 className="text-xl font-medium mt-8 mb-4">
            Customer Satisfaction
          </h1>
          <p className="text-center">
            We are committed to delivering the best service, ensuring you have a
            smooth and stress-free booking experience.
          </p>
        </div>
        <div
          data-aos="fade-up"
          className="Room-booking w-96 mx-40 justify-self-end bg-gray-200 rounded-lg px-4 py-4 flex flex-col items-center justify-center"
          style={{ boxShadow: "5px 8px 8px 0px rgba(0, 0, 0, 0.5)" }}
        >
          <div className="bg-white rounded-full w-max p-4 shadow-lg">
            <GppGoodIcon
              style={{ color: "var(--primary-color)", fontSize: 70 }}
            />
          </div>
          <h1 className="text-xl font-medium mt-8 mb-4">
            Authentic Hostel Experience
          </h1>
          <p className="text-center">
            We understand the unique needs of students and strive to provide
            genuine hostel experiences that prioritize your comfort and
            convenience.
          </p>
        </div>
        <div
          data-aos="fade-up"
          className="stay-preparation mx-40 w-96 bg-gray-200 rounded-lg px-4 py-4 flex flex-col items-center justify-center"
          style={{ boxShadow: "5px 8px 8px 0px rgba(0, 0, 0, 0.5)" }}
        >
          <div className="bg-white rounded-full w-max p-4 mt-4 shadow-lg">
            <HandshakeIcon
              style={{ color: "var(--primary-color)", fontSize: 70 }}
            />
          </div>
          <h1 className="text-xl font-medium mt-8 mb-4">
            Trusted Hostel Listings
          </h1>
          <p className="text-center">
            Safety and reliability are our top priorities. Every hostel listed
            on our platform is carefully verified, ensuring you have access to
            the best accommodations near your campus.
          </p>
        </div>
        <div
          data-aos="fade-up"
          className="living-experience mx-40 w-96 justify-self-end bg-gray-200 rounded-lg px-4 py-4 flex flex-col items-center justify-center"
          style={{ boxShadow: "5px 8px 8px 0px rgba(0, 0, 0, 0.5)" }}
        >
          <div className="bg-white rounded-full w-max p-4 shadow-lg">
            <GroupAddIcon
              style={{ color: "var(--primary-color)", fontSize: 70 }}
            />
          </div>
          <h1 className="text-xl font-medium mt-8 mb-4">Community Focused</h1>
          <p className="text-center">
            Join a vibrant community of students, share experiences, and make
            lifelong friends while enjoying your stay at our hostels.
          </p>
        </div>
      </div>
    </>
  );
}
