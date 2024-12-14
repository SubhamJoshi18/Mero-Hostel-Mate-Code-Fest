import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import About from "../pages/About/About";
import HomePage from "../pages/Home/HomePage";
import { Navbar } from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Login from "../pages/Logins/Login";
import AllHostels from "../components/Extras/AllHostels";
import { Contact } from "../pages/Contacts/Contact";
import LoginAdmin from "../pages/Logins/LoginAdmin";
import UserDashboard from "../pages/Dashboards/UserDashboard/UserDashboard";
import HostelDetails from "../pages/Hostels/HostelDetails";
import DashBoard from "../pages/Dashboards/AdminDashboard/Dashboard";
import AdminDashBoard from "../pages/Dashboards/AdminDashboard/AdminDashboard";
import RegisterUser from "../pages/Dashboards/AdminDashboard/RegisterUser";
import Attendance from "../pages/Dashboards/AdminDashboard/Attendance";
import PendingBooking from "../pages/Dashboards/AdminDashboard/PendingBooking";
import HostelerList from "../pages/Dashboards/AdminDashboard/HostelerList";
import HostelRegistrationForm from "../pages/Dashboards/AdminDashboard/RegisterHostel";
import UserProfile from "../pages/Dashboards/UserDashboard/UserProfile";
import { RequestLeave } from "../pages/Dashboards/UserDashboard/RequestLeave";
import MyDocuments from "../pages/Dashboards/UserDashboard/MyDocuments";
import UserAttendanceHistory from "../pages/Dashboards/UserDashboard/UserAttendanceHistory";
import { News } from "../pages/Miscalleneous/News";
import { FAQs } from "../pages/Miscalleneous/FAQs";
import { PrivacyPolicy } from "../pages/Miscalleneous/PrivacyPolicy";
import { TermsAndCondition } from "../pages/Miscalleneous/TermsAndCondition";
import HostelsMarket from "../pages/Dashboards/UserDashboard/HostelsMarket";
import { UserSetting } from "../pages/Dashboards/UserDashboard/UserSetting";
import { SearchBox } from "../pages/Miscalleneous/SearchBox";

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
          path="/login-user"
          element={<Login onClose={() => console.log("Login closed")} />}
        />
        <Route
          path="/login-admin"
          element={<LoginAdmin onClose={() => console.log("Login closed")} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/hostel" element={<AllHostels />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/dashboard-user"
          element={<UserDashboard children={<UserProfile />} />}
        />
        <Route
          path="/dashboard-user/requestleave"
          element={<UserDashboard children={<RequestLeave />} />}
        />
        <Route
          path="/dashboard-user/mydocuments"
          element={<UserDashboard children={<MyDocuments />} />}
        />
        <Route
          path="/dashboard-user/userattendancehistory"
          element={<UserDashboard children={<UserAttendanceHistory />} />}
        />
        <Route
          path="/dashboard-user/hostelsmarket"
          element={<UserDashboard children={<HostelsMarket />} />}
        />
        <Route
          path="/dashboard-user/userSettings"
          element={<UserDashboard children={<UserSetting />} />}
        />
        <Route path="/hostel/:place_id" element={<HostelDetails />} />
        // Admin Dashboard Routes
        <Route
          path="/dashboard-admin"
          element={<AdminDashBoard children={<DashBoard />} />}
        />
        <Route
          path="/dashboard-admin/registeruser"
          element={<AdminDashBoard children={<RegisterUser />} />}
        />
        <Route
          path="/dashboard-admin/attendance"
          element={<AdminDashBoard children={<Attendance />} />}
        />
        <Route
          path="/dashboard-admin/pendingbooking"
          element={<AdminDashBoard children={<PendingBooking />} />}
        />
        <Route
          path="/dashboard-admin/hostelerlist"
          element={<AdminDashBoard children={<HostelerList />} />}
        />
        <Route
          path="/dashboard-admin/hostelregister"
          element={<AdminDashBoard children={<HostelRegistrationForm />} />}
        />
        <Route path="/news" element={<News />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/search" element={<SearchBox />}/>
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/termsandcondition" element={<TermsAndCondition />} />
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
