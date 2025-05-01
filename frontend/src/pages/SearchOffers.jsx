import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import api from "../api";
import Loading from "../components/Loading";
import MapComponent from "../components/MapComponent";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [offers, setOffers] = useState([]);
  const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    async function fetchOffers() {
      try {
        setLoading(true);
        const response = await api.get("/api/offers/");
        setOffers(response.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOffers();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/api/user/details/");
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    }

    fetchUser();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSendCv = async (offer) => {
    if (!currentUser?.profile?.pdf_file) {
      alert("CV non trovato! Verificare che il CV sia presente nell'apposita sezione.");
      return;
    }

    try {
      const response = await api.post("/api/candidature/", {
        offer_id: offer.id,
      });

      alert("CV inviato con successo!");
    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Errore durante l'invio del CV.");
      }
      console.error("Error sending CV:", error);
    }
  };

  const filteredOffers = offers.filter((offer) => {
    if (!searchCity.trim()) return true;
    return offer.comune_farmacia?.toLowerCase().includes(searchCity.toLowerCase());
  });

  return (
    <div className="bg-gray-100 font-roboto min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row flex-1 mt-4">
        <aside className="w-full md:w-1/3 bg-white shadow-lg p-6 rounded-lg m-4">
          <h2 className="text-xl font-semibold text-blue-600">
            Farmacie che Cercano Personale
          </h2>
          <p className="text-gray-600 mb-4">
            Clicca su un&apos;offerta per visualizzarla sulla mappa.
          </p>
          <input
            type="text"
            placeholder="Cerca per comune..."
            className="w-full p-2 border rounded mb-4"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
          <ul className="space-y-4">
            {filteredOffers.map((offer, index) => (
              <li
                key={index}
                className="p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 mb-2 transition-all duration-300"
                onClick={() =>
                  setSelectedJob(selectedJob === offer ? null : offer)
                }
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-lg"><strong>{offer.denominazione_farmacia}</strong></p>
                  <span className="text-gray-500">
                    {selectedJob === offer ? "▲" : "▼"}
                  </span>
                </div>
                {selectedJob === offer && (
                  <div className="mt-3 space-y-2">
                    <p className="text-gray-700"><strong>Comune farmacia:</strong> {offer.comune_farmacia}</p>
                    <p className="text-gray-700"><strong>Titolo:</strong> {offer.title}</p>
                    <p className="text-gray-700">
                      <strong>Descrizione:</strong> {offer.description}
                    </p>
                    <p className="text-gray-700">
                      <strong>Salario:</strong> € {offer.salary} all'ora
                    </p>
                    {(offer.date_from || offer.date_to) && (
                      <p className="text-gray-700">
                        <strong>Periodo:</strong>{" "}
                        {formatDate(offer.date_from)} - {formatDate(offer.date_to)}
                      </p>
                    )}
                    <button
                      className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSendCv(offer);
                      }}
                    >
                      Manda CV
                    </button>
                  </div>
                )}
              </li>
            ))}
            {loading && <Loading />}
          </ul>
        </aside>

        <div className="flex-1 h-[1000px] rounded-lg shadow-lg m-4">
          <MapComponent jobOffers={offers} selectedJob={selectedJob?.denominazione_farmacia} />
        </div>
      </div>
    </div >
  );
}
