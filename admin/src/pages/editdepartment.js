import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

function Editdepartment() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [department_name, setDepartmentName] = useState("");
  const [department_head, setDepartmentHead] = useState("");
  const [total_staff, setTotalStaff] = useState("");
  const [status, setStatus] = useState("");

  // GET SINGLE DEPARTMENT
  useEffect(() => {
    Axios.get(`http://localhost:1337/api/single-department/${id}`).then(
      (res) => {
        const data = res.data.data;

        setDepartmentName(data.department_name);
        setDepartmentHead(data.department_head);
        setTotalStaff(data.total_staff);
        setStatus(data.status);
      },
    );
  }, [id]);

  // UPDATE DEPARTMENT
  function updateDepartment() {
    Axios.put(`http://localhost:1337/api/update-department/${id}`, {
      department_name,
      department_head,
      total_staff,
      status,
    })

      .then((res) => {
        if (res.data.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Updated",
            text: "Department Updated Successfully",
            timer: 1000,
            showConfirmButton: false,
          });

          setTimeout(() => {
            navigate("/manage-department");
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
    <div className="add-department-container">
      <div className="add-department-card">
        <h2>Edit Department</h2>

        <div className="form-group">
          <label>Department Name</label>

          <input
            type="text"
            value={department_name}
            onChange={(e) => setDepartmentName(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Department Head</label>

          <input
            type="text"
            value={department_head}
            onChange={(e) => setDepartmentHead(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Total Staff</label>

          <input
            type="number"
            value={total_staff}
            onChange={(e) => setTotalStaff(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Status</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-control"
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>

        <div className="department-btn-group">
          <button className="submit-btn" onClick={updateDepartment}>
            Update
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

export default Editdepartment;
