import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

function Trackcomplaints() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);

  const [zoom, setZoom] = useState(1);

  // FETCH DATA
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("mydata"));

    if (!userData) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Please login first",
      }).then(() => {
        window.location = "/";
      });

      return;
    }

    Axios.get(`http://localhost:1337/api/view-complaints/${userData?.user_id}`)

      .then((res) => {
        const data = res.data.data || res.data;

        if (!data || data.length === 0) {
          Swal.fire({
            icon: "info",
            title: "No Complaints",
            text: "No complaints found",
          });
        }

        const formatted = data.map((item) => ({
          ...item,
          status: Number(item.status),
          priority: item.priority,
        }));

        setComplaints(formatted);
      })

      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Unable to fetch complaints",
        });

        console.log(err);
      });
  }, []);

  // STATUS
  const getStatus = (status) => {
    switch (Number(status)) {
      case 0:
        return {
          text: "Pending",
          class: "pending",
        };

      case 1:
        return {
          text: "In Progress",
          class: "progress",
        };

      case 2:
        return {
          text: "Resolved",
          class: "resolved",
        };

      default:
        return {
          text: "Unknown",
          class: "unknown",
        };
    }
  };

  // PRIORITY
  const getPriority = (priority) => {
    if (priority === 0 || priority === "0" || priority === "Low") {
      return {
        text: "Low",
        class: "low",
      };
    }

    if (priority === 1 || priority === "1" || priority === "Medium") {
      return {
        text: "Medium",
        class: "medium",
      };
    }

    if (priority === 2 || priority === "2" || priority === "High") {
      return {
        text: "High",
        class: "high",
      };
    }

    return {
      text: "Unknown",
      class: "unknown",
    };
  };

  // IMAGE ZOOM
  const handleScrollZoom = (e) => {
    e.preventDefault();

    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(prev + 0.2, 3));
    } else {
      setZoom((prev) => Math.max(prev - 0.2, 1));
    }
  };

  // EDIT COMPLAINT
  const handleEdit = (complaint) => {
    navigate("/dashboard/edit-complaint", {
      state: complaint,
    });
  };

  // DELETE COMPLAINT
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This complaint will be deleted permanently",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:1337/api/delete-complaint/${id}`)

          .then((res) => {
            if (res.data.status === "success") {
              setComplaints((prev) =>
                prev.filter((item) => item.complaint_id !== id),
              );

              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Complaint deleted successfully",
                timer: 1200,
                showConfirmButton: false,
              });
            }
          })

          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Delete failed",
            });
          });
      }
    });
  };

  return (
    <>
      <div className="track-page">
        <div className="page-header">
          <h2>Track Complaints</h2>

          <p className="para">Check status of your submitted complaints</p>
        </div>

        <div className="track-card">
          <table className="track-table">
            <thead>
              <tr>
                <th>#</th>

                <th>Title</th>

                <th>Description</th>

                <th>Category</th>

                <th>Address</th>

                <th>Status</th>

                <th>Priority</th>

                <th>Allocated Department</th>

                <th>Allocated Staff</th>

                <th>Date</th>

                <th>Media</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((c, index) => (
                <tr key={c.complaint_id}>
                  <td>{index + 1}</td>

                  <td>{c.title}</td>

                  <td>{c.description}</td>

                  <td>{c.category}</td>

                  <td>{c.address}</td>

                  {/* STATUS */}
                  <td>
                    <span className={`status ${getStatus(c.status).class}`}>
                      {getStatus(c.status).text}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`priority ${getPriority(c.priority).class}`}
                    >
                      {getPriority(c.priority).text}
                    </span>
                  </td>

                  <td>
                    {c.allocated_department ? (
                      <span className="allocated-dept">
                        {c.allocated_department}
                      </span>
                    ) : (
                      <span className="not-allocated">Not Allocated</span>
                    )}
                  </td>

                  <td>
                    {c.allocated_staff ? (
                      <span className="allocated-staff">
                        {c.allocated_staff}
                      </span>
                    ) : (
                      <span className="not-allocated">Not Assigned</span>
                    )}
                  </td>

                  <td>
                    {new Date(c.created).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>

                  <td>
                    {c.image && c.image.match(/\.(mp4|webm|ogg)$/i) ? (
                      <video
                        className="complaint-video"
                        controls
                        onClick={() => {
                          setSelectedImage(
                            "http://localhost:1337/uploads/" + c.image,
                          );

                          setZoom(1);
                        }}
                      >
                        <source
                          src={`http://localhost:1337/uploads/${c.image}`}
                        />
                      </video>
                    ) : (
                      <img
                        src={`http://localhost:1337/uploads/${c.image}`}
                        alt="complaint"
                        className="complaint-image"
                        onClick={() => {
                          setSelectedImage(
                            "http://localhost:1337/uploads/" + c.image,
                          );

                          setZoom(1);
                        }}
                      />
                    )}
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(c)}
                      >
                        <i className="fas fa-pen-to-square"></i>
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(c.complaint_id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedImage && (
        <div className="image-modal">
          <div className="modal-box">
            <button className="back-btn" onClick={() => setSelectedImage(null)}>
              ⬅ Back
            </button>

            {selectedImage.match(/\.(mp4|webm|ogg)$/i) ? (
              <video controls autoPlay className="custom-modal-video">
                <source src={selectedImage} />
              </video>
            ) : (
              <img
                src={selectedImage}
                alt="large"
                className="image-modal-content"
                style={{
                  transform: `scale(${zoom})`,
                }}
                onWheel={handleScrollZoom}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Trackcomplaints;
