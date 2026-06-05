import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Swal from "sweetalert2";
import Axios from "axios";
import loginBg from "../assets/login_background.jpg";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all required fields",
      });
      return;
    }

    Axios.post("http://localhost:1337/api/loginprocess", {
      email: email,
      password: password,
    })
      .then((response) => {
        console.log("LOGIN RESPONSE:", response.data);

        if (response.data.status === "error") {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.message,
          });
          return;
        }

        const user = response.data.data;

        const data = {
          user_id: user.user_id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          image: user.image,
        };

        sessionStorage.setItem("mydata", JSON.stringify(data));

        Swal.fire({
          icon: "success",
          title: "Login Successfully",
          text: `Welcome ${user.email}`,
        }).then(() => {
          window.location = "/dashboard";
        });
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          Swal.fire({
            icon: "error",
            title: "Login Info",
            text: err.response.data.message, 
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong",
          });
        }
      });
  }
  return (
   <div
  className="login-page"
  style={{
    backgroundImage: `url(${loginBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
      <div className="overlay">
        <div className="auth-form-card">
          <div className="text-center mb-1">
            <img
              src="images/sitelogo.png"
              alt="logo"
              style={{ width: "150px", transform: "translateY(-15px)" }}
            />
          </div>

          <b
            className="login-title"
            style={{
              fontFamily: "Georgia",
              fontSize: "25px",
              display: "block",
              transform: "translateY(-10px)",
            }}
          >
            Hey! Let's Get Started
          </b>

          <div className="form-group mb-3">
            <label>Email</label>
            <div className="input-box">
              <i className="fa fa-user input-icon"></i>
              <input
                type="email"
                placeholder="Enter username"
                id="email"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <label>Password</label>
            <div className="input-box">
              <i className="fa fa-lock input-icon"></i>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                id="password"
                className="form-input"
              />

              <i
                className={`fa ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                } toggle-password`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
          </div>

          <div className="text-end mb-3">
            <Link to="/forgotpassword" className="custom-link">
              Forgot password?
            </Link>
          </div>

          <button type="button" className="auth-form-btn mb-3" onClick={login}>
            LOGIN
          </button>

          <div className="text-center">
            <span className="text-muted">Don't have an account? </span>
            <Link to="/signup" className="custom-link">
              Create
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
