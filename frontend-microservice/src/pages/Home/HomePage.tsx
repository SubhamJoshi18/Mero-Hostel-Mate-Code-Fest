import React from "react";
import { HeroSection } from "../../components/Hero Section/HeroSection";
import { Banner } from "../../components/Features/Banner";
import OurFeatures from "../../components/Features/OurFeatures";
import PopularHostel from "../../components/Extras/PopularHostel";
import { HowItWorks } from "../../components/Features/HowItWorks";
import FeedBacks from "../../components/Features/FeedBacks";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OurFeatures />
      <PopularHostel />
      <HowItWorks />
      <Banner />
      <FeedBacks />
    </>
  );
}
