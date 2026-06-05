import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";

function Manageprofile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });

  const [image, setImage] = useState(null);

  // Load user data on page load
  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("mydata"));

    console.log("SESSION DATA:", data);

    if (data) {
      setUser({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        image: data.image || "",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please login first",
      });
    }
  }, []);

  // handle input change
  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  // handle update profile
  function profile() {
    const sessionUser = JSON.parse(sessionStorage.getItem("mydata"));

    if (!sessionUser) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please login first",
      });
      return;
    }

    if (!user.name || !user.email || !user.phone) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all required fields",
      });
      return;
    }

    const formData = new FormData();

    formData.append("id", sessionUser.user_id);
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);

    if (image) {
      formData.append("image", image);
    }

    Axios.post("http://localhost:1337/api/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Profile Updated Successfully",
        }).then(() => {
          sessionStorage.setItem(
            "mydata",
            JSON.stringify({
              ...sessionUser,
              name: user.name,
              email: user.email,
              phone: user.phone,
              image: image ? image.name : sessionUser.image,
            }),
          );

          window.location = "/dashboard";
        });
      })
      .catch((err) => {
        console.log(err);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update profile",
        });
      });
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2 className="profile-title">Manage Profile</h2>

        <div className="profile-form">
          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Phone</label>

            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          <div className="form-group">
            <label>Image</label>

            <div className="custom-file-upload">
              <label htmlFor="fileUpload" className="browse-btn">
                Browse
              </label>

              <span className="file-name">
                {image ? image.name : user.image || "No file selected"}
              </span>

              <input
                id="fileUpload"
                type="file"
                hidden
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn update-btn" onClick={profile}>
              Update
            </button>

            <Link to="/dashboard" className="btn cancel-btn">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manageprofile;
