import RouteIcon from "@mui/icons-material/Route";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LuggageIcon from "@mui/icons-material/Luggage";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
export const HowItWorks = () => {
  return (
    <>
      <div className="how-it-works my-28 py-4 h-auto bg-gray-200 pb-32">
        <div className="relative flex flex-col items-center justify-center ">
          <h1
            data-aos="fade-up"
            className="text-[150px] text-white font-mono font-semibold"
            style={{ fontFamily: "Oswald" }}
          >
            PROCESS
          </h1>
          <h2
            data-aos="fade-up"
            className="absolute tracking-widest text-center text-xl top-[47%] text-[--primary-color] font-sans uppercase"
          >
            How It Works
          </h2>
        </div>
        <div className="process grid grid-rows-4 container mx-auto px-12 mt-12 gap-y-16">
          <div
            data-aos="fade-up"
            className="Hostel-planning w-96 mx-40 bg-white rounded-lg px-4 py-4 flex flex-col items-center justify-center"
            style={{ boxShadow: "5px 8px 8px 0px rgba(0, 0, 0, 0.5)" }}
          >
            <div className="bg-white rounded-full w-max p-4 shadow-lg">
              <RouteIcon
                style={{ color: "var(--primary-color)", fontSize: 70 }}
              />
            </div>
            <h1 className="text-xl  font-medium mt-8  text-[--primary-color] mb-4">
              Hostel Planning
            </h1>
            <p className="text-center">
              We help you find the best hostel near your campus that suits your
              preferences.
            </p>
          </div>
          <div
            data-aos="fade-up"
            className="Room-booking w-96 mx-40 justify-self-end  bg-white  rounded-lg px-4 py-4 flex flex-col items-center justify-center"
            style={{ boxShadow: "5px 8px 8px 0px rgba(0, 0, 0, 0.5)" }}
          >
            <div className="bg-white rounded-full w-max p-4 shadow-lg">
              <CalendarMonthIcon
                style={{ color: "var(--primary-color)", fontSize: 70 }}
              />
            </div>
            <h1 className="text-xl text-[--primary-color]  font-medium  mt-8 mb-4">
              Room Booking
            </h1>
            <p className="text-center">
              We handle all your hostel bookings, ensuring a smooth and
              hassle-free experience.
            </p>
          </div>
          <div
            data-aos="fade-up"
            className="stay-preparation mx-40 w-96  bg-white  rounded-lg px-4 py-4 flex flex-col items-center justify-center"
            style={{ boxShadow: "5px 8px 8px 0px rgba(0, 0, 0, 0.5)" }}
          >
            <div className="bg-white rounded-full w-max p-4 shadow-lg">
              <LuggageIcon
                style={{ color: "var(--primary-color)", fontSize: 70 }}
              />
            </div>
            <h1 className="text-xl text-[--primary-color] font-medium  mt-8 mb-4">
              Stay Preparation
            </h1>
            <p className="text-center">
              We take care of your accommodation details, from roommate matching
              to amenity preferences.
            </p>
          </div>
          <div
            data-aos="fade-up"
            className="living-experience mx-40 w-96 justify-self-end  bg-white  rounded-lg px-4 py-4 flex flex-col items-center justify-center"
            style={{ boxShadow: "5px 8px 8px 0px rgba(0, 0, 0, 0.5)" }}
          >
            <div className="bg-white rounded-full w-max p-4 shadow-lg">
              <DirectionsBusIcon
                style={{ color: "var(--primary-color)", fontSize: 70 }}
              />
            </div>
            <h1 className="text-xl text-[--primary-color] font-medium  mt-8 mb-4">
              Living Experience
            </h1>
            <p className="text-center">
              We provide you with the best hostel experience, offering comfort
              and a sense of community during your stay.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
