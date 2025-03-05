import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import PropTypes from "prop-types";

function MapComponent({ selectedJob, jobOffers }) {
    return (
        <MapContainer center={[41.9028, 12.4964]} zoom={6} className="h-full w-full rounded-lg">
            {selectedJob && <MapUpdater selectedJob={selectedJob} />}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
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
    );
}

MapComponent.propTypes = {
    selectedJob: PropTypes.shape({
        name: PropTypes.string,
        lat: PropTypes.number,
        lon: PropTypes.number,
    }),
    jobOffers: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            lat: PropTypes.number.isRequired,
            lon: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default MapComponent;
