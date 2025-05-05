import React, { useEffect, useState } from "react";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";
import { Link } from 'react-router-dom';

export default function TitolareCandidature() {
    const [candidatures, setCandidatures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCandidatures();
    }, []);

    useEffect(() => {
        console.log(candidatures);
    }, [candidatures]);

    const fetchCandidatures = async () => {
        try {
            const res = await api.get("/api/titolare/candidatures/");
            setCandidatures(res.data);
        } catch (error) {
            console.error("Errore durante il recupero delle candidature:", error);
            toast.error("Errore nel caricamento delle candidature");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Link to="/" className="ml-32">
                <button
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Torna alla Home
                </button>
            </Link>
            <div className="flex justify-center p-4">
                <div className="w-full max-w-4xl">
                    <ToastContainer />
                    <h1 className="text-2xl font-bold mb-4">Candidature Ricevute</h1>

                    {loading ? (
                        <div className="flex justify-center items-center h-[50vh]">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                        </div>
                    ) : candidatures.length === 0 ? (
                        <p>Nessuna candidatura trovata.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center ">
                            {candidatures.map((item) => (
                                <div key={item.id} className="border p-4 rounded shadow text-center">
                                    <h2 className="text-lg font-semibold mb-2">
                                        {item.farmacista.name} {item.farmacista.surname}
                                    </h2>
                                    <p><strong>Titolo:</strong> {item.farmacista.titolo}</p>
                                    <p><strong>Residenza:</strong> {item.farmacista.comune}, {item.farmacista.provincia_residenza}</p>
                                    <p><strong>Telefono:</strong> {item.farmacista.telephone}</p>
                                    <p><strong>Data invio:</strong> {new Date(item.submitted_at).toLocaleString().substring(0, 17)}</p>
                                    <p>
                                        <strong>CV candidato:</strong>{' '}
                                        <a
                                            href={`data:application/pdf;base64,${item.farmacista.pdf_file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            Visualizza PDF
                                        </a>
                                    </p>
                                    <hr className="my-2 mx-auto w-1/2" />
                                    <p><strong>Offerta:</strong> {item.offer.title}</p>
                                    <p>{item.offer.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
