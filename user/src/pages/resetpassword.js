import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import "../App.css";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updatePassword = () => {
    if (!password || !confirmPassword) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    Axios.post("http://localhost:1337/api/resetpassword", {
      email,
      password,
    })
      .then((response) => {
        if (response.data.status === "success") {
          Swal.fire("Success", "Password Updated Successfully", "success").then(
            () => {
              navigate("/login");
            },
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
        <h2>Reset Password</h2>

        <div
          style={{
            position: "relative",
          }}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="forgot-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ paddingRight: "45px" }}
          />

          <i
            className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "15px",
              top: "39%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#777",
              fontSize: "13px",
            }}
          ></i>
        </div>

        <div
          style={{
            position: "relative",
            marginBottom: "2px",
          }}
        >
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="forgot-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ paddingRight: "45px" }}
          />

          <i
            className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              position: "absolute",
              right: "15px",
              top: "39%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#777",
              fontSize: "13px",
            }}
          ></i>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <button
            className="forgot-btn"
            onClick={updatePassword}
            style={{ flex: 1 }}
          >
            Update Password
          </button>

          <button
            className="forgot-btn"
            onClick={() => navigate("/login")}
            style={{
              flex: 1,
              background: "#6c757d",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
