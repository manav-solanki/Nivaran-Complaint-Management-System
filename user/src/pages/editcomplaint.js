import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

function Editcomplaint() {
  const location = useLocation();

  const navigate = useNavigate();

  const complaint = location.state;

  const [title, setTitle] = useState(complaint.title);

  const [description, setDescription] = useState(complaint.description);

  const [address, setAddress] = useState(complaint.address);

  const [category, setCategory] = useState(complaint.category);

  const [image, setImage] = useState(null);

  const updateComplaint = () => {
    if (!title || !description || !address || !category) {
      Swal.fire({
        icon: "error",
        title: "Please fill all fields",
      });

      return;
    }

    // CATEGORY VALIDATION
    const text = `${title} ${description}`.toLowerCase();

    let detectedCategory = "";

    if (
      text.includes("water") ||
      text.includes("pipe") ||
      text.includes("drainage") ||
      text.includes("tap")
    ) {
      detectedCategory = "Water";
    } else if (
      text.includes("electricity") ||
      text.includes("light") ||
      text.includes("power") ||
      text.includes("wire")
    ) {
      detectedCategory = "Electricity";
    } else if (
      text.includes("road") ||
      text.includes("street") ||
      text.includes("pothole")
    ) {
      detectedCategory = "Road";
    } else if (
      text.includes("garbage") ||
      text.includes("waste") ||
      text.includes("sanitation") ||
      text.includes("clean")
    ) {
      detectedCategory = "Sanitation";
    } else if (
      text.includes("traffic") ||
      text.includes("signal") ||
      text.includes("jam")
    ) {
      detectedCategory = "Traffic Problem";
    }

    if (detectedCategory && detectedCategory !== category) {
      Swal.fire({
        icon: "error",
        title: "Wrong Category Selected",
        text: `This complaint looks related to "${detectedCategory}" category`,
      });

      return;
    }

    const formData = new FormData();

    formData.append("title", title);

    formData.append("description", description);

    formData.append("address", address);

    formData.append("category", category);

    if (image) {
      formData.append("image", image);
    }

    Axios.put(
      `http://localhost:1337/api/update-complaint/${complaint.complaint_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    )

      .then((res) => {
        if (res.data.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Complaint Updated Successfully",
            timer: 1000,
            showConfirmButton: false,
          });

          setTimeout(() => {
            navigate("/dashboard/track-complaint");
          }, 1000);
        }
      })

      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
        });
      });
  };

  return (
    <div className="edit-complaint-page">
      <div className="edit-complaint-card">
        <h2>Edit Complaint</h2>

        <div className="form-group">
          <label>Title</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Address</label>

          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Water">Water</option>

            <option value="Electricity">Electricity</option>

            <option value="Road">Road</option>

            <option value="Sanitation">Sanitation</option>

            <option value="Traffic Problem">Traffic Problem</option>
          </select>
        </div>

        <div className="form-group">
          <label>Image</label>

          <div className="custom-file-upload">
            <label className="custom-browse-btn">
              Browse
              <input
                type="file"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>

            <span className="selected-file-name">
              {image ? image.name : complaint.image}
            </span>
          </div>
        </div>

        <div className="edit-btn-group">
          <button className="save-btn" onClick={updateComplaint}>
            Update
          </button>

          <button
            className="close-btn"
            onClick={() => navigate("/dashboard/track-complaint")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Editcomplaint;