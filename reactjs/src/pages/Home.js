import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import authService from "../services/auth.service";
import characterService from "../services/character.service";

import "../App.css";

function Home() {
  const [characters, setCharacters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const [values, setValues] = useState({
  //   name: "",
  //   age: "",
  //   village: "",
  // });

  const navigate = useNavigate();

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/api/v1"
      : process.env.REACT_APP_BASE_URL;

  // let ignore = false;

  useEffect(() => {
    characterService.getAllPrivateCharacters().then(
      (response) => {
        setCharacters(response.data);
      },
      (error) => {
        console.log("secure page error", error);
        if (error.response && error.response.status === 403) {
          authService.logout();
          navigate("/login");
        }
      }
    );
    // if (!ignore) {
    getCharacters();
    // }
    // return () => {
    //   ignore = true;
    // };
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

  return (
    <div className="App-header">
      <div className="App">
        <h1 className="homeH1">Welcome To The Village Hidden In The Web</h1>
        <Link to="/Dashboard" className="homeLink">
          Add a Shinobi to our Village
        </Link>
        <h3 className="homeH3">Meet our village Shinobi</h3>
        {characters?.map((character, i) => (
          <div className="shinobiList">
            <Link to={`/characters/${character._id}`} className="ninjaList">
              {character.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
