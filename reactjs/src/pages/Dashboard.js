import { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [characters, setCharacters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    age: "",
    village: "",
  });

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/api/v1"
      : process.env.REACT_APP_BASE_URL;

  //POST
  const createCharacter = async () => {
    try {
      await fetch(`${API_BASE}/characters/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      navigate("/", { replace: true });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createCharacter();
  };

  const handleInputChanges = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="App-header">
      <div className="formDiv">
        <form onSubmit={(event) => handleSubmit(event)} className="formDash">
          <h1>Create a Shinobi</h1>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleInputChanges}
            placeholder="Name"
            className="formInput"
          />

          <input
            type="text"
            name="age"
            value={values.age}
            onChange={handleInputChanges}
            placeholder="Age"
            className="formInput"
          />

          <input
            type="text"
            name="village"
            value={values.village}
            onChange={handleInputChanges}
            placeholder="Home Village"
            className="formInput"
          />

          <button type="submit" value="Submit" className="formButton">
            Create Shinobi
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
