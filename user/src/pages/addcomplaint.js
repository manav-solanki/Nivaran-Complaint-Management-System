import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";

function Addcomplaint() {
  function addcomplaint(e) {
    e.preventDefault();

    const usersession = sessionStorage.getItem("mydata");

    if (!usersession) {
      alert("Please Login First");

      window.location = "/login";

      return;
    }

    const user = JSON.parse(usersession);

    const title = document.getElementById("title").value.trim();

    const description = document.getElementById("description").value.trim();

    const category = document.getElementById("category").value;

    const address = document.getElementById("address").value;

    const image = document.getElementById("image").files[0];

    const user_id = user.user_id;

    if (!title || !description || !address || !category || !image) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all required fields",
      });

      return;
    }

    // CATEGORY VALIDATION

    const text = `${title} ${description}`.toLowerCase();

    let detectedCategory = "";

    // WATER
    if (
      text.includes("water") ||
      text.includes("pipeline") ||
      text.includes("pipe") ||
      text.includes("tap") ||
      text.includes("leakage") ||
      text.includes("drainage") ||
      text.includes("water supply") ||
      text.includes("contaminated water")
    ) {
      detectedCategory = "Water";
    }

    // ELECTRICITY
    else if (
      text.includes("electricity") ||
      text.includes("power cut") ||
      text.includes("power outage") ||
      text.includes("voltage") ||
      text.includes("wire") ||
      text.includes("transformer") ||
      text.includes("electric pole") ||
      text.includes("street light")
    ) {
      detectedCategory = "Electricity";
    }

    // SANITATION
    else if (
      text.includes("garbage") ||
      text.includes("waste") ||
      text.includes("trash") ||
      text.includes("cleanliness") ||
      text.includes("dirty") ||
      text.includes("sanitation") ||
      text.includes("unhygienic") ||
      text.includes("foul smell")
    ) {
      detectedCategory = "Sanitation";
    }

    // TRAFFIC
    else if (
      text.includes("traffic") ||
      text.includes("traffic jam") ||
      text.includes("signal") ||
      text.includes("congestion") ||
      text.includes("vehicle") ||
      text.includes("parking") ||
      text.includes("commuter")
    ) {
      detectedCategory = "Traffic";
    }

    // ROAD
    else if (
      text.includes("pothole") ||
      text.includes("damaged road") ||
      text.includes("broken road") ||
      text.includes("road crack") ||
      text.includes("road repair") ||
      text.includes("road maintenance")
    ) {
      detectedCategory = "Road";
    }

    // CATEGORY MISMATCH
    if (detectedCategory && detectedCategory !== category) {
      Swal.fire({
        icon: "error",
        title: "Wrong Category Selected",
        text: `This complaint belongs to "${detectedCategory}" category`,
      });

      return;
    }

    // FormData
    const formData = new FormData();

    formData.append("user_id", user_id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("category", category);

    // image or video
    formData.append("image", image);

    Swal.fire({
  title: "Submitting Complaint...",
  text: "Please wait",
  allowOutsideClick: false,
  didOpen: () => {
    Swal.showLoading();
  },
});

Axios.post("http://localhost:1337/api/addcomplaintprocess", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
})

  .then((response) => {
    Swal.close();

    if (response.data.status === "error") {
      Swal.fire("Error", response.data.message, "error");
    } else {
      Swal.fire(
        "Success",
        "Complaint Added Successfully",
        "success"
      ).then(() => {
        window.location = "/dashboard";
      });
    }
  })

  .catch(() => {
    Swal.close();

    Swal.fire(
      "Error",
      "Server Error",
      "error"
    );
  });
  }

  return (
    <div className="add-complaint-page">
      <div className="form-card">
        <h2>Add Complaint</h2>

        <div className="form-grid">
          <div className="form-group full-width">
            <label>Title</label>

            <input type="text" id="title" placeholder="Enter complaint title" />
          </div>

          <div className="form-group full-width">
            <label>Description</label>

            <textarea
              id="description"
              placeholder="Enter description"
            ></textarea>
          </div>

          <div className="form-group full-width">
            <label>Address</label>

            <textarea
              id="address"
              placeholder="Enter complaint address"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Category</label>

            <select id="category">
              <option value="">Select category</option>

              <option value="Water">Water</option>

              <option value="Electricity">Electricity</option>

              <option value="Road">Road</option>

              <option value="Sanitation">Sanitation</option>

              <option value="Traffic">Traffic</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label>Upload Image / Video</label>

            <input
              type="file"
              id="image"
              name="image"
              accept="image/*,video/*"
            />
          </div>
        </div>

        <div className="form-actions">
          <Link to="/dashboard" className="btn cancel-btn">
            Cancel
          </Link>

          <button
            type="button"
            className="btn submit-btn"
            onClick={addcomplaint}
          >
            Submit Complaint
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addcomplaint;
