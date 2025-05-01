import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import api from "../api";

export default function DescriptionModal({ isOpen, setIsOpen, initialDescription = "", onUpdate }) {
    const [descrizione, setDescription] = useState(initialDescription);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchDescription();
        }
    }, [isOpen]);

    function closeModal() {
        setIsOpen(false);
    }

    const handleUpdate = async () => {
        if (!descrizione.trim()) {
            toast.error("La descrizione non può essere vuota.", {
                autoClose: 2000,
                position: "top-center",
                closeButton: false,
            });
            return;
        }

        setLoading(true);
        try {
            await api.put("/api/profile-descrizione/", { descrizione });
            toast.success("Descrizione aggiornata con successo!", {
                autoClose: 2000,
                position: "top-center",
                closeButton: false,
            });
            closeModal();
        } catch (error) {
            toast.error("Errore durante l'aggiornamento.", {
                autoClose: 2000,
                position: "top-center",
                closeButton: false,
            });
        }
    };

    const fetchDescription = async () => {
        try {
            const res = await api.get("/api/profile-descrizione/");
            setDescription(res.data.descrizione || "");
        } catch (error) {
            toast.error("Errore durante il caricamento della descrizione.", {
                autoClose: 2000,
                position: "top-center",
                closeButton: false,
            });
        } finally {
            setLoadingPage(false);
        }
    };

    return (
        <>
            <ToastContainer position="top-right" />
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <IoMdClose
                                        onClick={closeModal}
                                        className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-gray-800"
                                    />

                                    <DialogTitle
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 text-center"
                                    >
                                        Aggiorna la tua descrizione
                                    </DialogTitle>

                                    <div className="mt-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Descrizione personale:
                                        </label>
                                        <textarea
                                            className="textarea textarea-bordered w-full text-base p-3 border rounded-md border-gray-300"
                                            rows="6"
                                            value={descrizione}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Scrivi qualcosa su di te..."
                                        />
                                    </div>

                                    <div className="mt-6 text-center">
                                        <button
                                            type="button"
                                            onClick={handleUpdate}
                                            className="inline-flex justify-center rounded-md bg-blue-600 px-5 py-2 text-white text-sm font-medium hover:bg-blue-700 transition"
                                            disabled={loading}
                                        >
                                            {loading ? "Aggiornamento..." : "Aggiorna"}
                                        </button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

DescriptionModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    initialDescription: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
};