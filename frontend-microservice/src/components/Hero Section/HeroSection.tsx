import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  const handleSearchNavigate = () => {
    navigate("/search");
  };

  return (
    <div className="h-[100vh] w-full flex items-center flex-col justify-center overflow-hidden bg-[url(/assets/7.webp)] bg-no-repeat bg-center bg-cover relative">
      <div className="bg-black/35 absolute h-full w-full"></div>
      <div className="Hero-section mt-12 h-full container flex-col flex items-center justify-center mx-auto px-12 text-white leading-none z-10">
        <p className="uppercase text-lg tracking-widest">Discover Your Next</p>
        <h1
          className="text-[150px] font-extrabold uppercase tracking-wider"
          style={{ fontFamily: "Oswald" }}
        >
          Perfect Stay
        </h1>
        <p className="w-[700px] text-center leading-loose pb-16 mt-8">
          Experience comfort and convenience with our expertly curated hostel
          listings, designed to match students with their perfect living space.
        </p>

        {/* Search Button */}
        <button
          className=" text-md bg-[--btn-primary] py-4 px-5 rounded-xl text-white hover:bg-[--btn-secondary] transition-all active:translate-y-0.5"
          onClick={handleSearchNavigate}
        >
          Search Hostels
        </button>
      </div>
    </div>
  );
};
