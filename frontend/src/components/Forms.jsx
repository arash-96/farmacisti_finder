import { useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import Loading from "../components/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const regioni_italiane = [
  "Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna",
  "Friuli-Venezia Giulia", "Lazio", "Liguria", "Lombardia", "Marche",
  "Molise", "Piemonte", "Puglia", "Sardegna", "Sicilia", "Toscana",
  "Trentino-Alto Adige", "Umbria", "Valle d'Aosta", "Veneto"
];

const province_italiane = {
  "Abruzzo": ["L'Aquila", "Teramo", "Pescara", "Chieti"],
  "Basilicata": ["Potenza", "Matera"],
  "Calabria": ["Catanzaro", "Cosenza", "Reggio Calabria", "Crotone", "Vibo Valentia"],
  "Campania": ["Napoli", "Salerno", "Caserta", "Avellino", "Benevento"],
  "Emilia-Romagna": ["Bologna", "Modena", "Parma", "Reggio Emilia", "Ferrara", "Ravenna", "Forlì-Cesena", "Piacenza", "Rimini"],
  "Friuli-Venezia Giulia": ["Udine", "Trieste", "Gorizia", "Pordenone"],
  "Lazio": ["Roma", "Latina", "Frosinone", "Viterbo", "Rieti"],
  "Liguria": ["Genova", "Imperia", "La Spezia", "Savona"],
  "Lombardia": ["Milano", "Bergamo", "Brescia", "Como", "Cremona", "Lecco", "Lodi", "Mantova", "Monza e Brianza", "Pavia", "Sondrio", "Varese"],
  "Marche": ["Ancona", "Ascoli Piceno", "Fermo", "Macerata", "Pesaro e Urbino"],
  "Molise": ["Campobasso", "Isernia"],
  "Piemonte": ["Torino", "Alessandria", "Asti", "Biella", "Cuneo", "Novara", "Verbano-Cusio-Ossola", "Vercelli"],
  "Puglia": ["Bari", "Brindisi", "Foggia", "Lecce", "Taranto", "Barletta-Andria-Trani"],
  "Sardegna": ["Cagliari", "Sassari", "Nuoro", "Oristano", "Sud Sardegna"],
  "Sicilia": ["Palermo", "Catania", "Messina", "Agrigento", "Caltanissetta", "Enna", "Ragusa", "Siracusa", "Trapani"],
  "Toscana": ["Firenze", "Arezzo", "Grosseto", "Livorno", "Lucca", "Massa-Carrara", "Pisa", "Pistoia", "Prato", "Siena"],
  "Trentino-Alto Adige": ["Trento", "Bolzano"],
  "Umbria": ["Perugia", "Terni"],
  "Valle d'Aosta": ["Aosta"],
  "Veneto": ["Venezia", "Verona", "Vicenza", "Treviso", "Padova", "Rovigo", "Belluno"],
};

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

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" && selectedIndex < filteredOptions.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else if (e.key === "ArrowUp" && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      setQuery(filteredOptions[selectedIndex]);
      onSelect(filteredOptions[selectedIndex]);
      setFilteredOptions([]);
    }
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
      <h1 className="text-2xl text-gray-600 text-center">Registrazione</h1>
      <div className="form-grid">
        <div className="form-row">
          <div className="form-row text-center w-full">
            <div className="form-group">
              <select
                className="select select-bordered w-full text-center text-xl"
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
            <label className="form-label text-xl">Nome*</label>
            <input
              className="form-input text-xl"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
            />
          </div>
          <div className="form-group">
            <label className="form-label text-xl">Cognome*</label>
            <input
              className="form-input text-xl"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Cognome"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label text-xl">Data di Nascita*</label>
            <input
              className="form-input text-xl"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label text-xl">Luogo di Nascita*</label>
            <input
              className="form-input text-xl"
              type="text"
              value={placeOfBirth}
              onChange={(e) => setPlaceOfBirth(e.target.value)}
              placeholder="Luogo di Nascita"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label text-xl">Regione di Residenza*</label>
            <input
              type="text"
              className="form-input text-xl"
              value={searchRegione}
              onChange={handleSearchRegione}
              placeholder="Cerca Regione"
            />
            {filteredRegioni.length > 0 && (
              <ul>
                {filteredRegioni.map((regione) => (
                  <li key={regione} onClick={() => handleSelectRegione(regione)}>
                    {regione}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-group">
            <label className="form-label text-xl">
              Provincia di Residenza*
            </label>
            <input
              type="text"
              className="form-input text-xl"
              value={searchProvincia}
              onChange={handleSearchProvincia}
              placeholder="Cerca Provincia"
              disabled={!selectedRegione}
            />
            {filteredProvince.length > 0 && (
              <ul>
                {filteredProvince.map((provincia) => (
                  <li key={provincia} onClick={() => handleSelectProvincia(provincia)}>
                    {provincia}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label text-xl">Comune*</label>
            <input
              className="form-input text-xl"
              type="text"
              placeholder="Comune"
              onChange={(e) => setComune(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label text-xl">Via/Piazza</label>
            <input
              className="form-input text-xl"
              type="text"
              placeholder="Via/Piazza"
              onChange={(e) => setVia(e.target.value)}
            />
          </div>
        </div>
        {userRole === "farmacista" && (
          <div className="form-row">
            <div className="form-group">
              <label className="block mb-2 form-label text-xl">
                N° Iscrizione Albo dei Farmacisti*
              </label>
              <input
                className="form-input text-xl"
                type="text"
                placeholder="N° Iscrizione"
                onChange={(e) => setNumero_iscrizione_albo(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="block mb-2 form-label text-xl">
                Titolo di studio
              </label>
              <input
                className="form-input text-xl"
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
              <label className="form-label text-xl">
                Denominazione Farmacia*
              </label>
              <input
                className="form-input text-xl"
                type="text"
                placeholder="Denominazione Farmacia"
                onChange={(e) => setDenominazione_farmacia(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label text-xl">Partita IVA*</label>
              <input
                className="form-input text-xl"
                type="text"
                placeholder="Partita Iva"
                onChange={(e) => setPartita_iva(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label className="form-label text-xl">Email*</label>
            <input
              className="form-input text-xl"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label className="form-label text-xl">Telefono*</label>
            <input
              className="form-input text-xl"
              type="text"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="Telefono"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label text-xl">Password*</label>
            <input
              className="form-input text-xl"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label text-xl">Conferma Password*</label>
            <input
              className="form-input text-xl"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
              placeholder="Conferma Password"
            />
          </div>
        </div>
      </div>
      {loading && <Loading />}
      <div className="flex text-center items-center justify-center">
        <input
          type="checkbox"
          checked={acceptedTerms}
          className="checkbox mr-2"
          onChange={() => setAcceptedTerms(!acceptedTerms)} />
        <label htmlFor="terms" className="text-lg text-gray-600">
          Accetto i <Link to="/terms" target="_blank" className="text-blue-600 hover:underline">Termini e Condizioni</Link> e la
          <Link to="/privacy" target="_blank" className="text-blue-600 hover:underline"> Privacy Policy</Link>
        </label>
      </div>
      <div className="button-container">
        <button
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out text-xl"
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
