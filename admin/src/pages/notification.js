import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../App.css";

function Notification() {
  const [notifications, setNotifications] = useState([]);

  const handleReply = async (item) => {
    const { value: reply } = await Swal.fire({
      title: `Reply to ${item.name}`,
      input: "textarea",
      inputPlaceholder: "Type your reply here...",
      inputAttributes: {
        "aria-label": "Type your reply here",
      },
      showCancelButton: true,
      confirmButtonText: "Send Reply",
      confirmButtonColor: "#2563eb",
    });

    if (reply) {
      axios
        .post("http://localhost:1337/api/reply", {
          id: item.id,
          admin_reply: reply,
        })
        .then((res) => {
          Swal.fire("Success!", "Reply sent successfully", "success");
        })
        .catch((err) => {
          console.log(err);

          Swal.fire("Error!", "Failed to send reply", "error");
        });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This message will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:1337/api/contactprocess/${id}`)
          .then((res) => {
            // remove from UI
            setNotifications((prev) => prev.filter((item) => item.id !== id));

            Swal.fire("Deleted!", res.data.message, "success");
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Error!", "Delete failed", "error");
          });
      }
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/notifications")
      .then((res) => {
        if (res.data.status === "success") {
          setNotifications(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      className="content-wrapper1 notification-page"
      style={{ padding: "20px" }}
    >
      <h2><b>User Comments</b></h2>

      {notifications.length === 0 ? (
         <p className="no-messages">No messages found</p>
      ) : (
        notifications.map((item) => (
          <div className="comment-box" key={item.id}>
            <div className="comment-avatar">
              {item.name.charAt(0).toUpperCase()}
            </div>

            <div className="comment-content">
              <div className="comment-header">
                <strong>{item.name}</strong>
                <span>{item.email}</span>
              </div>

              <div className="comment-text">{item.message}</div>

              <div className="comment-actions">
                <button className="reply-btn" onClick={() => handleReply(item)}>
                  Reply
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Notification;
