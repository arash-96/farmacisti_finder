import { useEffect, useState } from "react";
import api from "../api";
import { formatDateToUKStyle } from "../utils/dateFormatter";

export default function AllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 20;

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const [roleFilter, setRoleFilter] = useState("");

    useEffect(() => {
        fetchUsers();
    }, [searchTerm, roleFilter, currentPage]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get("/api/users/all/", {
                params: {
                    search: searchTerm,
                    role: roleFilter
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Errore durante il caricamento degli utenti:", error);
        } finally {
            setLoading(false);
        }
    };


    const fetchUserDetails = async (id) => {
        try {
            const response = await api.get(`/api/users/${id}/details/`);
            setSelectedUser(response.data);
            setShowModal(true);
        } catch (error) {
            console.error("Errore nel recupero dettagli utente:", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 text-blue-600 text-center">
                Elenco Utenti
            </h1>

            <div className="mb-4 text-center space-x-4">
                <input
                    type="text"
                    placeholder="Cerca per username o email..."
                    className="border border-gray-300 rounded px-3 py-2 w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="border border-gray-300 rounded px-3 py-2"
                    value={roleFilter}
                    onChange={(e) => {
                        setRoleFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="">Tutti i ruoli</option>
                    <option value="farmacista">Farmacista</option>
                    <option value="titolare">Titolare</option>
                </select>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-[40vh]">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
                </div>
            ) : (
                <>
                            <div className="text-sm text-gray-600 mb-2 text-center">
                Totale utenti trovati: <span className="font-semibold">{users.length - 4}</span>
            </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow rounded-lg">
                        <thead className="bg-blue-100 text-gray-700">
                            <tr>
                                <th className="py-2 px-4 border-b text-left">ID</th>
                                <th className="py-2 px-4 border-b text-left">Username</th>
                                <th className="py-2 px-4 border-b text-left">Ruolo</th>
                                <th className="py-2 px-4 border-b text-left">Regione preferita</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-gray-50 cursor-pointer"
                                    onClick={() => fetchUserDetails(user.id)}
                                >
                                    <td className="py-2 px-4 border-b">{user.id}</td>
                                    <td className="py-2 px-4 border-b">{user.username}</td>
                                    <td className="py-2 px-4 border-b capitalize">{user.role}</td>
                                    <td className="py-2 px-4 border-b">{user.preferredRegion || "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-4 space-x-2">
                        <button
                            className="px-3 py-1 bg-blue-200 rounded disabled:opacity-50"
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            disabled={currentPage === 1}
                        >
                            ← Precedente
                        </button>
                        <span className="px-3 py-1 text-gray-700">
                            Pagina {currentPage} di {totalPages}
                        </span>
                        <button
                            className="px-3 py-1 bg-blue-200 rounded disabled:opacity-50"
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Successiva →
                        </button>
                    </div>

                </div>
                </>
            )}
            {/* MODAL */}
            {showModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowModal(false)}
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold mb-4">
                            Dettagli Utente: {selectedUser.username}
                        </h2>
                        <div className="space-y-2 text-sm">
                            <p><strong>Nome:</strong> {selectedUser.profile.name || "N/A"}</p>
                            <p><strong>Cognome:</strong> {selectedUser.profile.surname || "N/A"}</p>
                            <p><strong>Ruolo:</strong> {selectedUser.profile.userRole || "N/A"}</p>
                            <p><strong>Data di nascita:</strong> {formatDateToUKStyle(selectedUser.profile.dob) || "N/A"}</p>
                            <p><strong>Luogo di nascita:</strong> {selectedUser.profile.placeOfBirth || "N/A"}</p>
                            <p><strong>Telefono:</strong> {selectedUser.profile.telephone || "N/A"}</p>

                            <p><strong>Residenza:</strong> {[
                                selectedUser.profile.via,
                                selectedUser.profile.comune,
                                selectedUser.profile.provincia_residenza,
                                selectedUser.profile.regione_residenza
                            ].filter(Boolean).join(", ") || "N/A"}</p>

                            {/* Show these only if role is "farmacista" */}
                            {selectedUser.profile.userRole === "farmacista" && (
                                <>
                                    <p><strong>Titolo di studio:</strong> {selectedUser.profile.titolo || "N/A"}</p>
                                    <p><strong>Partita IVA:</strong> {selectedUser.profile.partita_iva || "N/A"}</p>
                                    <p><strong>Numero iscrizione albo:</strong> {selectedUser.profile.numero_iscrizione_albo || "N/A"}</p>
                                    <p><strong>Regione preferita:</strong> {selectedUser.profile.preferredRegion || "N/A"}</p>
                                    <p><strong>Consenso comunicazioni:</strong> {selectedUser.profile.communicationConsent ? "Sì" : "No"}</p>
                                </>
                            )}

                            {/* Show these only if role is "titolare" */}
                            {selectedUser.profile.userRole === "titolare" && (
                                <>
                                    <p><strong>Farmacia:</strong> {selectedUser.profile.denominazione_farmacia
                                        ? `${selectedUser.profile.denominazione_farmacia} - ${selectedUser.profile.indirizzo_farmacia || ''}`
                                        : "N/A"}</p>
                                    <p><strong>Comune farmacia:</strong> {selectedUser.profile.comune_farmacia || "N/A"}</p>
                                </>
                            )}

                            <p><strong>Descrizione:</strong> {selectedUser.profile.descrizione || "N/A"}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
