import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import About from '../pages/About/About';
import HomePage from '../pages/Home/HomePage';
import { Navbar } from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Login from '../pages/Logins/Login';
import AllHostels from '../components/Extras/AllHostels';
import { Contact } from '../pages/Contacts/Contact';
import LoginAdmin from '../pages/Logins/LoginAdmin';
import UserDashboard from '../pages/Dashboards/UserDashboard/UserDashboard';
import OwnerDashboard from '../pages/Dashboards/AdminDashboard/AdminDashboard';
import HostelDetails from '../pages/Hostels/HostelDetails';
import DashBoard from '../pages/Dashboards/AdminDashboard/Dashboard';
import AdminDashBoard from '../pages/Dashboards/AdminDashboard/AdminDashboard';
import RegisterUser from '../pages/Dashboards/AdminDashboard/RegisterUser';
import Attendance from '../pages/Dashboards/AdminDashboard/Attendance';
import PendingBooking from '../pages/Dashboards/AdminDashboard/PendingBooking';
import HostelerList from '../pages/Dashboards/AdminDashboard/HostelerList';

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
        <Route path="/dashboard-user" element={<UserDashboard />} />
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
