import React from "react";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      //await service
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <header>
        <div>signup pages</div>
      </header>
      <div>
        <form onSubmit={(event) => handleSignup(event)} className="editForm">
          <h2>Signup</h2>
          <label>
            Email:
            <input
              type="text"
              name="email"
              className="editInputs"
              value={email}
              onChange={(e) => setEmail(e.target.email)}
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              name="password"
              className="editInputs"
              value={password}
              onChange={(e) => setPassword(e.target.passowrd)}
            />
          </label>
          <input type="submit" value="Submit" className="editFormBtn" />
        </form>
      </div>
    </div>
  );
}
