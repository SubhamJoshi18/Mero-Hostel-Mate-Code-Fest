import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import XIcon from "@mui/icons-material/X";
import BottomBanner from "./BottomBanner";
import { Link, NavLink } from "react-router-dom";

export default function Footer() {
  const listStyle = "cursor-pointer hover:text-[--primary-color]";

  return (
    <>
      <div className=" bg-gray-200 md:px-24 px-8 pt-10">
        <div className="container mx-auto w-full">
          <div className="flex flex-wrap gap-8 items-center mb-10 ">
            {/* <h1 className="text-[40px] font-extrabold text-[--primary-color] border-r pr-16 mr-16 cursor-pointer">MHM</h1> */}
            <div className="logo">
              <NavLink to="/">
                <img
                  className="h-10 my-2 w-auto flex-shrink-0 mr-4"
                  src="/assets/mhmlogo_Black.png"
                  alt="mero hostel mate logo"
                />
              </NavLink>
            </div>
            <div className="">
              <h3 className="text-[28px] font-bold ">Subscription News</h3>
              <p className="text-[14px]">Subscribe to the weekly newslatter.</p>
            </div>
            <input
              className="px-6 py-3 outline-none w-[470px] rounded-full text-[16px]"
              type="email"
              placeholder="Enter Email Address"
            />
            <button className="bg-black text-white rounded-full lg:px-6 md:px-6 px-4 py-3">
              Subscribe
            </button>
          </div>
          <hr />
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-10 mt-10">
            <div>
              <p className="mb-3 text-[#3c3c3c]">
                Discover Your Ideal Hostel and Perfect Roommate with Mero Hostel
                Mate -{" "}
                <span className="italic font-semibold">
                  Where Comfort Meets Community!
                </span>
              </p>
              <h3 className="text-[18px] font-bold">Call for help</h3>
              <p className="mb-3 text-[--secondary-text] font-bold cursor-pointer">
                +1-555-157-5651
              </p>
            </div>
            <div>
              <h3 className="mb-3 font-bold text-[18px]">Quick Links</h3>
              <ul className="flex flex-col gap-1 text-[#3c3c3c]">
                <Link to={"/"}>
                  <li className={listStyle}>Home</li>
                </Link>
                <Link to={"/hostel"}>
                  <li className={listStyle}>Hostel</li>
                </Link>
                <Link to={"/about"}>
                  <li className={listStyle}>About</li>
                </Link>
                <Link to={"/contact"}>
                  <li className={listStyle}>Contact</li>
                </Link>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-bold text-[18px]">More</h3>
              <ul className="flex flex-col gap-1 text-[#3c3c3c]">
                <Link to={"/news"}>
                  <li className={listStyle}>News</li>
                </Link>
                <Link to={"/faqs"}>
                  <li className={listStyle}>FAQs</li>
                </Link>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-bold text-[18px]">Social Media Links</h3>
              <ul className="flex gap-3">
                <a href="#">
                  <FacebookOutlinedIcon style={{ color: "black" }} />
                </a>
                <a href="#">
                  <InstagramIcon style={{ color: "black" }} />
                </a>
                <a href="#">
                  <LinkedInIcon style={{ color: "black" }} />
                </a>
                <a href="#">
                  <XIcon style={{ color: "black" }} />
                </a>
              </ul>
            </div>
          </div>
        </div>
        <BottomBanner />
      </div>
    </>
  );
}
