import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//pages Imports
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Character from "./pages/Character";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/characters/:id" exact element={<Character />} />
        <Route path="/Dashboard" exact element={<Dashboard />} />
        <Route path="/" exact element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
