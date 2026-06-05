import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const user = JSON.parse(sessionStorage.getItem("mydata"));

  const [hasNotification, setHasNotification] = useState(false);

  const image = user?.image
    ? `http://localhost:1337/uploads/${user.image}`
    : "/images/user.png";

  useEffect(() => {
    const fetchNotifications = () => {
      if (user?.email) {
        axios
          .get(`http://localhost:1337/api/usernotifications/${user.email}`)
          .then((res) => {
            if (res.data.status === "success") {
              const unreadReplies = res.data.data.filter(
                (item) => item.admin_reply && item.is_read === 0,
              );

              setHasNotification(unreadReplies.length > 0);
            }
          })
          .catch((err) => console.log(err));
      }
    };

    // first load
    fetchNotifications();

    // auto refresh every 3 seconds
    const interval = setInterval(fetchNotifications, 3000);

    return () => clearInterval(interval);
  }, [user?.email]);

  return (
    <div className="header-area">
      <div className="container-fluid">
        <div className="header-inner">
          {/* LOGO */}
          <div className="site-logo">
            <Link to="/dashboard">
              <img src="/images/sitelogo.png" alt="logo" />
            </Link>
          </div>

          <div className="mainmenu">
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>

              <li>
                <Link to="about">About</Link>
              </li>

              <li>
                <Link to="services">Services</Link>
              </li>

              <li>
                <Link to="/dashboard/contact">Contact</Link>
              </li>

              <li className="user-notification">
                <Link
                  to="/dashboard/user-notification"
                  className="notification-btn"
                  onClick={() => setHasNotification(false)}
                >
                  <i className="fas fa-bell"></i>

                  {hasNotification && (
                    <span className="notification-badge"></span>
                  )}
                </Link>
              </li>

              <li>
                <Link to="manage-profile" className="profile-btn">
                  <img src={image} alt="profile" />
                </Link>
              </li>

              <li>
                <button
                  className="logout-btn"
                  onClick={() => {
                    sessionStorage.removeItem("mydata");
                    window.location = "/login";
                  }}
                >
                  <i
                    className="fa fa-sign-out-alt"
                    style={{ marginRight: "8px" }}
                  ></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
