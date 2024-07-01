import React from "react";
import Styles from "./nav.css";
export default function Navbar() {
  return (
    <div>
      <div className="nav">
        <nav>
          <h1>Web Village</h1>
          <ul class={Styles.navText}>
            <a href="/" className="navText">
              Home
            </a>
            <a href="/dashboard" className="navText">
              Create
            </a>
            <a href="/login" className="navText">
              Login
            </a>
            <a href="/signup" className="navText">
              Sign-up
            </a>
          </ul>
        </nav>
      </div>
    </div>
  );
}
