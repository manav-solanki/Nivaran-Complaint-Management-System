import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Header from "./components/header";
import Footer from "./components/footer";

import Login from "./pages/login";
import Forgotpassword from "./pages/forgotpassword";
import Signup from "./pages/signup";
import Userdashboard from "./pages/userdashboard";
import About from "./pages/about";
import Services from "./pages/services";
import Contact from "./pages/contact";
import Addcomplaint from "./pages/addcomplaint";
import Trackcomplaints from "./pages/trackcomplaint";
import Manageprofile from "./pages/manageprofile";
import UserNotifications from "./pages/usernotification";
import Editcomplaint from "./pages/editcomplaint";
import ResetPassword from "./pages/resetpassword";
import VerifyOtp from "./pages/verifyotp";

function Layout() {
  return (
    <>
      <Header />

      <div className="container-fluid p-0">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Userdashboard />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="add-complaint" element={<Addcomplaint />} />
          <Route path="track-complaint" element={<Trackcomplaints />} />
          <Route path="manage-profile" element={<Manageprofile />} />
          <Route path="user-notification" element={<UserNotifications />} />
          <Route path="edit-complaint" element={<Editcomplaint />} />

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;