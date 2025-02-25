import { useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import Loading from "../components/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Form.propTypes = {
  route: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
};

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmedPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [telephone, setTelephone] = useState("");
  const [regione_residenza, setRegione_residenza] = useState(null);
  const [provincia_residenza, setProvincia_residenza] = useState(null);
  const [comune, setComune] = useState(null);
  const [via, setVia] = useState(null);
  const [numero_iscrizione_albo, setNumero_iscrizione_albo] = useState(null);
  const [titolo, setTitolo] = useState(null);
  const [denominazione_farmacia, setDenominazione_farmacia] = useState(null);
  const [partita_iva, setPartita_iva] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (
      !username ||
      !password ||
      !confirmPassword ||
      !name ||
      !surname ||
      !dob ||
      !telephone
    ) {
      toast.error("Tutti i campi obbligatori devono essere compilati.", {
        position: "top-center",
        autoClose: 1200,
        closeButton: false,
        hideProgressBar: true,
      });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
      toast.error("Inserisci un'email valida.", {
        position: "top-center",
        autoClose: 1200,
        closeButton: false,
        hideProgressBar: true,
      });
      return false;
    }
    if (password.length < 8) {
      toast.error("La password deve essere di almeno 8 caratteri.", {
        position: "top-center",
        autoClose: 1200,
        closeButton: false,
        hideProgressBar: true,
      });
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Le password non corrispondono. Riprova", {
        position: "top-center",
        autoClose: 1200,
        closeButton: false,
        hideProgressBar: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const requestBody = {
        username,
        password,
        profile: {
          name,
          surname,
          dob,
          placeOfBirth,
          telephone,
          userRole,
          regione_residenza,
          provincia_residenza,
          comune,
          via,
          numero_iscrizione_albo,
          titolo,
          denominazione_farmacia,
          partita_iva,
        },
      };

      const res = await api.post(route, requestBody);

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

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <ToastContainer position="top-right" />
      <h1 className="text-lg text-gray-600 text-center">Registrazione</h1>
      <div className="form-grid">
        <div className="form-row">
          <div className="form-row  text-center w-full">
            <div className="form-group">
              <select
                className="select select-bordered w-full text-center"
                onChange={(e) => {
                  setUserRole(e.target.value);
                }}
                defaultValue={""}
              >
                <option value={""} disabled hidden>
                  Seleziona un ruolo
                </option>
                <option value={"farmacista"}>Farmacista</option>
                <option value={"titolare"}>Titolare di Farmacia</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Nome*</label>
            <input
              className="form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Cognome*</label>
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
            <label className="form-label">Data di Nascita*</label>
            <input
              className="form-input"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Luogo di Nascita*</label>
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
            <label className="form-label">Regione di Residenza*</label>
            <input
              className="form-input"
              type="text"
              placeholder="Regione di Residenza"
              onChange={(e) => setRegione_residenza(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Provincia di Residenza*</label>
            <input
              className="form-input"
              type="text"
              placeholder="Provincia di Residenza"
              onChange={(e) => setProvincia_residenza(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Comune*</label>
            <input
              className="form-input"
              type="text"
              placeholder="Comune"
              onChange={(e) => setComune(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Via/Piazza</label>
            <input
              className="form-input"
              type="text"
              placeholder="Via/Piazza"
              onChange={(e) => setVia(e.target.value)}
            />
          </div>
        </div>
        {userRole === "farmacista" && (
          <div className="form-row">
            <div className="form-group">
              <label className="block mb-2 form-label">
                N° Iscrizione Albo dei Farmacisti*
              </label>
              <input
                className="form-input"
                type="text"
                placeholder="N° Iscrizione"
                onChange={(e) => setNumero_iscrizione_albo(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="block mb-2 form-label">Titolo di studio</label>
              <input
                className="form-input"
                type="text"
                placeholder="Titolo di studio"
                onChange={(e) => setTitolo(e.target.value)}
              />
            </div>
          </div>
        )}
        {userRole === "titolare" && (
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Denominazione Farmacia*</label>
              <input
                className="form-input"
                type="text"
                placeholder="Denominazione Farmacia"
                onChange={(e) => setDenominazione_farmacia(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Partita IVA*</label>
              <input
                className="form-input"
                type="text"
                placeholder="Parita Iva"
                onChange={(e) => setPartita_iva(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Email*</label>
            <input
              className="form-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Telefono*</label>
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
            <label className="form-label">Password*</label>
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
            <label className="form-label">Conferma Password*</label>
            <input
              className="form-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
              placeholder="Conferma Password"
            />
          </div>
        </div>
      </div>
      {loading && <Loading />}
      <div className="button-container">
        <button
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
          type="submit"
        >
          Registrati
        </button>
      </div>
      <div className="text-center">
        <p className="text-lg text-gray-600">
          Hai già un account?{" "}
          <Link to="/login_email" className="text-blue-600 hover:underline">
            Accedi subito!
          </Link>
        </p>
      </div>
    </form>
  );
}

export default Form;
