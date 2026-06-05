import React, { useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const departmentDesignations = {
  "Water Department": [
    "Water Inspector",
    "Pipeline Supervisor",
    "Pump Operator",
  ],

  "Electricity Department": [
    "Electrician",
    "Junior Engineer",
    "Line Technician",
  ],

  "Sanitation Department": [
    "Sanitation Supervisor",
    "Cleaner",
    "Waste Manager",
  ],

  "Road Department": ["Site Engineer", "Road Inspector", "Contract Supervisor"],

  "Traffic Department": [
    "Traffic Inspector",
    "Traffic Police Officer",
    "Signal Maintenance Technician",
  ],
};

function Addstaff() {
  const navigate = useNavigate();

  const [selectedDept, setSelectedDept] = useState("");

  function addStaff() {
    const staff_name = document.getElementById("staff_name").value;
    const staff_email = document.getElementById("staff_email").value;
    const staff_phone = document.getElementById("staff_phone").value;
    const staff_dept = document.getElementById("staff_dept").value;
    const staff_desig = document.getElementById("staff_desig").value;
    const status = document.getElementById("status").value;

    if (
      !staff_name ||
      !staff_email ||
      !staff_phone ||
      !staff_dept ||
      !staff_desig ||
      !status
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all required fields",
      });

      return;
    }

    Axios.post("http://localhost:1337/api/addstaff", {
      staff_name,
      staff_email,
      staff_phone,
      staff_dept,
      staff_desig,
      status,
    })
      .then((res) => {
        if (res.data.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Staff Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });

          document.getElementById("staff_name").value = "";
          document.getElementById("staff_email").value = "";
          document.getElementById("staff_phone").value = "";
          document.getElementById("staff_desig").value = "";
          document.getElementById("status").value = "1";

          setSelectedDept("");

          setTimeout(() => {
            navigate("/manage-staff");
          }, 1000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res.data.message,
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Something went wrong",
        });
      });
  }

  return (
    <div className="add-staff-container">
      <div className="add-staff-form">
        <div className="add-staff-header">
          <h2>Add Staff</h2>
        </div>

        <div className="staff-form-group">
          <label>Staff Name</label>

          <input
            type="text"
            id="staff_name"
            placeholder="Enter staff name"
            className="staff-form-control"
          />
        </div>

        <div className="staff-form-group">
          <label>Email</label>

          <input
            type="email"
            id="staff_email"
            placeholder="Enter email address"
            className="staff-form-control"
          />
        </div>

        <div className="staff-form-group">
          <label>Phone</label>

          <input
            type="number"
            id="staff_phone"
            placeholder="Enter phone number"
            className="staff-form-control"
          />
        </div>

        <div className="staff-form-group">
          <label>Department</label>

          <select
            id="staff_dept"
            className="staff-form-control"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value="">Select Department</option>

            <option value="Water Department">Water Department</option>

            <option value="Road Department">Road Department</option>

            <option value="Electricity Department">
              Electricity Department
            </option>

            <option value="Sanitation Department">Sanitation Department</option>

            <option value="Traffic Department">Traffic Department</option>
          </select>
        </div>

        <div className="staff-form-group">
          <label>Designation</label>

          <select
            id="staff_desig"
            className="staff-form-control"
            key={selectedDept}
          >
            <option value="">Select Designation</option>

            {(departmentDesignations[selectedDept] || []).map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="staff-form-group">
          <label>Status</label>

          <select id="status" className="staff-form-control">
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>

        <div className="department-btn-group">
          <button type="button" className="submit-btn" onClick={addStaff}>
            <i className="fas fa-plus"></i>
            Add
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/manage-staff")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addstaff;
