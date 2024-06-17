import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";

function Character() {
  const [characters, setCharacters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [values, setValues] = useState({
    name: "",
    age: "",
    village: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

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
  //GET BY ID
  const getCharacters = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/characters/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const { name, age, village } = data;
          setValues({ name, age, village });
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };
  //DELETE by ID
  const deleteCharacter = async () => {
    try {
      await fetch(`${API_BASE}/characters/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          setCharacters(data);
          navigate("/", { replace: true });
        });
    } catch {}
  };
  //PATCH by ID
  const updateCharacter = async () => {
    try {
      await fetch(`${API_BASE}/characters/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCharacter();
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
        <h1>Character Page</h1>
        <ul>
          <li>{values && values.name}</li>
          <li>{values && values.age}</li>
          <li>{values && values.village}</li>
        </ul>
        <button onClick={() => deleteCharacter()}>Delete Character</button>

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

export default Character;
