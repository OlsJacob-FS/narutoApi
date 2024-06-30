import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <form onSubmit={(event) => handleLogin(event)} className="editForm">
        <h2>Login</h2>
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
  );
}
