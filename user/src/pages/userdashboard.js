import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function Userdashboard() {
  const videoRef = useRef(null);

  const [counts, setCounts] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
    inProgress: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchCounts = () => {
      Axios.get("http://localhost:1337/api/dashboard-counts")
        .then((res) => {
          console.log("Dashboard API:", res.data);
          setCounts(res.data);
        })
        .catch((err) => console.log(err));
    };

    fetchCounts();

    const interval = setInterval(fetchCounts, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <>
      {/* HERO */}
      <div className="dashboard-hero">
        <section className="hero-section">
          <div className="hero-bg">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="bg-video"
            >
              <source src="/videos/back_video.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="dashboard-wrapperr">
            <h1>
              Welcome {JSON.parse(sessionStorage.getItem("mydata"))?.name} to
              Citizen Complaint Portal
            </h1>

            <p className="dashboard-text">
              Report and track issues like Water, Electricity, Roads and
              Sanitation.
            </p>

            <div className="mt-4">
              <Link to="add-complaint" className="discover-btn me-3">
                Register Complaint
              </Link>

              <Link to="track-complaint" className="discover-btn secondary-btn">
                Track Complaint
              </Link>
            </div>
          </div>
        </section>
      </div>

      <div className="counter-section">
        <div className="container-fluid">
          <div className="row g-4">
            <div className="col-md-3">
              <div className="counter-card">
                <div className="top-row">
                  <div className="icon-box">
                    <i className="fa fa-file-text"></i>
                  </div>
                  <h3>{counts.total || 0}</h3>
                </div>
                <p>Total Complaints</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="counter-card">
                <div className="top-row">
                  <div className="icon-box">
                    <i className="fa fa-hourglass-half"></i>
                  </div>
                  <h3>{counts.inProgress || 0}</h3>
                </div>
                <p>In Progress</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="counter-card">
                <div className="top-row">
                  <div className="icon-box">
                    <i className="fa fa-check-circle"></i>
                  </div>
                  <h3>{counts.resolved || 0}</h3>
                </div>
                <p>Resolved</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="counter-card">
                <div className="top-row">
                  <div className="icon-box">
                    <i className="fa fa-users"></i>
                  </div>
                  <h3>{counts.users || 0}</h3>
                </div>
                <p>Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Userdashboard;
