import { useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

Form.propTypes = {
  route: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
};

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [telephone, setTelephone] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, {
        username,
        password,
        profile: {
          name,
          surname,
          dob,
          placeOfBirth,
          telephone,
          selectedRole,
        },
      });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container mt-20">
      <h1 className="text-lg text-gray-600 text-center">Registrazione</h1>
      <div className="form-grid">
        <div className="form-row mt-5">
          <div className="form-group">
            <button
              style={{
                backgroundColor:
                  selectedRole === "farmacista" ? "#FF7F50" : "#d3d3d3",
                color: selectedRole === "farmacista" ? "white" : "#333",
                padding: "10px 20px",
                border: "none",
                cursor: "pointer",
              }}
              className="form-input"
              onClick={(e) => {
                e.preventDefault();
                handleRoleSelection("farmacista");
              }}
            >
              Farmacista
            </button>
          </div>
          <div className="form-group">
            <button
              style={{
                backgroundColor:
                  selectedRole === "titolare" ? "#17B169" : "#d3d3d3",
                color: selectedRole === "titolare" ? "white" : "#333",
                padding: "10px 20px",
                border: "none",
                cursor: "pointer",
              }}
              className="form-input"
              onClick={(e) => {
                e.preventDefault(); // Prevent form submission
                handleRoleSelection("titolare");
              }}
            >
              Titolare di Farmacia
            </button>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Nome</label>
            <input
              className="form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Cognome</label>
            <input
              className="form-input"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Cognome"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Data di Nascita</label>
            <input
              className="form-input"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Luogo di Nascita</label>
            <input
              className="form-input"
              type="text"
              value={placeOfBirth}
              onChange={(e) => setPlaceOfBirth(e.target.value)}
              placeholder="Luogo di Nascita"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Telefono</label>
            <input
              className="form-input"
              type="text"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="Telefono"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Conferma Password</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Conferma Password"
            />
          </div>
        </div>
      </div>
      {loading && <LoadingIndicator />}
      <div className="button-container">
        <button className="form-button" type="submit">
          Registrati
        </button>
      </div>
    </form>
  );
}

export default Form;
