import { useNavigate } from "react-router-dom";
import PrimaryButton from "../Button/PrimaryButton";
import { SearchOption } from "../../pages/Miscalleneous/SearchOption";

export const HeroSection = () => {
  const navigate = useNavigate();

  const handleSearchNavigate = () => {
    navigate("/searchOption");
  };

  return (
    <div className="h-[100vh] w-full flex  flex-col justify-center overflow-hidden bg-[url(/assets/7.webp)] bg-no-repeat bg-center bg-cover relative">
      <div className="bg-black/35 absolute h-full w-full"></div>
      <div className="Hero-section pt-16  h-full container flex-col flex items-center justify-center mx-auto  text-white leading-none z-10">
        <p className="uppercase text-lg tracking-widest">Discover Your Next</p>
        <h1
          className="text-[150px] font-extrabold uppercase tracking-wider"
          style={{ fontFamily: "Oswald" }}
        >
          Perfect Stay
        </h1>
        <p className="w-[700px] text-center leading-loose pb-8 mt-8">
          Experience comfort and convenience with our expertly curated hostel
          listings, designed to match students with their perfect living space.
        </p>

        {/* Search Button */}
        {/* <div className="shadow-2xl">
          <PrimaryButton
            title={"Search Hostels"}
            className=" text-2xl z-30 bg-[--btn-primary] py-4 px-10 rounded-xl text-white hover:bg-[--btn-secondary] transition-all active:translate-y-0.5"
            onClick={handleSearchNavigate}
          />
        </div> */}
        <div className="bg-[#041E42] p-4 w-[75%] h-[29%] rounded-2xl shadow-2xl">
          <SearchOption />
        </div>
      </div>
    </div>
  );
};
