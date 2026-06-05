import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

function Editstaff() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [staff_name, setStaffName] = useState("");
  const [staff_email, setStaffEmail] = useState("");
  const [staff_phone, setStaffPhone] = useState("");
  const [staff_dept, setStaffDept] = useState("");
  const [staff_desig, setStaffDesig] = useState("");
  const [status, setStatus] = useState("");

  // DESIGNATION DATA
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
    "Road Department": [
      "Site Engineer",
      "Road Inspector",
      "Contract Supervisor",
    ],
  };

  // GET SINGLE STAFF
  useEffect(() => {
    Axios.get(`http://localhost:1337/api/single-staff/${id}`)
      .then((res) => {
        const data = res.data.data;

        setStaffName(data.staff_name);
        setStaffEmail(data.staff_email);
        setStaffPhone(data.staff_phone);
        setStaffDept(data.staff_dept);
        setStaffDesig(data.staff_desig);
        setStatus(data.status);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Unable to fetch staff data",
        });
      });
  }, [id]);

  // UPDATE STAFF
  function updateStaff() {
    Axios.put(`http://localhost:1337/api/update-staff/${id}`, {
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
            title: "Updated",
            text: "Staff Updated Successfully",
            timer: 1000,
            showConfirmButton: false,
          });

          setTimeout(() => {
            navigate("/manage-staff");
          }, 1000);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong",
        });
      });
  }

  return (
    <div className="add-staff-container">
      <div className="add-staff-form">
        <div className="add-staff-header">
          <h2>
            <b>Edit Staff</b>
          </h2>
        </div>

        <div className="staff-form-group">
          <label>Staff Name</label>

          <input
            type="text"
            value={staff_name}
            placeholder="Enter staff name"
            onChange={(e) => setStaffName(e.target.value)}
            className="staff-form-control"
          />
        </div>

        <div className="staff-form-group">
          <label>Email</label>

          <input
            type="email"
            value={staff_email}
            placeholder="Enter email address"
            onChange={(e) => setStaffEmail(e.target.value)}
            className="staff-form-control"
          />
        </div>

        <div className="staff-form-group">
          <label>Phone</label>

          <input
            type="number"
            value={staff_phone}
            placeholder="Enter phone number"
            onChange={(e) => setStaffPhone(e.target.value)}
            className="staff-form-control"
          />
        </div>

        <div className="staff-form-group">
          <label>Department</label>

          <select
            value={staff_dept}
            onChange={(e) => {
              setStaffDept(e.target.value);
              setStaffDesig("");
            }}
            className="staff-form-control"
          >
            <option value="">Select Department</option>
            <option>Water Department</option>
            <option>Road Department</option>
            <option>Electricity Department</option>
            <option>Sanitation Department</option>
          </select>
        </div>

        <div className="staff-form-group">
          <label>Designation</label>

          <select
            value={staff_desig}
            onChange={(e) => setStaffDesig(e.target.value)}
            className="staff-form-control"
          >
            <option value="">Select Designation</option>

            {departmentDesignations[staff_dept]?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="staff-form-group">
          <label>Status</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="staff-form-control"
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>

        <div className="department-btn-group">
          <button type="button" className="submit-btn" onClick={updateStaff}>
            Update
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

export default Editstaff;
