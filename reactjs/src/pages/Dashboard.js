import { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [characters, setCharacters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [values, setValues] = useState({
    name: "",
    age: "",
    village: "",
  });

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/api/v1"
      : process.env.REACT_APP_BASE_URL;

  let ignore = false;

  useEffect(() => {
    if (!ignore) {
      getCharacters();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const getCharacters = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/characters`)
        .then((res) => res.json())
        .then((data) => {
          setCharacters(data);
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };
  //POST
  const createCharacter = async () => {
    try {
      await fetch(`${API_BASE}/characters/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then(() => getCharacters());
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
    <div className="App">
      <header className="App-header">
        <h1>Dashboard Page</h1>
        <Link to="/">Home</Link>
        <ul>
          {characters?.map((character, i) => (
            <li key={i}>
              <Link to={`/characters/${character._id}`}>{character.name}</Link>
            </li>
          ))}
        </ul>

        <form onSubmit={(event) => handleSubmit(event)}>
          <label>
            name:
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            age:
            <input
              type="text"
              name="age"
              value={values.age}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            Village:
            <input
              type="text"
              name="village"
              value={values.village}
              onChange={handleInputChanges}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default Dashboard;
