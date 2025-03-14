import React, { useState, useEffect } from "react";
import api from "../api";

export default function PharmacySearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchPharmacies() {
            setLoading(true);
            try {
                const response = await api.get(`/api/get_pharmacies/?search=${searchTerm}`);
                setPharmacies(response.data);
            } catch (error) {
                console.error("Error fetching pharmacies:", error);
            } finally {
                setLoading(false);
            }
        }

        if (searchTerm.length > 0) {
            fetchPharmacies();
        } else {
            setPharmacies([]);
        }
    }, [searchTerm]);

    return (
        <div className="max-w-lg mx-auto p-4">
            <div className="relative flex items-center mb-4 border border-gray-300 rounded-lg shadow-sm">
                <span className="absolute left-3 text-gray-500">🔍</span>
                <input
                    type="text"
                    placeholder="Search for a pharmacy..."
                    className="pl-10 w-full border-none rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading && <p className="text-center text-gray-500">Loading...</p>}

            <div className="space-y-2">
                {pharmacies.map((pharmacy) => (
                    <div key={pharmacy.pharmacy_id} className="p-3 border rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">{pharmacy.pharmacy_name}</h2>
                        <p className="text-gray-600">{pharmacy.address}</p>
                        <p className="text-gray-600">📍 {pharmacy.provincia}</p>
                        <p className="text-gray-600">📞 {pharmacy.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
