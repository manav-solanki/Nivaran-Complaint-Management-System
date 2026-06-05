import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Layout";

import Dashboard from "./pages/dashboard";
import Viewcomplaints from "./pages/viewcomplaints";
import Assignpriority from "./pages/assignpriority";
import Complainanalysis from "./pages/complainanalysis";
import Manageuser from "./pages/manageuser";
import Login from "./pages/login";
import Forgotpassword from "./pages/forgotpassword";
import Notification from "./pages/notification";
import Managedepartment from "./pages/managedepartment";
import Managestaff from "./pages/managestaff";
import Adddepartment from "./pages/adddepartment";
import Editdepartment from "./pages/editdepartment";
import Addstaff from "./pages/addstaff";
import Editstaff from "./pages/editstaff";
import Complaintreport from "./pages/complaintreport";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />

        {/* MAIN APP LAYOUT */}
        <Route path="/" element={<Layout />}>
          <Route path="dash" element={<Dashboard />} />
          <Route path="viewcomplaints" element={<Viewcomplaints />} />
          <Route path="assignpriority" element={<Assignpriority />} />
          <Route path="complaints-analysis" element={<Complainanalysis />} />
          <Route path="manage-user" element={<Manageuser />} />
          <Route path="notification" element={<Notification />} />
          <Route path="manage-department" element={<Managedepartment />} />
          <Route path="add-department" element={<Adddepartment />} />
          <Route path="edit-department/:id" element={<Editdepartment />} />
          <Route path="manage-staff" element={<Managestaff />} />
          <Route path="add-staff" element={<Addstaff />} />
          <Route path="edit-staff/:id" element={<Editstaff />} />
          <Route path="/complaintreport" element={<Complaintreport />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/dash" />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;