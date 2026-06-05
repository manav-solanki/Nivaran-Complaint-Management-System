import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  // Countdown Timer
  useEffect(() => {
    let timer;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [countdown]);

  // VERIFY OTP
  const verifyOtp = () => {
    if (!otp) {
      Swal.fire("Error", "Please enter OTP", "error");
      return;
    }

    Axios.post("http://localhost:1337/api/verifyotp", {
      email,
      otp,
    })
      .then((response) => {
        if (response.data.status === "success") {
          Swal.fire("Success", "OTP Verified Successfully", "success");

          navigate("/resetpassword", {
            state: { email },
          });
        } else {
          Swal.fire("Error", response.data.message || "Invalid OTP", "error");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Something went wrong", "error");
      });
  };

  // RESEND OTP
  const resendOtp = () => {
    if (countdown > 0) return;

    Axios.post("http://localhost:1337/api/sendotp", {
      email,
    })
      .then((response) => {
        if (response.data.status === "success") {
          Swal.fire("Success", "OTP resent successfully", "success");

          // Start 30 second countdown
          setCountdown(29);
        } else {
          Swal.fire(
            "Error",
            response.data.message || "Failed to resend OTP",
            "error",
          );
        }
      })
      .catch(() => {
        Swal.fire("Error", "Something went wrong", "error");
      });
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <h2>Verify OTP</h2>

        <p>Enter the OTP sent to your email</p>

        <input
          type="text"
          placeholder="Enter OTP"
          className="forgot-input"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <button
            className="forgot-btn"
            onClick={verifyOtp}
            style={{ width: "50%" }}
          >
            Verify OTP
          </button>

          <button
            className="forgot-btn"
            onClick={() => navigate("/login")}
            style={{
              width: "50%",
              backgroundColor: "#6c757d",
            }}
          >
            Back
          </button>
        </div>

        {/* RESEND OTP LINK */}
        <p style={{ marginTop: "12px", textAlign: "center" }}>
          Didn't receive OTP?{" "}
          <span
            onClick={countdown === 0 ? resendOtp : null}
            style={{
              color: countdown > 0 ? "#979797" : "#2c7fd2",
              cursor: countdown > 0 ? "not-allowed" : "pointer",
              fontWeight: "600",
            }}
          >
            {countdown > 0 ? `Resending OTP in ${countdown}s` : "Resend"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default VerifyOtp;
