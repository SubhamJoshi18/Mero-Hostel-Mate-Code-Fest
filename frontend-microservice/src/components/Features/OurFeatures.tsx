import React, { useState } from "react";
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";

export default function OurFeatures() {
  // const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const featureList = [
    {
      icon: <TagFacesOutlinedIcon />,
      title: "Customer Delight",
      description:
        "We deliver the best service and experience for our customers",
    },
    {
      icon: <GppGoodOutlinedIcon />,
      title: "Authentic Hostel Experience",
      description: "Genuine hostel stays tailored to student needs",
    },
    {
      icon: <HomeOutlinedIcon />,
      title: "Trusted Hostel Listings",
      description: "Only verified, reliable hostels near you",
    },
    {
      icon: <PersonOutlineOutlinedIcon />,
      title: "Perfect Roommate Match",
      description: "We match you with your ideal roommate.",
    },
  ];

  return (
    <div className="h-auto pt-32 pb-16">
      <div className="container mx-auto px-12">
        <div className="grid grid-cols-4 gap-4">
          {featureList.map((feature, index) => (
            <div
              data-aos="fade-up"
              key={index}
              className="feature-item text-center py-4"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="feature-icon mb-8 transition duration-300 ease-in-out transform">
                {React.cloneElement(feature.icon, {
                  style: {
                    background:
                      hoveredIndex === index
                        ? "var(--primary-color)"
                        : "#D1D5DB",
                    color: "white",
                    fontSize: "90px",
                    borderRadius: "15px",
                    padding: "12px",
                    cursor: "pointer",
                    transform:
                      hoveredIndex === index
                        ? "translateY(-4px)"
                        : "translateY(0)",
                    transition:
                      "transform 0.3s ease-in-out, background 0.3s ease-in-out",
                  },
                })}
              </div>
              <h3 className="feature-title text-[20px] font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
