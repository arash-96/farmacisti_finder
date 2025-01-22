import { useState, useEffect } from "react";
import api from "../api";
//import { useNavigate } from "react-router-dom";
import "../styles/Form.css";
// import LoadingIndicator from "./LoadingIndicator";

function Profile() {
  const [username, setUsername] = useState("");
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
    console.log(data["profile"]);
    const profile = data["profile"];

    setName(profile["name"]);
    setSurname(profile["surname"]);
    setDob(profile["dob"]);
    setPlaceOfBirth(profile["placeOfBirth"]);
    setTelephone(profile["telephone"]);
    setUsername(data["username"]);
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
              disabled
              style={{
                width: "100%",
                backgroundColor: "#f5f5f5",
                color: "#a1a1a1",
                border: "1px solid #d1d1d1",
              }}
              placeholder="Nome"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Cognome</label>
            <input
              className="form-input"
              type="text"
              value={surname}
              disabled
              style={{
                width: "100%",
                backgroundColor: "#f5f5f5",
                color: "#a1a1a1",
                border: "1px solid #d1d1d1",
              }}
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
              disabled
              style={{
                width: "100%",
                backgroundColor: "#f5f5f5",
                color: "#a1a1a1",
                border: "1px solid #d1d1d1",
              }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Luogo di Nascita</label>
            <input
              className="form-input"
              type="text"
              value={placeOfBirth}
              disabled
              style={{
                width: "100%",
                backgroundColor: "#f5f5f5",
                color: "#a1a1a1",
                border: "1px solid #d1d1d1",
              }}
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
              disabled
              style={{
                width: "100%",
                backgroundColor: "#f5f5f5",
                color: "#a1a1a1",
                border: "1px solid #d1d1d1",
              }}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Telefono</label>
            <input
              className="form-input"
              type="text"
              value={telephone}
              disabled
              style={{
                width: "100%",
                backgroundColor: "#f5f5f5",
                color: "#a1a1a1",
                border: "1px solid #d1d1d1",
              }}
              placeholder="Telefono"
            />
          </div>
        </div>
      </div>
      {/* {loading && <LoadingIndicator />} */}
      {/* <button className="form-button" type="submit">
        Registrati
      </button> */}
    </form>
  );
}

export default Profile;
