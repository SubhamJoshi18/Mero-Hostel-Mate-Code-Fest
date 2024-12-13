export const Banner = () => {
  return (
    <>
      <div className="container mx-auto px-12">
        <div className="bg-[url(/assets/10.webp)] rounded-2xl bg-center bg-no-repeat bg-cover  my-28 flex flex-col">
          <div className="text-white rounded-2xl bg-gradient-to-r from-[--primary-color] container mx-auto px-12 py-16 leading-none">
            <p data-aos="fade-up" className="uppercase text-lg tracking-widest">
              Book your dream hostel
            </p>
            <h2
              data-aos="fade-up"
              className="uppercase text-[120px] font-bold"
              style={{ fontFamily: "Oswald" }}
            >
              today
            </h2>
            <p data-aos="fade-up" className="mt-8  mb-4 w-96 leading-6">
              Find your ideal hostel and roommate near your college for the
              perfect student experience!"
            </p>
            <button
              data-aos="fade-up"
              className="w-44 mb-8 text-xl bg-black py-4 rounded-xl font-medium text-white hover:bg-transparent hover:text-black border border-black transition-all active:translate-y-0.5"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
