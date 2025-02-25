import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import api from "../api";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";
import Loading from "../components/Loading";

const jobOffers = [
  { name: "Farmacia Centrale", lat: 41.9028, lon: 12.4964 },
  { name: "Clinica Salute", lat: 45.4642, lon: 9.19 },
  { name: "Farmacia Napoli Centro", lat: 40.8522, lon: 14.2681 },
];

function MapUpdater({ selectedJob }) {
  const map = useMap();
  useEffect(() => {
    if (selectedJob) {
      map.setView([selectedJob.lat, selectedJob.lon], 14);
    }
  }, [selectedJob, map]);
  return null;
}

MapUpdater.propTypes = {
  selectedJob: PropTypes.shape({
    name: PropTypes.string,
    lat: PropTypes.number,
    lon: PropTypes.number,
  }),
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    async function createOffer() {
      try {
        setLoading(true);

        // Fetch offers from API
        const response = await api.get("/api/offers/");
        console.log("Offers response:", response.data);
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
            {loading && <Loading />}
          </ul>
        </aside>

        {/* Map Component */}
        <div className="flex-1 h-[500px] rounded-lg shadow-lg m-4">
          <MapContainer
            center={[41.9028, 12.4964]}
            zoom={6}
            className="h-full w-full rounded-lg"
          >
            <MapUpdater selectedJob={selectedJob} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
            {jobOffers.map((offer, index) => (
              <Marker key={index} position={[offer.lat, offer.lon]}>
                <Popup>
                  <b>{offer.name}</b>
                  <br />
                  Offerta disponibile
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
