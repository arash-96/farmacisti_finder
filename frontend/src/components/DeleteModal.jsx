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
import api from "../api";

export default function DeleteModal({ isOpen, setIsOpen }) {
    const [loading, setLoading] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            const res = await api.delete("/api/user/delete/");
            if (res.status === 204 || res.status === 200) {
                toast.success("Profilo eliminato con successo!", {
                    autoClose: 2000,
                    position: "top-center",
                    closeButton: false,
                });
            } else {
                toast.error("Errore durante l'eliminazione del profilo.", {
                    autoClose: 2000,
                    position: "top-center",
                    closeButton: false,
                });
            }
        } catch (err) {
            toast.error("Si è verificato un errore.", {
                autoClose: 2000,
                position: "top-center",
                closeButton: false,
            });
        } finally {
            setLoading(false);
            closeModal();
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
                                <DialogPanel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <IoMdClose
                                        onClick={closeModal}
                                        className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-gray-800"
                                    />
                                    <DialogTitle
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 text-center mb-4"
                                    >
                                        Sei sicuro di voler eliminare il tuo profilo?
                                    </DialogTitle>
                                    <p className="text-sm text-gray-600 text-center mb-6">
                                        Questa azione è irreversibile.
                                    </p>
                                    <div className="flex justify-center gap-4">
                                        <button
                                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                            onClick={handleDelete}
                                            disabled={loading}
                                        >
                                            {loading ? "Eliminazione..." : "Conferma eliminazione"}
                                        </button>
                                        <button
                                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                            onClick={closeModal}
                                        >
                                            Annulla
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

DeleteModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
};
