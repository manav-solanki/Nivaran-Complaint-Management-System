import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="footer-area">
        <div className="footer-container">
          <div className="footer-social">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>

            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-google-plus-g"></i>
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>

          <ul className="footer-links">
            <li>
              <Link to="/dashboard">Home</Link>
            </li>

            <li>
              <Link to="/dashboard/about">About</Link>
            </li>
            <li>
              <Link to="/dashboard/services">Services</Link>
            </li>
            <li>
              <Link to="/dashboard/contact">Contact</Link>
            </li>
          </ul>

          <div className="footer-copy">
            Copyright © 2026 Nivaran | Designed & Developed by Manav
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
