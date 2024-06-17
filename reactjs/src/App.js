import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//pages Imports
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Character from "./pages/Character";
import Navbar from "./components/navbar/Navbar";
function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/characters/:id" exact element={<Character />} />
          <Route path="/Dashboard" exact element={<Dashboard />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
