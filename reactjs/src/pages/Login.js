//react imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//service imports
import authService from "../services/auth.service";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(email, password).then((response) => {
        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className="editForm">
        <h2>Login</h2>
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

        <input type="submit" value="Submit" className="editFormBtn" />
      </form>
    </div>
  );
}
