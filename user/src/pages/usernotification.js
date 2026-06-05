import React, { useEffect, useState } from "react";
import axios from "axios";

function UserNotifications() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const email = JSON.parse(sessionStorage.getItem("mydata")).email;

    axios
      .get(`http://localhost:1337/api/usernotifications/${email}`)
      .then((res) => {
        if (res.data.status === "success") {
          setMessages(res.data.data);

          // mark notifications as read
          axios.put(`http://localhost:1337/api/read-notification/${email}`);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="content">
      <h2>My Notifications</h2>

      {messages.length === 0 ? (
        <p>No notifications found</p>
      ) : (
        messages.map((item) => (
          <div className="notification-card" key={item.id}>
            <div className="notification-top">
              <div className="notify-icon">
                <i className="fas fa-bell"></i>
              </div>

              <div>
                <h5>User Message</h5>
                <p className="notify-date">Recent notification</p>
              </div>
            </div>

            <div className="message-box">
              <strong>My Message:</strong>

              <p>{item.message}</p>
            </div>

            {item.admin_reply && (
              <div className="reply-box">
                <h6>
                  <i className="fas fa-reply"></i>
                  Admin Reply
                </h6>

                <p>{item.admin_reply}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default UserNotifications;
