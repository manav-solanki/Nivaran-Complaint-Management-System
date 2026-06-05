import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";

function Signup() {
  function register() {
    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const password = document.getElementById("password").value;

    const file = document.getElementById("image").files[0];

    if (!name || !email || !phone || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all required fields",
      });

      return;
    }

    // PHONE VALIDATION
    // numbers only
    if (!/^\d+$/.test(phone)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Phone number must contain digits only",
      });

      return;
    }

    // 10 digits check
    if (phone.length !== 10) {
      Swal.fire({
        icon: "error",
        title: "Phone number must contain exactly 10 digits",
      });

      return;
    }

    // starting digit check
    if (!["6", "7", "8", "9"].includes(phone[0])) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
      });

      return;
    }

    const formData = new FormData();

    formData.append("name", name);

    formData.append("email", email);

    formData.append("phone", phone);

    formData.append("password", password);

    if (file) {
      formData.append("image", file);
    }

    Axios.post("http://localhost:1337/api/registerprocess", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message,
        }).then(() => {
          window.location = "/";
        });
      })

      .catch((error) => {
        const msg = error.response?.data?.message || "Something went wrong";

        Swal.fire({
          icon: "error",
          title: "Error",
          text: msg,
        });
      });
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {/* LEFT SIDE FORM */}
        <div className="auth-form-card">
          <div className="text-center mb-4">
            <img src="images/sitelogo.png" alt="logo" className="logo" />

            <h3 style={{ marginTop: "-10px" }}>Create Account</h3>

            <p style={{ marginTop: "-5px" }}>
              Signing up is quick and easy
            </p>
          </div>

          <div className="form-group">
            <label>Username</label>

            <div className="input-box">
              <input type="text" placeholder="Enter username" id="name" />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>

            <div className="input-box">
              <input type="email" placeholder="Enter email" id="email" />
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <div className="input-box">
              <input
                type="text"
                placeholder="Enter Phone No."
                id="phone"
                maxLength="10"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="input-box">
              <input
                type="password"
                placeholder="Enter password"
                id="password"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Profile Image</label>

            <div className="input-box">
              <input type="file" id="image" />
            </div>
          </div>

          <button
            type="button"
            className="auth-form-btn text-center d-block"
            onClick={register}
          >
            SIGN UP
          </button>

          <div className="text-center login-link">
            Already have an account?{" "}
            <Link to="/login" className="custom-link">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;