import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Home Page</h1>
        <Link to="/Dashboard">Dashboard</Link>
      </header>
    </div>
  );
}

export default Home;