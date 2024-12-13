import React, { useState } from "react";
import PrimaryButton from "../../components/Button/PrimaryButton";

export const SearchOption = () => {
  const [showDiv, setShowDiv] = useState("search1");

  const handleSearchClick = (searchType) => {
    setShowDiv(searchType);
  };
  return (
    <>
      <div className="flex space-x-4 justify-center mb-4">
        <div
          className={`text-lg font-medium cursor-pointer ${
            showDiv === "search1"
              ? "text-[--primary-color] border-b-2 border-b-[--primary-color]"
              : "text-white"
          }`}
          onClick={() => handleSearchClick("search1")}
        >
          <h3>By Preference</h3>
        </div>
        <div
          className={`text-lg font-medium cursor-pointer ${
            showDiv === "search2"
              ? "text-[--primary-color] border-b-2 border-b-[--primary-color]"
              : "text-white"
          }`}
          onClick={() => handleSearchClick("search2")}
        >
          <h3>By Nearby</h3>
        </div>
      </div>
      {showDiv === "search1" ? (
        <form action="#">
          <div className=" overflow-hidden">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <input
                  className="py-2 px-2 w-full outline-none text-gray-500 border rounded-md"
                  type="text"
                  placeholder="Enter Location"
                />
              </div>
              <div>
                <input
                  className="py-2 px-1 w-full outline-none text-gray-500 border rounded-md"
                  type="number"
                  placeholder="Price Range"
                />
              </div>
              <div>
                <select
                  name="gender"
                  className="py-2 px-2 outline-none border rounded-md text-gray-500 w-full"
                >
                  <option selected disabled hidden>
                    Gender
                  </option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Other</option>
                </select>
              </div>
              <div>
                <select
                  name="faculty"
                  className="py-2 px-2 outline-none border w-full rounded-md text-gray-500"
                >
                  <option disabled selected hidden>
                    Choose Your Faculty
                  </option>
                  <option value="1">IT</option>
                  <option value="2">SCIENCE</option>
                  <option value="3">MANAGEMENT</option>
                  <option value="4">LAW</option>
                  <option value="5">ENGINEERING</option>
                  <option value="6">OPTIONAL</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 items-center pt-4">
              <div className="col-span-9">
                <input
                  type="text"
                  className="py-2 px-2 w-full outline-none text-gray-500 rounded-lg shadow placeholder-gray-400"
                  placeholder="Enter College Name (Optional)"
                />
              </div>
              <div className="col-span-3">
                <PrimaryButton
                  title={"Submit"}
                  className="py-3 w-full text-white bg-[--btn-primary] px-6 hover:bg-[--btn-secondary] rounded-lg shadow-md transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="text-center  text-gray-500">
          {/* Content for "By Nearby" */}
          <h2 className="text-2xl font-semibold">Search By Nearby</h2>
          <p className="mt-2">Coming soon! Stay tuned for updates.</p>
        </div>
      )}
    </>
  );
};
