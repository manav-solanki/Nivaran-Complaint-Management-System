import React from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Adddepartment() {
  const navigate = useNavigate();

  function addDepartment() {
    const department_name = document.getElementById("department_name").value;
    const department_head = document.getElementById("department_head").value;
    const total_staff = document.getElementById("total_staff").value;
    const status = document.getElementById("status").value;

    if (!department_name || !department_head || !total_staff || !status) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all required fields",
      });

      return;
    }

    Axios.post("http://localhost:1337/api/adddepartment", {
      department_name,
      department_head,
      total_staff,
      status,
    })

      .then((res) => {
        if (res.data.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Department Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });

          document.getElementById("department_name").value = "";
          document.getElementById("department_head").value = "";
          document.getElementById("total_staff").value = "";
          document.getElementById("status").value = "1";

          setTimeout(() => {
            navigate("/manage-department");
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
    <div className="add-department-container">
      <div className="add-department-card">
        <h2>Add Department</h2>

        <div className="form-group">
          <label>Department Name</label>

          <input
            type="text"
            id="department_name"
            placeholder="Enter department name"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Department Head</label>

          <input
            type="text"
            id="department_head"
            placeholder="Enter department head"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Total Staff</label>

          <input
            type="number"
            id="total_staff"
            placeholder="Enter total staff"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Status</label>

          <select id="status" className="form-control">
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>

        <div className="department-btn-group">
          <button className="submit-btn" onClick={addDepartment}>
            <i className="fas fa-plus"></i>
            Add
          </button>

          <button
            className="cancel-btn"
            onClick={() => navigate("/manage-department")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Adddepartment;
