import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [lastCount, setLastCount] = useState(
    Number(localStorage.getItem("lastSeenCount")) || 0
  );
  const [showBadge, setShowBadge] = useState(false);

  // 🌙 Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // 📩 Notifications
  useEffect(() => {
    const fetchNotifications = () => {
      axios
        .get("http://localhost:1337/api/notifications")
        .then((res) => {
          if (res.data.status === "success") {
            const total = res.data.data.length;

            if (total > lastCount) {
              setShowBadge(true);
            }

            setLastCount(total);
          }
        })
        .catch((err) => console.log(err));
    };

    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 3000);

    return () => clearInterval(interval);
  }, [lastCount]);

  const handleNotificationClick = () => {
    setShowBadge(false);

    localStorage.setItem("lastSeenCount", lastCount);
  };

  return (
    <>
      <nav className="navbar fixed-top">
        <div className="navbar-brand-wrapper">
          <a className="navbar-brand" href="/dash">
            <img src="/images/sitelogo.png" alt="logo" />
          </a>
        </div>

        <div className="navbar-menu-wrapper">
          <div className="nav-left">
            <label htmlFor="menu-toggle" className="navbar-toggler">
              <i className="fas fa-bars"></i>
            </label>

            <div className="nav-search">
              <i className="fas fa-search search-icon"></i>
              <input type="text" placeholder="Search" />
            </div>
          </div>

          <div className="nav-right">
            <Link
              to="/notification"
              className="message-btn"
              onClick={handleNotificationClick}
            >
              <i className="fas fa-envelope"></i>

              {showBadge && (
                <span className="notify-badge"></span>
              )}
            </Link>

            <button
              className="theme-toggle-btn"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "🌞" : "🌙"}
            </button>

            <Link to="/" className="logout-link">
              <button className="logout-btn">
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </Link>

          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;