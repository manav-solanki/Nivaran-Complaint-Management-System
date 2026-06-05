import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-container">
      {/* HERO */}
      <section className="about-hero">
        <div className="overlay"></div>

        <div className="hero-content">
          <h1 className="fade-up">About Nivaran</h1>
          <p className="fade-up delay">
            A modern complaint management platform built to ensure transparency,
            accountability, and faster resolution of public issues.
          </p>
        </div>
      </section>

      {/* MAIN SECTION */}
      <section className="about-main">
        <div className="about-left fade-left">
          <h2>
            Your Voice <span>Matters</span>
          </h2>

          <p>
            Our Complaint Management System is designed to simplify how citizens
            raise issues and how authorities respond to them.
          </p>

          <p>
            We eliminate delays, reduce paperwork, and ensure every complaint is
            tracked, monitored, and resolved efficiently.
          </p>

          <p>
            With real-time updates and transparency, users stay informed at
            every step of the process.
          </p>
        </div>

        <div className="about-right fade-right">
          <div className="card">
            <h4>📌 Quick Complaint Filing</h4>
            <p>Submit issues in seconds with a simple and clear process.</p>
          </div>

          <div className="card">
            <h4>⚡ Smart Routing</h4>
            <p>Complaints reach the right department instantly.</p>
          </div>

          <div className="card">
            <h4>🔍 Live Tracking</h4>
            <p>Track status updates in real-time with full visibility.</p>
          </div>

          <div className="card">
            <h4>📊 Admin Control</h4>
            <p>Manage and resolve complaints from one dashboard.</p>
          </div>
        </div>
      </section>

      <section className="about-flow">
        <h2 className="section-title">How It Works</h2>

        <div className="flow-steps">
          <div className="step">
            <span>1</span>
            <h4>Register Complaint</h4>
            <p>Users submit issues quickly with required details.</p>
          </div>

          <div className="step">
            <span>2</span>
            <h4>Auto Assignment</h4>
            <p>System routes it to the concerned authority.</p>
          </div>

          <div className="step">
            <span>3</span>
            <h4>Track Progress</h4>
            <p>Monitor status updates in real-time.</p>
          </div>

          <div className="step">
            <span>4</span>
            <h4>Resolution</h4>
            <p>Complaint gets resolved with full transparency.</p>
          </div>
        </div>
      </section>

      <section className="about-why">
        <h2 className="section-title">Why Choose Nivaran?</h2>

        <div className="why-grid">
          <div>
            <h4>✔ Transparent Process</h4>
            <p>No hidden steps — everything is visible to users.</p>
          </div>

          <div>
            <h4>✔ Faster Resolution</h4>
            <p>Minimizes delays with smart workflow management.</p>
          </div>

          <div>
            <h4>✔ User-Friendly</h4>
            <p>Simple interface designed for all users.</p>
          </div>

          <div>
            <h4>✔ Centralized System</h4>
            <p>All complaints managed in one unified platform.</p>
          </div>

          <div>
            <h4>✔ Real-Time Notifications</h4>
            <p>Stay updated with instant alerts on complaint status.</p>
          </div>

          <div>
            <h4>✔ Secure & Reliable</h4>
            <p>Ensures data safety and consistent system performance.</p>
          </div>
        </div>
      </section>

      <section className="about-cta fade-up">
        <h2>Ready to Raise Your Voice?</h2>

        <Link to="/dashboard/add-complaint" className="cta-btn">
          Submit Complaint
        </Link>
      </section>
    </div>
  );
}

export default About;
