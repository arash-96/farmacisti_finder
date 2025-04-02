import { useEffect, useState, Fragment } from "react";
import api from "../api";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import CreateOffer from "../components/CreateOffer";

export default function MyOffers() {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [openCreateModal, setCreateModal] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [offerToDelete, setOfferToDelete] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const res = await api.get("/api/offers/my/");
            setOffers(res.data);
        } catch (error) {
            console.error("Errore durante il caricamento delle offerte:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="container mx-auto p-6 mb-80">
            <h1 className="text-2xl font-bold mb-6 text-center text-purple-600">
                Le Mie Offerte
            </h1>

            {loading ? (
                <p className="text-center">Caricamento...</p>
            ) : offers.length === 0 ? (
                <p className="text-center">Nessuna offerta trovata.</p>
            ) : (
                <div className="grid gap-4">
                    {offers.map((offer) => (
                        <div
                            key={offer.id}
                            className="p-4 border rounded-lg shadow flex justify-between items-center"
                        >
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">{offer.title}</h2>
                                <p className="text-gray-600">{offer.description}</p>
                                <p className="text-gray-500 mt-1">💶 {offer.salary} € all'ora</p>
                                {offer.date_from && offer.date_to && (
                                    <p className="text-gray-500">
                                        📅 Dal {formatDate(offer.date_from)} al {formatDate(offer.date_to)}
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setSelectedOffer(offer);
                                        setCreateModal(true);
                                    }}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                >
                                    Modifica
                                </button>
                                <button
                                    onClick={() => {
                                        setOfferToDelete(offer);
                                        setDeleteModalOpen(true);
                                    }}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Elimina
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <CreateOffer
                isOpen={openCreateModal}
                setIsOpen={setCreateModal}
                selectedOffer={selectedOffer}
                setSelectedOffer={setSelectedOffer}
            />

            {/* Delete Confirmation Modal */}
            <Transition appear show={deleteModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setDeleteModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Conferma Eliminazione
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Sei sicuro di voler eliminare l’offerta <strong>{offerToDelete?.title}</strong>?
                                        </p>
                                    </div>
                                    <div className="mt-4 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setDeleteModalOpen(false)}
                                        >
                                            Annulla
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                                            onClick={async () => {
                                                try {
                                                    await api.delete(`/api/offers/${offerToDelete.id}/delete/`);
                                                    setOffers((prev) =>
                                                        prev.filter((offer) => offer.id !== offerToDelete.id)
                                                    );
                                                    setDeleteModalOpen(false);
                                                    setOfferToDelete(null);
                                                } catch (error) {
                                                    console.error("Errore durante l'eliminazione dell'offerta:", error);
                                                }
                                            }}
                                        >
                                            Elimina
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}