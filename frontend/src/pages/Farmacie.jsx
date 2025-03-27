import React, { useState, useEffect } from "react";
import api from "../api";

export default function PharmacySearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [userSearchTerm, setUserSearchTerm] = useState("");
    const [pharmacies, setPharmacies] = useState([]);
    const [titolari, setTitolari] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch pharmacies based on searchTerm
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

    // Fetch all Titolari users
    useEffect(() => {
        async function fetchTitolari() {
            setLoading(true);
            try {
                const response = await api.get(`/api/users/titolare/?search=${userSearchTerm}`);
                const usersArray = Object.values(response.data);
                setTitolari(usersArray);
            } catch (error) {
                console.error("Error fetching titolari:", error);
            } finally {
                setLoading(false);
            }
        }

        // Fetch only if search term exists, otherwise reset list
        if (userSearchTerm.length > 0) {
            fetchTitolari();
        } else {
            setTitolari([]);
        }
    }, [userSearchTerm]);

    // Filter Titolari users based on search term
    const filteredTitolari = titolari.filter(user =>
        `${user.name} ${user.surname}`.toLowerCase().includes(userSearchTerm.toLowerCase())
    );

    return (
        <div className="flex justify-center gap-12 p-4">
            {/* Pharmacies Section */}
            <div className="max-w-md">
                <h2 className="text-xl font-semibold mt-6 mb-2">Farmacie d'Italia</h2>
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

                {/* {loading && <p className="text-center text-gray-500">Loading...</p>} */}

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

            {/* Titolari Users Section */}
            <div className="max-w-md">
                <h2 className="text-xl font-semibold mt-6 mb-2">Utenti Titolari</h2>

                {/* User Search Input */}
                <div className="relative flex items-center mb-4 border border-gray-300 rounded-lg shadow-sm">
                    <span className="absolute left-3 text-gray-500">🔍</span>
                    <input
                        type="text"
                        placeholder="Search for a user..."
                        className="pl-10 w-full border-none rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                        value={userSearchTerm}
                        onChange={(e) => setUserSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredTitolari.map((user, index) => (
                        <div key={index} className="p-3 border rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold">{user.name} {user.surname}</h2>
                            <p className="text-gray-600">📅 {user.dob}</p>
                            <p className="text-gray-600">📍 {user.provincia_residenza}, {user.regione_residenza}</p>
                            <p className="text-gray-600">📞 {user.telephone}</p>
                            <p className="text-gray-600">🏢 {user.denominazione_farmacia || "N/A"}</p>
                            <p className="text-gray-600">📜 {user.numero_iscrizione_albo}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
