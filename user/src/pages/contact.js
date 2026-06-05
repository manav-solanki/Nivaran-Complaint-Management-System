import React from "react";
import Swal from "sweetalert2";
import Axios from "axios";

function Contact() {

  function handleMessage() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const messageText = document.getElementById("message").value;

    // ✅ Empty validation
    if (!name || !email || !messageText) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all required fields",
      });
      return;
    }

    // ✅ Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Swal.fire("Error", "Enter valid email", "error");
      return;
    }

    // ✅ Compare with stored login email (if exists)
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email && email !== user.email) {
      Swal.fire("Error", "Enter valid email", "error");
      return;
    }

    // ✅ API call
    Axios.post("http://localhost:1337/api/contact", {
      name: name,
      email: email,
      message: messageText,
    })
      .then((res) => {
        if (res.data.status === "success") {
          Swal.fire("Success", res.data.msg, "success");

          // clear fields
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("message").value = "";
        } else {
          Swal.fire("Error", res.data.msg, "error");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Server not responding", "error");
      });
  }

  return (
    <div className="contact-page">

      <div className="contact-container">

        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>We’d love to hear from you! Reach out anytime.</p>

          <ul>
            <li><strong>Email:</strong> nivaran@email.com</li>
            <li><strong>Phone:</strong> +91 9313680286</li>
            <li><strong>Address:</strong> Vadodara, Gujarat, India</li>
          </ul>
        </div>

        <div className="contact-form">
          <h3>Send a Message</h3>

          <div className="form-group">
            <label>Name</label>
            <input type="text" id="name" placeholder="Your Name" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" id="email" placeholder="Your Email" />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea id="message" rows="5" placeholder="Your Message"></textarea>
          </div>

          <button
            type="button"
            className="btn-submit"
            onClick={handleMessage}
          >
            Send Message
          </button>
        </div>

      </div>
    </div>
  );
}

export default Contact;