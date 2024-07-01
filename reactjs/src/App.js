import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//pages Imports
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Character from "./pages/Character";
import Navbar from "./components/navbar/Navbar";
//react imports
import { useEffect, useState } from "react";
//service imports
import authService from "./services/auth.service";

function App() {
  const [currentUser, setCurrentUser] = useState(false);
  //AuthService.getCurrentUser()
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div>{currentUser ? <h2>Logged in</h2> : <h2>Logged Out</h2>}</div>
        <Routes>
          <Route path="/Signup" exact element={<Signup />} />
          <Route path="/Login" exact element={<Login />} />
          <Route path="/characters/:id" exact element={<Character />} />
          <Route path="/Dashboard" exact element={<Dashboard />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
