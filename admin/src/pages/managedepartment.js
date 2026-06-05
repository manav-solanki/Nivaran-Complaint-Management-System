import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Managedepartment() {
  const [department, setDepartment] = useState([]);

  // ✅ STAFF STATE
  const [staff, setStaff] = useState([]);

  // GET ALL DEPARTMENTS
  function getDepartment() {
    Axios.get("http://localhost:1337/api/managedepartment")
      .then((res) => {
        if (res.data.status === "success") {
          setDepartment(res.data.data);

          // ✅ GET STAFF DATA
          Axios.get("http://localhost:1337/api/managestaff")
            .then((staffRes) => {
              if (staffRes.data.status === "success") {
                setStaff(staffRes.data.data || []);
              }
            });

          // IF NO DATA
          if (res.data.data.length === 0) {
            Swal.fire({
              icon: "info",
              title: "No Department Found",
              text: "Please add department first",
              confirmButtonColor: "#2563eb",
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Unable to connect server",
        });
      });
  }

  // DELETE DEPARTMENT
  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this department",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const res = await Axios.delete(
          `http://localhost:1337/api/delete-department/${id}`,
        );

        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Deleted",
            text: res.data.message,
            timer: 1500,
            showConfirmButton: false,
          });

          getDepartment();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: "Something went wrong",
        });
      }
    }
  };

  useEffect(() => {
    getDepartment();
  }, []);

  return (
    <div className="department-container">
      <div className="department-header">
        <h2>
          <b>Manage Department</b>
        </h2>

        <Link to="/add-department">
          <button className="add-btn">
            <i className="fas fa-plus"></i> Add Department
          </button>
        </Link>
      </div>

      <div className="table-container">
        <table className="department-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Department Name</th>
              <th>Department Head</th>
              <th>Total Staff</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {department.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>

                <td>{item.department_name}</td>

                <td>{item.department_head}</td>

                {/* ✅ DYNAMIC STAFF COUNT */}
                <td>
                  {
                    staff.filter(
                      (s) =>
                        s.staff_dept?.toLowerCase() ===
                        item.department_name?.toLowerCase()
                    ).length
                  }
                </td>

                <td>
                  {item.status === 1 ? (
                    <span className="active-status">Active</span>
                  ) : (
                    <span className="inactive-status">Inactive</span>
                  )}
                </td>

                <td>
                  <Link to={`/edit-department/${item.id}`}>
                    <button className="edit-btn">
                      <i className="fas fa-edit"></i>
                    </button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Managedepartment;