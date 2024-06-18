import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";

import Card from "../components/card/Card";

function Character() {
  const [characters, setCharacters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [values, setValues] = useState({
    name: "",
    age: "",
    village: "",
  });

  let [show, setShow] = useState(false);

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
          navigate("/", { replace: true });
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
        <h1>Meet {values.name}</h1>

        <Card
          name={values.name}
          age={values.age}
          village={values.village}
          deleteBtn={() => deleteCharacter()}
          dele="Delete Shinobi"
          editBtn={() => setShow(!show)}
          edit="Edit Shinobi"
        />

        {show && (
          <form onSubmit={(event) => handleSubmit(event)} className="editForm">
            <h2>Edit Shinobi</h2>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleInputChanges}
                className="editInputs"
              />
            </label>
            <label>
              Age:
              <input
                type="text"
                name="age"
                value={values.age}
                onChange={handleInputChanges}
                className="editInputs"
              />
            </label>
            <label>
              Village:
              <input
                type="text"
                name="village"
                value={values.village}
                onChange={handleInputChanges}
                className="editInputs"
              />
            </label>
            <input type="submit" value="Submit" className="editFormBtn" />
          </form>
        )}
      </header>
    </div>
  );
}

export default Character;
