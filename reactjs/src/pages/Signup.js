//react imports
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
//service imports
import authService from "../services/auth.service";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      //await service
      await authService.signup(email, password).then(
        (response) => {
          navigate("/");
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
    console.log("this is email>>", email, "this is password>>", password);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSignup} className="editForm">
          <h2>Signup</h2>
          <input
            type="text"
            name="email"
            className="editInputs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <input
            type="text"
            name="password"
            className="editInputs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button type="submit" value="Submit" className="editFormBtn" />
        </form>
      </div>
    </div>
  );
}
