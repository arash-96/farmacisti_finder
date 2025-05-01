import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css"; // This is very important!

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet's default icon path issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});


function MapComponent({ jobOffers, selectedJob }) {
    return (
        <MapContainer center={[41.9028, 12.4964]} zoom={6} className="h-full w-full rounded-lg">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
            />
            {jobOffers
                .filter((offer) => offer.lat != null && offer.lng != null)
                .map((offer, index) => (
                    <Marker key={index} position={[offer.lat, offer.lng]}>
                        <Popup>
                            <b>{offer.denominazione_farmacia}</b>
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
