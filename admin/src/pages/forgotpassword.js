import React from "react";
import { Link } from "react-router-dom";

function Forgotpassword() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>Forgot Password</h3>
        <p style={{ color: "#777", marginBottom: "25px" }}>
          Enter your email to receive reset link
        </p>

        <form>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter your email"
              style={{ borderRadius: "8px" }}
            />
          </div>

          <div>
            <button
              type="button"
              className="btn btn-primary btn-lg w-100"
              style={{ borderRadius: "8px" }}
            >
              Send Reset Link
            </button>
          </div>

          <div style={{ marginTop: "20px" }}>
            <Link to="/login" style={{ color: "#667eea" }}>
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Forgotpassword;