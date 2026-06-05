import React, { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Managestaff() {
  const [staff, setStaff] = useState([]);

  // filters
  const [deptFilter, setDeptFilter] = useState("");
  const [designationFilter, setDesignationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [emptyShown, setEmptyShown] = useState(false);

  // FILTERED DATA 
  const filteredData = staff.filter((item) => {
    return (
      item.staff_dept
        ?.toLowerCase()
        .includes(deptFilter.toLowerCase()) &&
      item.staff_desig
        ?.toLowerCase()
        .includes(designationFilter.toLowerCase()) &&
      (statusFilter === ""
        ? true
        : statusFilter === "1"
        ? String(item.status) === "1"
        : String(item.status) === "0")
    );
  });

  // GET ALL STAFF
  const getStaff = useCallback(() => {
    Axios.get("http://localhost:1337/api/managestaff")
      .then((res) => {
        if (res.data.status === "success") {
          const data = res.data.data;
          setStaff(data);

          if (data.length === 0) {
            setStaff([]);

            if (!emptyShown) {
              Swal.fire({
                icon: "info",
                title: "No Staff Found",
                text: "Please add staff first",
                confirmButtonColor: "#2563eb",
              });

              setEmptyShown(true);
            }

            return;
          } else {
            setEmptyShown(false);
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
  }, [emptyShown]);

  // DELETE STAFF
  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this staff",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const res = await Axios.delete(
          `http://localhost:1337/api/delete-staff/${id}`
        );

        if (res.data.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Staff deleted successfully",
            timer: 1500,
            showConfirmButton: false,
          });

          setTimeout(() => {
            getStaff();
          }, 800);
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
    getStaff();
  }, [getStaff]);

  return (
    <div className="manage-staff-container">
      <div className="manage-staff-header">
        <h2>
          <b>Manage Staff</b>
        </h2>

        <Link to="/add-staff">
          <button className="add-staff-btn">
            <i className="fas fa-plus"></i> Add Staff
          </button>
        </Link>
      </div>

      <div className="manage-staff-table-container">
        <table className="manage-staff-table">
          <thead>
            <tr>
              <th>#</th>
              <th>
                Staff Name
              </th>
              <th>
                Email
              </th>
              <th>
                Phone
              </th>

              <th>
                Department Name
                <input
                  className="table-filter"
                  placeholder="Search department"
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                />
              </th>

              <th>
                Designation
                <input
                  className="table-filter"
                  placeholder="Search designation"
                  value={designationFilter}
                  onChange={(e) =>
                    setDesignationFilter(e.target.value)
                  }
                />
              </th>

              <th>
                Status
                <select
                  className="table-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.staff_name}</td>
                <td>{item.staff_email}</td>
                <td>{item.staff_phone}</td>
                <td>{item.staff_dept}</td>
                <td>{item.staff_desig}</td>

                <td>
                  {item.status === 1 || item.status === "1" ? (
                    <span className="active-status">Active</span>
                  ) : (
                    <span className="inactive-status">Inactive</span>
                  )}
                </td>

                <td>
                  <Link to={`/edit-staff/${item.id}`}>
                    <button className="staff-edit-btn">
                      <i className="fas fa-edit"></i>
                    </button>
                  </Link>

                  <button
                    className="staff-delete-btn"
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

export default Managestaff;