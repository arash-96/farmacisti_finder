import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import api from "../api";
import Loading from "../components/Loading";
import MapComponent from "../components/MapComponent";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [offers, setOffers] = useState([
    {
      title: "",
      description: "",
      salary: "",
      time: "",
    },
  ]);
  const jobOffers = [
    { name: "Farmacia Centrale", lat: 41.9028, lon: 12.4964 },
    { name: "Clinica Salute", lat: 45.4642, lon: 9.19 },
    { name: "Farmacia Napoli Centro", lat: 40.8522, lon: 14.2681 },
  ];

  // const addOffer = (newOffer) => {
  //   setOffers([...offers, newOffer]);
  // };

  // const updateOffer = (index, updatedOffer) => {
  //   const newOffers = [...offers];
  //   newOffers[index] = updatedOffer;
  //   setOffers(newOffers);
  // };

  useEffect(() => {
    async function createOffer() {
      try {
        setLoading(true);
        // Fetch offers from API
        const response = await api.get("/api/offers/");
        setOffers(response.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    }

    createOffer();
  }, []); //


  return (
    <div className="bg-gray-100 font-roboto min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 mt-4">
        {/* Job Offers Sidebar */}
        <aside className="w-full md:w-1/3 bg-white shadow-lg p-6 rounded-lg m-4">
          <h2 className="text-xl font-semibold text-blue-600">
            Farmacie che Cercano Personale
          </h2>
          <p className="text-gray-600 mb-4">
            Clicca su un&apos;offerta per visualizzarla sulla mappa.
          </p>
          <ul className="space-y-4">
            {jobOffers.map((offer, index) => (
              <li
                key={index}
                className="p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                onClick={() => setSelectedJob(offer)}
              >
                {offer.name}
              </li>
            ))}
            {offers.map((offer, index) => (
              <li
                key={index}
                className="p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 mb-2 transition-all duration-300"
                onClick={() =>
                  setSelectedJob(selectedJob === offer ? null : offer)
                }
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">{offer.title}</span>
                  <span className="text-gray-500">
                    {selectedJob === offer ? "▲" : "▼"}
                  </span>
                </div>
                {selectedJob === offer && (
                  <div className="mt-3 space-y-2">
                    <p className="text-gray-700">{offer.description}</p>
                    <p className="text-gray-700">
                      <strong>Salario:</strong> € {offer.salary}
                    </p>
                    <p className="text-gray-700">
                      <strong>Orario:</strong> {offer.time}
                    </p>
                  </div>
                )}
              </li>
            ))}
            {loading && <Loading />}
          </ul>
        </aside>

        {/* Map Component */}
        <div className="flex-1 h-[1000px] rounded-lg shadow-lg m-4">
          <MapComponent selectedJob={selectedJob} jobOffers={jobOffers} />
        </div>
      </div>
    </div>
  );
}

