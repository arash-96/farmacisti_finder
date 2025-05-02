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

const redIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const blueIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
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
                .map((offer, index) => {
                    const isSelected = offer.denominazione_farmacia === selectedJob;
                    const icon = isSelected ? redIcon : blueIcon;

                    return (
                        <Marker key={index} position={[offer.lat, offer.lng]} icon={icon}>
                            <Popup>
                                <b>{offer.denominazione_farmacia}</b>
                            </Popup>
                        </Marker>
                    );
                })}
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
