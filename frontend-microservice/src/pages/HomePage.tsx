import React from "react";
import { HeroSection } from "../components/Hero Section/HeroSection";
import OurFeatures from "../components/Features/OurFeatures";
import PopularHostel from "./PopularHostel";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PopularHostel />
      <OurFeatures />
    </>
  );
}
