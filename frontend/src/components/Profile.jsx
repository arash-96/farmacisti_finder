import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import api from "../api";
import DeleteModal from "./DeleteModal";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [telephone, setTelephone] = useState("");
  const [regione_residenza, setRegione_residenza] = useState("");
  const [provincia_residenza, setProvincia_residenza] = useState("");
  const [comune, setComune] = useState("");
  const [via, setVia] = useState("");
  const [numero_iscrizione_albo, setNumero_iscrizione_albo] = useState("");
  const [titolo, setTitolo] = useState("");
  const [denominazione_farmacia, setDenominazione_farmacia] = useState("");
  const [indirizzo_farmacia, setIndirizzo_farmacia] = useState("");
  const [partita_iva, setPartita_iva] = useState("");
  const [preferredRegion, setPreferredRegion] = useState("");
  const [communicationConsent, setCommunicationConsent] = useState(false);

  const [delModalOpen, setDelModalOpen] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    api
      .get("/api/user/details/")
      .then((res) => res.data)
      .then((data) => {
        populateData(data);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  const populateData = (data) => {
    const profile = data["profile"];

    setUserRole(profile["userRole"] || "");
    setName(profile["name"] || "");
    setSurname(profile["surname"] || "");
    setDob(profile["dob"] || "");
    setPlaceOfBirth(profile["placeOfBirth"] || "");
    setTelephone(profile["telephone"] || "");
    setRegione_residenza(profile["regione_residenza"] || "");
    setProvincia_residenza(profile["provincia_residenza"] || "");
    setComune(profile["comune"] || "");
    setVia(profile["via"] || "");
    setNumero_iscrizione_albo(profile["numero_iscrizione_albo"] || "");
    setTitolo(profile["titolo"] || "");
    setDenominazione_farmacia(profile["denominazione_farmacia"] || "");
    setIndirizzo_farmacia(profile["indirizzo_farmacia"] || "");
    setPartita_iva(profile["partita_iva"] || "");
    setUsername(data["username"] || "");
    setCommunicationConsent(profile["communicationConsent"] || "");
    setPreferredRegion(profile["preferredRegion"] || "");
  };

  const validateForm = () => {
    if (!username || !name || !surname || !dob || !telephone) {
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

    if (!/^\d{8,}$/.test(telephone)) {
      toast.error("Inserisci un numero di telefono valido.", {
        position: "top-center",
        autoClose: 1200,
        closeButton: false,
        hideProgressBar: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedProfile = {
      profile: {
        name,
        surname,
        dob,
        placeOfBirth,
        telephone,
        regione_residenza,
        provincia_residenza,
        comune,
        via,
        numero_iscrizione_albo,
        titolo,
        denominazione_farmacia,
        indirizzo_farmacia,
        partita_iva,
        preferredRegion,
        communicationConsent,
      },
    };

    api
      .put("api/user/details/", updatedProfile)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Profilo aggiornato correttamente.", {
            position: "top-center",
            autoClose: 1200,
            closeButton: false,
            hideProgressBar: true,
          });
        } else {
          toast.error("Si e' verificato un errore.", {
            position: "top-center",
            autoClose: 1200,
            closeButton: false,
            hideProgressBar: true,
          });
        }
      })
      .catch((err) =>
        toast.error(err, {
          position: "top-center",
          autoClose: 1200,
          closeButton: false,
          hideProgressBar: true,
        })
      );
  };

  const handleCancel = () => {
    setIsOpen(false);
    alert("Cancelled!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
    );
  }

  return (
    <form className="mt-6 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <ToastContainer position="top-right" />
      <div className="flex justify-between items-center mb-4">
        <Link to="/">
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Torna alla Home
          </button>
        </Link>
      </div>
      <h1 className="text-lg text-gray-600 text-center">Profilo Personale</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            className="w-full mt-1 p-2 border rounded"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cognome
          </label>
          <input
            className="w-full mt-1 p-2 border rounded"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Data di Nascita
          </label>
          <input
            className="w-full mt-1 p-2 border rounded"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Luogo di Nascita
          </label>
          <input
            className="w-full mt-1 p-2 border rounded"
            type="text"
            value={placeOfBirth}
            onChange={(e) => setPlaceOfBirth(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            className={`w-full mt-1 p-2 border rounded ${username ? "bg-gray-100" : ""
              }`}
            type="text"
            value={username}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Telefono
          </label>
          <input
            className="w-full mt-1 p-2 border rounded"
            type="text"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Regione di Residenza
          </label>
          <input
            className="w-full mt-1 p-2 border rounded"
            type="text"
            value={regione_residenza}
            onChange={(e) => setRegione_residenza(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Provincia di Residenza
          </label>
          <input
            className="w-full mt-1 p-2 border rounded"
            type="text"
            value={provincia_residenza}
            onChange={(e) => setProvincia_residenza(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Comune
          </label>
          <input
            className="w-full mt-1 p-2 border rounded"
            type="text"
            value={comune}
            onChange={(e) => setComune(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Via</label>
          <input
            className="w-full mt-1 p-2 border rounded"
            type="text"
            value={via}
            onChange={(e) => setVia(e.target.value)}
          />
        </div>
        {userRole === "titolare" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Denominazione Farmacia
              </label>
              <input
                className={`w-full mt-1 p-2 border rounded ${denominazione_farmacia ? "bg-gray-100" : ""
                  }`}
                type="text"
                value={denominazione_farmacia}
                onChange={(e) => setDenominazione_farmacia(e.target.value)}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Indirizzo Farmacia
              </label>
              <input
                className={`w-full mt-1 p-2 border rounded ${indirizzo_farmacia ? "bg-gray-100" : ""
                  }`}
                type="text"
                value={indirizzo_farmacia}
                onChange={(e) => setIndirizzo_farmacia(e.target.value)}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Partita IVA
              </label>
              <input
                className={`w-full mt-1 p-2 border rounded ${partita_iva ? "bg-gray-100" : ""
                  }`}
                type="text"
                value={partita_iva}
              />
            </div>
          </>
        )}
        {userRole === "farmacista" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                N° Iscrizione Albo dei Farmacisti
              </label>
              <input
                className={`w-full mt-1 p-2 border rounded ${numero_iscrizione_albo ? "bg-gray-100" : ""
                  }`}
                type="text"
                value={numero_iscrizione_albo}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Titolo di studio
              </label>
              <input
                className="w-full mt-1 p-2 border rounded"
                type="text"
                value={titolo}
                onChange={(e) => setTitolo(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Regione di preferenza
              </label>
              <input
                className="w-full mt-1 p-2 border rounded"
                type="text"
                value={preferredRegion}
                onChange={(e) => setPreferredRegion(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
      {userRole === "farmacista" && (
        <>
          <div className="flex items-start justify-center gap-5 mt-4 ml-20">
            <input
              type="checkbox"
              checked={communicationConsent}
              className="w-6 h-6 mt-1 accent-blue-600 checkbox"
              onChange={() => setCommunicationConsent(!communicationConsent)}
            />
            <label htmlFor="communicationConsent" className="text-lg text-gray-600">
              Desidero ricevere comunicazioni e offerte personalizzate in base alla regione da me indicata.{" "}
            </label>
          </div>
        </>
      )}
      <div className="mt-6 text-center">
        <button
          type="submit"
          className="w-3/5 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Aggiorna Profilo
        </button>
      </div>
      <div className="mt-6 text-center">
        <button
          type="button"
          className="w-3/5 bg-red-500 text-white p-2 rounded hover:bg-red-600"
          onClick={() => setDelModalOpen(true)}
        >
          Elimina Account
        </button>
      </div>
      <DeleteModal isOpen={delModalOpen} setIsOpen={setDelModalOpen} />
    </form>
  );
}

export default Profile;
