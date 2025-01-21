import { useState, useEffect } from "react";
import api from "../api";
//import { useNavigate } from "react-router-dom";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Profile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [telephone, setTelephone] = useState("");

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    api
      .get("/api/user/details/")
      .then((res) => res.data)
      .then((data) => populateData(data))
      .catch((err) => alert(err));
  };

  const populateData = (data) => {
    console.log(data);
  };

  return (
    <form className="form-container mt-20">
      <h1 className="text-lg text-gray-600 text-center">Profilo Personale</h1>
      <div className="form-grid">
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
          {/* <div className="form-group">
                        <label className="form-label">Residenza</label>
                        <input
                            className="form-input"
                            type="text"
                            value={residency}
                            onChange={(e) => setResindency(e.target.value)}
                            placeholder="Residenza"
                        />
                    </div> */}
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
        {/* <div className="form-row">
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
        </div> */}
      </div>
      {/* {loading && <LoadingIndicator />} */}
      {/* <button className="form-button" type="submit">
        Registrati
      </button> */}
    </form>
  );
}

export default Profile;
