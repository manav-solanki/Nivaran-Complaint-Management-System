import React, { useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import "../App.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  function login() {
    const admin_email = document.getElementById("admin_email").value;
    const admin_pass = document.getElementById("admin_pass").value;

    if (!admin_email || !admin_pass) {
      Swal.fire("Error", "Please fill all required fields", "error");
      return;
    }

    Axios.post("http://localhost:1337/api/adminlogin", {
      admin_email,
      admin_pass,
    })
      .then((res) => {
        if (res.data.status === "success") {
          Swal.fire("Success", "Welcome Admin", "success").then(() => {
            sessionStorage.setItem("admin", JSON.stringify(res.data.data));
            window.location = "/dash";
          });
        } else {
          Swal.fire("Error", res.data.message, "error");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Server error", "error");
      });
  }

  return (
    <div className="admin-login-wrapper">
      <video className="login-bg-video" autoPlay muted loop playsInline>
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>

      <div className="video-overlay"></div>
      <div className="admin-login-card">
        <div className="admin-top">
          <img src="/images/sitelogo.png" alt="logo" />
          <h2>Admin Panel</h2>
        </div>

        <div className="admin-field">
          <label>Email</label>
          <div className="admin-input">
            <i className="fa fa-user"></i>
            <input type="text" id="admin_email" placeholder="Enter email" />
          </div>
        </div>

        <div className="admin-field">
          <label>Password</label>
          <div className="admin-input">
            <i className="fa fa-lock"></i>

            <input
              type={showPassword ? "text" : "password"}
              id="admin_pass"
              placeholder="Enter password"
            />

            <i
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
        </div>

        <button className="admin-login-btn" onClick={login}>
          LOGIN
        </button>
      </div>
    </div>
  );
}

export default Login;
