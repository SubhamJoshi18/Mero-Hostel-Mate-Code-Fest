import React from "react";

export default function AssociatePartners() {
  return (
    <>
      <div className="flex flex-col items-center my-10">
        <div className="relative flex flex-col items-center justify-center ">
          <h1
            data-aos="fade-up"
            className="text-[110px] text-gray-200 font-mono font-semibold uppercase"
            style={{ fontFamily: "Oswald" }}
          >
            collaborations
          </h1>
          <h2
            data-aos="fade-up"
            className="absolute tracking-widest text-center text-xl top-[47%] text-[--primary-color] font-sans uppercase"
          >
            our associate partners
          </h2>
        </div>
        <div
          data-aos="fade-up"
          className="flex space-x-12 items-center justify-center"
        >
          <img
            src="/assets/logo1.png"
            alt="Partner 1"
            className="h-48 w-full hover:scale-110 transition-all"
          />
          <img
            src="/assets/logo2.png"
            alt="Partner 2"
            className="h-44 w-full hover:scale-110 transition-all"
          />
          <img
            src="/assets/logo3.png"
            alt="Partner 3"
            className="h-60 w-full hover:scale-110 transition-all"
          />
          <img
            src="/assets/logo4.png"
            alt="Partner 4"
            className="h-24 w-full hover:scale-110 transition-all"
          />
        </div>
      </div>
    </>
  );
}
