import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        {/* PROFILE */}
        <li className="nav-item nav-profile">
          <div className="nav-link">
            <div className="profile-image">
              <img src="images/admin_pro.jpg" alt="profile" />
            </div>
            <div className="profile-name">
              <p className="name">Welcome Manav</p>
              <p className="designation">Super Admin</p>
            </div>
          </div>
        </li>

        {/* DASHBOARD */}
        <li className="nav-item">
          <Link className="nav-link" to="/dash">
            <i className="fa fa-home menu-icon"></i>
            <span className="menu-title">Dashboard</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/viewcomplaints">
            <i className="fab fa-trello menu-icon"></i>
            <span className="menu-title">Manage Complaints</span>
          </Link>
        </li>

        {/* ANALYSIS */}
        {/* <li className="nav-item">
          <Link className="nav-link" to="/complaints-analysis">
            <i className="fas fa-chart-line menu-icon"></i>
            <span className="menu-title">View Complaints Analysis</span>
          </Link>
        </li> */}

        <li className="nav-item">
          <Link className="nav-link" to="/manage-user">
            <i className="fas fa-users menu-icon"></i>
            <span className="menu-title">Manage User</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/manage-department">
            <i className="fas fa-building menu-icon"></i>
            <span className="menu-title">Manage Department</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/manage-staff">
            <i className="fas fa-user-tie menu-icon"></i>
            <span className="menu-title">Manage Staff</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/complaintreport">
            <i className="fas fa-file-pdf menu-icon"></i>
            <span className="menu-title">Complaint Reports</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
