import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

function Viewcomplaints() {

  const [list, setList] = useState([]);

  const [departments, setDepartments] = useState([]);

  const [staffList, setStaffList] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [zoom, setZoom] = useState(1);

  const [categoryFilter, setCategoryFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [priorityFilter, setPriorityFilter] = useState("");

  const [dateFilter, setDateFilter] = useState("");

  // FETCH DATA
  useEffect(() => {
    Axios.get("http://localhost:1337/api/getcomplaint")
      .then((response) => {
        const formatted = response.data.map((item) => ({
          ...item,
          status: Number(item.status),
          priority: Number(item.priority),
        }));

        setList(formatted);
      })
      .catch((error) => {
        console.error(error);
      });

    // FETCH DEPARTMENTS
    Axios.get("http://localhost:1337/api/managedepartment").then((res) => {
      if (res.data.status === "success") {
        setDepartments(res.data.data);
      }
    });

    // FETCH STAFF
    Axios.get("http://localhost:1337/api/managestaff").then((res) => {
      if (res.data.status === "success") {
        setStaffList(res.data.data);
      }
    });
  }, []);

  // ESC CLOSE
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // STATUS UPDATE
  const updateStatus = (id, newStatus, oldStatus) => {
    if (newStatus === oldStatus) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You want to change complaint status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.put(`http://localhost:1337/api/update-complaint-status/${id}`, {
          status: newStatus,
        })

          .then((res) => {
            if (res.data.status === "success") {
              setList((prev) =>
                prev.map((item) =>
                  item.complaint_id === id
                    ? {
                        ...item,
                        status: newStatus,
                      }
                    : item,
                ),
              );

              Swal.fire({
                icon: "success",
                title: "Updated!",
                text: "Complaint status updated successfully",
                timer: 1200,
                showConfirmButton: false,
              });
            } else {
              throw new Error();
            }
          })

          .catch(() => {
            Swal.fire("Error", "Update failed", "error");

            setList((prev) =>
              prev.map((item) =>
                item.complaint_id === id
                  ? {
                      ...item,
                      status: oldStatus,
                    }
                  : item,
              ),
            );
          });
      } else {
        setList((prev) =>
          prev.map((item) =>
            item.complaint_id === id
              ? {
                  ...item,
                  status: oldStatus,
                }
              : item,
          ),
        );
      }
    });
  };

  // PRIORITY UPDATE
  const updatePriority = (id, newPriority, oldPriority) => {
    if (newPriority === oldPriority) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You want to change priority?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.put(`http://localhost:1337/api/update-complaint-priority/${id}`, {
          priority: newPriority,
        })

          .then((res) => {
            if (res.data.status === "success") {
              setList((prev) =>
                prev.map((item) =>
                  item.complaint_id === id
                    ? {
                        ...item,
                        priority: newPriority,
                      }
                    : item,
                ),
              );

              Swal.fire({
                icon: "success",
                title: "Updated!",
                text: "Priority updated successfully",
                timer: 1200,
                showConfirmButton: false,
              });
            } else {
              throw new Error();
            }
          })

          .catch(() => {
            Swal.fire("Error", "Update failed", "error");

            setList((prev) =>
              prev.map((item) =>
                item.complaint_id === id
                  ? {
                      ...item,
                      priority: oldPriority,
                    }
                  : item,
              ),
            );
          });
      } else {
        setList((prev) =>
          prev.map((item) =>
            item.complaint_id === id
              ? {
                  ...item,
                  priority: oldPriority,
                }
              : item,
          ),
        );
      }
    });
  };

  // ALLOCATE DEPARTMENT
  const allocateDepartment = (id, department) => {
    Axios.put(`http://localhost:1337/api/allocate-department/${id}`, {
      allocated_department: department,
    }).then(() => {
      setList((prev) =>
        prev.map((item) =>
          item.complaint_id === id
            ? {
                ...item,
                allocated_department: department,
                allocated_staff: "",
              }
            : item,
        ),
      );
    });
  };

  // ALLOCATE STAFF
  const allocateStaff = (id, staff) => {
    Axios.put(`http://localhost:1337/api/allocate-staff/${id}`, {
      allocated_staff: staff,
    }).then(() => {
      setList((prev) =>
        prev.map((item) =>
          item.complaint_id === id
            ? {
                ...item,
                allocated_staff: staff,
              }
            : item,
        ),
      );
    });
  };

  // NEXT MEDIA
  const nextImage = () => {
    const newIndex = (currentIndex + 1) % list.length;

    setCurrentIndex(newIndex);

    setSelectedImage("http://localhost:1337/uploads/" + list[newIndex].image);

    setZoom(1);
  };

  // PREVIOUS MEDIA
  const prevImage = () => {
    const newIndex = (currentIndex - 1 + list.length) % list.length;

    setCurrentIndex(newIndex);

    setSelectedImage("http://localhost:1337/uploads/" + list[newIndex].image);

    setZoom(1);
  };

  // ZOOM
  const handleScrollZoom = (e) => {
    e.preventDefault();

    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(prev + 0.2, 3));
    } else {
      setZoom((prev) => Math.max(prev - 0.2, 1));
    }
  };




  return (
    <>
      <div
        className="content-wrapper complaints-page"
        style={{ paddingTop: "50px" }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight:"400",
          }}
        >
          <b>Manage Complaints</b>
        </h2>

        <div className="table-wrapper">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr style={{ textAlign: "center" }}>
                  <th>#</th>

                  <th>Name</th>

                  <th>Title</th>

                  <th>Description</th>

                  <th>Address</th>

                  <th>
                    <div>Category</div>

                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="">All</option>

                      <option value="Water">Water</option>

                      <option value="Road">Road</option>

                      <option value="Electricity">Electricity</option>

                      <option value="Sanitation">Sanitation</option>

                      <option value="Traffic">Traffic</option>
                    </select>
                  </th>

                  <th>
                    <div>Status</div>

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">All</option>

                      <option value="0">Pending</option>

                      <option value="1">In Progress</option>

                      <option value="2">Resolved</option>
                    </select>
                  </th>

                  <th>
                    <div>Priority</div>

                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                    >
                      <option value="">All</option>

                      <option value="0">Low</option>

                      <option value="1">Medium</option>

                      <option value="2">High</option>
                    </select>
                  </th>

                  <th>Department</th>

                  <th>Staff</th>

                  <th>
                    <div>Date</div>

                    <input
                      type="date"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                    />
                  </th>

                  <th>Media</th>
                  
                </tr>
              </thead>

              <tbody>
                {list
                  .filter((Val) => {
                    const categoryMatch =
                      categoryFilter === "" || Val.category === categoryFilter;

                    const statusMatch =
                      statusFilter === "" ||
                      String(Val.status) === statusFilter;

                    const priorityMatch =
                      priorityFilter === "" ||
                      String(Val.priority) === priorityFilter;

                    const dateMatch =
                      dateFilter === "" ||
                      new Date(Val.created).toISOString().split("T")[0] ===
                        dateFilter;

                    return (
                      categoryMatch && statusMatch && priorityMatch && dateMatch
                    );
                  })

                  .map((Val, index) => (
                    <tr key={Val.complaint_id}>
                      <td>{index + 1}</td>

                      <td>{Val.name}</td>

                      <td>{Val.title}</td>

                      <td>{Val.description}</td>

                      <td>{Val.address}</td>

                      <td>{Val.category}</td>

                      <td>
                        <select
                          value={Val.status}
                          onChange={(e) =>
                            updateStatus(
                              Val.complaint_id,
                              Number(e.target.value),
                              Val.status,
                            )
                          }
                        >
                          <option value={0}>Pending</option>

                          <option value={1}>In Progress</option>

                          <option value={2}>Resolved</option>
                        </select>
                      </td>

                      <td>
                        <select
                          value={Val.priority}
                          onChange={(e) =>
                            updatePriority(
                              Val.complaint_id,
                              Number(e.target.value),
                              Val.priority,
                            )
                          }
                        >
                          <option value={0}>Low</option>

                          <option value={1}>Medium</option>

                          <option value={2}>High</option>
                        </select>
                      </td>

                      <td>
                        <select
                          value={Val.allocated_department || ""}
                          onChange={(e) =>
                            allocateDepartment(Val.complaint_id, e.target.value)
                          }
                        >
                          <option value="">Select</option>

                          {departments.map((dept) => (
                            <option key={dept.id} value={dept.department_name}>
                              {dept.department_name}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td>
                        <select
                          value={Val.allocated_staff || ""}
                          onChange={(e) =>
                            allocateStaff(Val.complaint_id, e.target.value)
                          }
                        >
                          <option value="">Select</option>

                          {staffList
                            .filter(
                              (staff) =>
                                staff.staff_dept === Val.allocated_department,
                            )
                            .map((staff) => (
                              <option key={staff.id} value={staff.staff_name}>
                                {staff.staff_name}
                              </option>
                            ))}
                        </select>
                      </td>

                      <td>
                        {new Date(Val.created).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>

                      <td>
                        {Val.image && Val.image.match(/\.(mp4|webm|ogg)$/i) ? (
                          <video controls className="complaint-video">
                            <source
                              src={"http://localhost:1337/uploads/" + Val.image}
                            />
                          </video>
                        ) : (
                          <img
                            src={"http://localhost:1337/uploads/" + Val.image}
                            alt=""
                            onClick={() => {
                              setSelectedImage(
                                "http://localhost:1337/uploads/" + Val.image,
                              );

                              setCurrentIndex(index);

                              setZoom(1);
                            }}
                          />
                        )}
                      </td>

                    
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="image-modal" onWheel={handleScrollZoom}>
          {/* BACK BUTTON */}
          <button
            className="back-btn"
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: "9999",
            }}
          >
            ⬅ Back
          </button>

          <span className="nav-btn left" onClick={prevImage}>
            ⬅
          </span>

          {selectedImage.match(/\.(mp4|webm|ogg)$/i) ? (
            <video
              controls
              autoPlay
              className="image-modal-content"
              style={{
                transform: `scale(${zoom})`,
                maxWidth: "80%",
                position: "relative",
                zIndex: "1",
              }}
            >
              <source src={selectedImage} />
            </video>
          ) : (
            <img
              src={selectedImage}
              alt="large"
              className="image-modal-content"
              style={{
                transform: `scale(${zoom})`,
                maxWidth: "80%",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
            />
          )}

          <span className="nav-btn right" onClick={nextImage}>
            ➡
          </span>
        </div>
      )}
    </>
  );
}

export default Viewcomplaints;
