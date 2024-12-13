import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import About from "../pages/About";
import HomePage from "../pages/HomePage";
import { Navbar } from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Login from "../pages/Login";
import AllHostels from "../components/Extras/AllHostels";
import { Contact } from "../pages/Contact";

export default function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    };

    handleScroll();

    const timer = setTimeout(handleScroll, 100);

    return () => clearTimeout(timer);
  }, [location]);

  const noNavbarFooterRoutes = ["/dashboard", "/dashboard/*"];

  const hideNavbarFooter = noNavbarFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<Login onClose={() => console.log("Login closed")} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/hostel" element={<AllHostels />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/allhostel" element={<AllHostels />} /> */}
        {/* <Route path="/hostel/:hostelId" element={<HostelDetails />} /> */}
        {/* <Route path="/news" element={<News />} />
        <Route path="/reviewpage" element={<ReviewPage />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
        <Route path="/termsandcondition" element={<TermsAndCondition />} /> */}

        {/* Main route for the dashboard */}
        {/* <Route path="/dashboard/*" element={<AuthDashboard />} /> */}

        {/* <Route path="/privacypolicy" element={<PrivacyPolicy />} /> */}
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}
