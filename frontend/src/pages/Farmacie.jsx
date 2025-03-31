import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../api";

export default function PharmacySearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [userSearchTerm, setUserSearchTerm] = useState("");
    const [pharmacies, setPharmacies] = useState([]);
    const [titolari, setTitolari] = useState([]);
    const [loadingFarmacie, setLoadingFarmacie] = useState(false);
    const [loadingUserTitolari, setLoadingUserTitolari] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);

    //Modal states
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    const openModal = (user) => {
        setSelectedUser(user.id);
        getLocation(user.id);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setLat("");
        setLng("");
    };

    async function getLocation(userId) {
        try {
            const requestBody = { userId };

            const response = await api.post('/api/users/get_location/', requestBody);

            if (response.status === 200) {
                const { lat, lng } = response.data;
                setLat(lat ?? "");
                setLng(lng ?? "");
            } else {
                console.error('Failed to retrieve location. Status:', response.status);
            }
        } catch (error) {
            console.error('Error retrieving location:', error);
        }
    }



    const saveLocation = async () => {
        if (selectedUser) {
            setLoadingSave(true);
            try {
                const requestBody = {
                    userId: selectedUser,
                    lat: lat,
                    lng: lng
                };

                console.log(requestBody);

                const res = await api.post('/api/users/update_location/', requestBody);

                if (res.status === 200) {
                    toast.success("Latitudine e longitudine sono stati aggiornati!", {
                        position: "top-center",
                        autoClose: 1200,
                        closeButton: false,
                        hideProgressBar: true,
                    });
                }
                closeModal();
            } catch (error) {
                console.error('Error updating location:', error);
                if (error.response) {
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    console.error('Request error:', error.request);
                } else {
                    console.error('Error message:', error.message);
                }
            } finally {
                setLoadingSave(false);
            }
        }
    };


    // Fetch pharmacies based on searchTerm
    useEffect(() => {
        async function fetchPharmacies() {
            setLoadingFarmacie(true);
            try {
                const response = await api.get(`/api/get_pharmacies/?search=${searchTerm}`);
                setPharmacies(response.data);
            } catch (error) {
                console.error("Error fetching pharmacies:", error);
            } finally {
                setLoadingFarmacie(false);
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
            setLoadingUserTitolari(true);
            try {
                const response = await api.get(`/api/users/titolare/?search=${userSearchTerm}`);
                const usersArray = Object.values(response.data);
                console.log(response.data);
                setTitolari(usersArray);
            } catch (error) {
                console.error("Error fetching titolari:", error);
            } finally {
                setLoadingUserTitolari(false);
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
        <div className="container mx-auto p-6">
            <ToastContainer position="top-right" />
            <h1 className="text-3xl font-bold text-center mb-6">Farmacie e Utenti Titolari</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pharmacies Section */}
                <div className="flex flex-col h-full">
                    <h2 className="text-xl font-semibold text-center mb-4">Farmacie d'Italia</h2>

                    {/* Search Input for Pharmacies */}
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

                    {/* Loading Spinner for Pharmacies */}
                    {loadingFarmacie ? (
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full border-t-4 border-blue-500 w-12 h-12"></div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pharmacies.map((pharmacy) => (
                                <div key={pharmacy.pharmacy_id} className="p-4 border rounded-lg shadow-md flex-1 min-h-[180px]">
                                    <h2 className="text-lg font-semibold">{pharmacy.pharmacy_name}</h2>
                                    <p className="text-gray-600">{pharmacy.address}</p>
                                    <p className="text-gray-600">📍 {pharmacy.provincia}</p>
                                    <p className="text-gray-600">📞 0{pharmacy.phone}</p>
                                    <p className="text-gray-600">📍 Latitude: {pharmacy.lat}</p>
                                    <p className="text-gray-600">📍 Longitude: {pharmacy.lng}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Titolari Users Section */}
                <div className="flex flex-col h-full">
                    <h2 className="text-xl font-semibold text-center mb-4">Utenti Titolari</h2>

                    {/* Search Input for Titolari */}
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

                    {/* Loading Spinner for Titolari */}
                    {loadingUserTitolari ? (
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full border-t-4 border-blue-500 w-12 h-12"></div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredTitolari.map((user, index) => (
                                <div key={index} className="p-4 border rounded-lg shadow-md flex-1 min-h-[180px]" onClick={() => openModal(user)}>
                                    <h2 className="text-lg font-semibold">{user.name} {user.surname}</h2>
                                    <p className="text-gray-600">📅 {user.dob}</p>
                                    <p className="text-gray-600">📍 {user.provincia_residenza}, {user.regione_residenza}</p>
                                    <p className="text-gray-600">📞 0{user.telephone}</p>
                                    <p className="text-gray-600">🏢 {user.denominazione_farmacia || "N/A"}</p>
                                    <p className="text-gray-600">📜 {user.numero_iscrizione_albo}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <div className="mb-4">
                            <label className="block text-gray-600">Latitude</label>
                            <input
                                type="text"
                                value={lat}
                                onChange={(e) => setLat(e.target.value)}
                                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600">Longitude</label>
                            <input
                                type="text"
                                value={lng}
                                onChange={(e) => setLng(e.target.value)}
                                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={closeModal}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md w-1/2 mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveLocation}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md w-1/2 flex items-center justify-center"
                                disabled={loadingSave}
                            >
                                {loadingSave ? (
                                    <div className="animate-spin rounded-full border-t-4 border-white w-6 h-6"></div>
                                ) : (
                                    "Save"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );


}
