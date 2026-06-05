import React from "react";

function Services() {
  return (
    <div className="services-page">
      <h2 className="page-title">Our Services</h2>

      <div className="services-container">

        <div className="service-card">
          <div className="icon-circle">
            <i className="fas fa-tools"></i>
          </div>
          <h4>Complaint Management</h4>
          <p>Register and track complaints with an easy workflow.</p>
        </div>

        <div className="service-card">
          <div className="icon-circle">
            <i className="fas fa-user-shield"></i>
          </div>
          <h4>User Management</h4>
          <p>Manage users, roles, and permissions securely.</p>
        </div>

        <div className="service-card">
          <div className="icon-circle">
            <i className="fas fa-chart-line"></i>
          </div>
          <h4>Analytics</h4>
          <p>View reports and insights for better decisions.</p>
        </div>

        <div className="service-card">
          <div className="icon-circle">
            <i className="fas fa-bolt"></i>
          </div>
          <h4>Priority System</h4>
          <p>Assign priorities to resolve issues faster.</p>
        </div>

        <div className="service-card">
          <div className="icon-circle">
            <i className="fas fa-bell"></i>
          </div>
          <h4>Notifications</h4>
          <p>Get real-time alerts and updates instantly.</p>
        </div>

        <div className="service-card">
          <div className="icon-circle">
            <i className="fas fa-headset"></i>
          </div>
          <h4>Support</h4>
          <p>24/7 support system for quick assistance.</p>
        </div>

      </div>
    </div>
  );
}

export default Services;