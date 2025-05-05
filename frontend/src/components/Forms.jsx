// React libraries
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Authentication
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
// API
import api from "../api";
// Components
import Loading from "../components/Loading";
// Static data
import { regioni_italiane } from "../data/regioni_italiane";
import { province_italiane } from "../data/province_italiane";

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
  const [comune, setComune] = useState(null);
  const [via, setVia] = useState(null);
  const [numero_iscrizione_albo, setNumero_iscrizione_albo] = useState(null);
  const [titolo, setTitolo] = useState(null);
  const [denominazione_farmacia, setDenominazione_farmacia] = useState(null);
  const [indirizzo_farmacia, setIndirizzo_farmacia] = useState(null);
  const [partita_iva, setPartita_iva] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [searchRegione, setSearchRegione] = useState("");
  const [filteredRegioni, setFilteredRegioni] = useState([]);
  const [selectedRegione, setSelectedRegione] = useState("");

  const [searchProvincia, setSearchProvincia] = useState("");
  const [filteredProvince, setFilteredProvince] = useState([]);
  const [selectedProvincia, setSelectedProvincia] = useState("");

  const [searchComuneFarmacia, setSearchComuneFarmacia] = useState("");
  const [filteredComuniFarmacia, setFilteredComuniFarmacia] = useState([]);
  const [comuni_italiani, setComuniItaliani] = useState([]);

  useEffect(() => {
    fetch('https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni')
      .then((res) => res.json())
      .then((data) => setComuniItaliani(data.map((comune) => comune.nome)))
      .catch((err) => console.error("Errore nel fetch dei comuni:", err));
  }, []);

  const handleSearchRegione = (e) => {
    const value = e.target.value;
    setSearchRegione(value);
    if (value.length > 0) {
      setFilteredRegioni(regioni_italiane.filter(regione =>
        regione.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 3));
    } else {
      setFilteredRegioni([]);
    }
  };

  const handleSelectRegione = (regione) => {
    setSelectedRegione(regione);
    setSearchRegione(regione);
    setFilteredRegioni([]);
  };

  const handleSearchProvincia = (e) => {
    const value = e.target.value;
    setSearchProvincia(value);
    if (selectedRegione && value.length > 0) {
      setFilteredProvince(province_italiane[selectedRegione]?.filter(provincia =>
        provincia.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 3) || []);
    } else {
      setFilteredProvince([]);
    }
  };

  const handleSelectProvincia = (provincia) => {
    setSelectedProvincia(provincia);
    setSearchProvincia(provincia);
    setFilteredProvince([]);
  };

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
    if (!acceptedTerms) {
      toast.error("Si prega di accettare i termini e le condizioni d'uso.", {
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
          selectedRegione,
          selectedProvincia,
          comune,
          via,
          numero_iscrizione_albo,
          titolo,
          denominazione_farmacia,
          indirizzo_farmacia,
          partita_iva,
          comune_farmacia: searchComuneFarmacia,
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

  const handleSearchComuneFarmacia = (e) => {
    const value = e.target.value;
    setSearchComuneFarmacia(value);
    if (value.length > 1) {
      setFilteredComuniFarmacia(
        comuni_italiani.filter((comune) =>
          comune.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 5)
      );
    } else {
      setFilteredComuniFarmacia([]);
    }
  };

  const handleSelectComuneFarmacia = (comune) => {
    setSearchComuneFarmacia(comune);
    setFilteredComuniFarmacia([]);
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center mx-auto my-10 p-5 rounded-lg shadow-md max-w-3xl"
    >
      <ToastContainer position="top-right" />
      <h1 className="text-2xl text-gray-600 text-center mb-4">Registrazione</h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col w-full text-center">
          <div className="flex-1">
            <select
              className="border border-gray-300 rounded w-full p-2 text-center text-xl"
              onChange={(e) => {
                setUserRole(e.target.value);
              }}
              defaultValue={""}
            >
              <option value={""} disabled hidden>
                Seleziona un ruolo*
              </option>
              <option value={"farmacista"}>Farmacista</option>
              <option value={"titolare"}>Titolare di Farmacia</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <label className="block mb-2 text-xl">Nome*</label>
            <input
              className="w-full p-2 border border-gray-300 rounded text-xl"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 text-xl">Cognome*</label>
            <input
              className="w-full p-2 border border-gray-300 rounded text-xl"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Cognome"
            />
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <label className="block mb-2 text-xl">Data di Nascita*</label>
            <input
              className="w-full p-2 border border-gray-300 rounded text-xl"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 text-xl">Luogo di Nascita*</label>
            <input
              className="w-full p-2 border border-gray-300 rounded text-xl"
              type="text"
              value={placeOfBirth}
              onChange={(e) => setPlaceOfBirth(e.target.value)}
              placeholder="Luogo di Nascita"
            />
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <label className="block mb-2 text-xl">Regione di Residenza*</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded text-xl"
              value={searchRegione}
              onChange={handleSearchRegione}
              placeholder="Cerca Regione"
            />
            {filteredRegioni.length > 0 && (
              <ul className="bg-white border mt-1 rounded shadow max-h-48 overflow-y-auto">
                {filteredRegioni.map((regione) => (
                  <li
                    key={regione}
                    onClick={() => handleSelectRegione(regione)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {regione}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex-1">
            <label className="block mb-2 text-xl">Provincia di Residenza*</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded text-xl"
              value={searchProvincia}
              onChange={handleSearchProvincia}
              placeholder="Cerca Provincia"
              disabled={!selectedRegione}
            />
            {filteredProvince.length > 0 && (
              <ul className="bg-white border mt-1 rounded shadow max-h-48 overflow-y-auto">
                {filteredProvince.map((provincia) => (
                  <li
                    key={provincia}
                    onClick={() => handleSelectProvincia(provincia)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {provincia}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <label className="block mb-2 text-xl">Comune*</label>
            <input
              className="w-full p-2 border border-gray-300 rounded text-xl"
              type="text"
              placeholder="Comune"
              onChange={(e) => setComune(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 text-xl">Via/Piazza</label>
            <input
              className="w-full p-2 border border-gray-300 rounded text-xl"
              type="text"
              placeholder="Via/Piazza"
              onChange={(e) => setVia(e.target.value)}
            />
          </div>
        </div>

        {userRole === "farmacista" && (
          <div className="flex justify-between gap-4">
            <div className="flex-1">
              <label className="block mb-2 text-xl">N° Iscrizione Albo dei Farmacisti*</label>
              <input
                className="w-full p-2 border border-gray-300 rounded text-xl"
                type="text"
                placeholder="N° Iscrizione"
                onChange={(e) => setNumero_iscrizione_albo(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-xl">Titolo di studio</label>
              <input
                className="w-full p-2 border border-gray-300 rounded text-xl"
                type="text"
                placeholder="Titolo di studio"
                onChange={(e) => setTitolo(e.target.value)}
              />
            </div>
          </div>
        )}

        {userRole === "titolare" && (
          <>
            <div className="flex justify-between gap-4">
              <div className="flex-1">
                <label className="block mb-2 text-xl">Denominazione Farmacia*</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded text-xl"
                  type="text"
                  placeholder="Denominazione Farmacia"
                  onChange={(e) => setDenominazione_farmacia(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2 text-xl">Partita IVA*</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded text-xl"
                  type="text"
                  placeholder="Partita Iva"
                  onChange={(e) => setPartita_iva(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-xl">Comune della Farmacia</label>
              <input
                className="w-full p-2 border border-gray-300 rounded text-xl"
                type="text"
                placeholder="Comune della Farmacia"
                value={searchComuneFarmacia}
                onChange={handleSearchComuneFarmacia}
              />
              {filteredComuniFarmacia.length > 0 && (
                <ul className="bg-white border mt-1 rounded shadow max-h-48 overflow-y-auto">
                  {filteredComuniFarmacia.map((comune) => (
                    <li
                      key={comune}
                      onClick={() => handleSelectComuneFarmacia(comune)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {comune}
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </>
        )}

        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <label className="block mb-2 text-xl">Email*</label>
            <input
              className="w-full p-2 border border-gray-300 rounded text-xl"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 text-xl">Telefono*</label>
            <input
              className="w-full p-2 border border-gray-300 rounded text-xl"
              type="text"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="Telefono"
            />
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <label className="block mb-2 text-xl">Password*</label>
            <input
              className="w-full p-2 border border-gray-300 rounded text-xl"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 text-xl">Conferma Password*</label>
            <input
              className="w-full p-2 border border-gray-300 rounded text-xl"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
              placeholder="Conferma Password"
            />
          </div>
        </div>
      </div>

      {loading && <Loading />}

      <div className="flex items-center justify-center gap-5 mt-6">
        <input
          type="checkbox"
          checked={acceptedTerms}
          className="w-6 h-6 accent-blue-600 checkbox"
          onChange={() => setAcceptedTerms(!acceptedTerms)}
        />
        <label htmlFor="terms" className="text-lg text-gray-600">
          Ho preso visione e accetto i{" "}
          <Link to="/terms" target="_blank" className="text-blue-600 hover:underline">
            Termini e Condizioni
          </Link>{" "}
          e la{" "}
          <Link to="/privacy" target="_blank" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </label>
      </div>

      <div className="flex justify-center items-center mt-5">
        <button
          className="w-2/3 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out text-xl"
          type="submit"
        >
          Registrati
        </button>
      </div>

      <div className="text-center mt-4">
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
