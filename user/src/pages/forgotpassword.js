import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import "../App.css";

function Forgotpassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const verifyEmail = () => {
    if (!email) {
      Swal.fire("Error", "Please enter email", "error");
      return;
    }

    Axios.post("http://localhost:1337/api/sendotp", {
      email,
    })
      .then((response) => {
        if (response.data.status === "success") {
          Swal.fire(
            "Success",
            "OTP sent to your registered email",
            "success"
          );

          navigate("/verifyotp", {
            state: { email },
          });
        } else {
          Swal.fire(
            "Error",
            response.data.message,
            "error"
          );
        }
      })
      .catch(() => {
        Swal.fire(
          "Error",
          "Something went wrong",
          "error"
        );
      });
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <h2>Forgot Password</h2>

        <p>Enter your registered email address</p>

        <input
          type="email"
          placeholder="Enter Email"
          className="forgot-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="forgot-btn"
          onClick={verifyEmail}
        >
          Send OTP
        </button>

        <Link
          to="/login"
          className="forgot-link"
        >
          Back To Login
        </Link>
      </div>
    </div>
  );
}

export default Forgotpassword;