import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { Fragment, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import api from "../api";
import Loading from "../components/Loading";

export default function CreateOffer({ isOpen, setIsOpen, selectedOffer = null, onOfferSaved }) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date_from, setDateFrom] = useState("");
  const [date_to, setDateTo] = useState("");
  const [salary, setSalary] = useState("");
  const [isSingleDay, setIsSingleDay] = useState(false);

  useEffect(() => {
    if (selectedOffer) {
      setTitle(selectedOffer.title || "");
      setDescription(selectedOffer.description || "");
      setDateFrom(selectedOffer.date_from || "");
      setDateTo(selectedOffer.date_to || "");
      setSalary(selectedOffer.salary || 0);
    } else {
      // Reset if creating a new one
      setTitle("");
      setDescription("");
      setDateFrom("");
      setDateTo("");
      setSalary("");
    }
  }, [selectedOffer, isOpen]);

  function closeModal() {
    setIsOpen(false);
  }

  function validateForm() {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!title || title.trim().length < 3) {
      toast.error("Il titolo è obbligatorio e deve essere almeno 3 caratteri", {
        autoClose: 3000,
        position: "top-center",
        closeButton: false
      });
      return false;
    }

    if (!description || description.trim() === "") {
      toast.error("La descrizione è obbligatoria.", {
        autoClose: 3000,
        position: "top-center",
        closeButton: false
      });
      return false;
    }

    if (!dateRegex.test(date_from)) {
      toast.error("Formato data di inizio non valido (AAAA-MM-GG).",
        {
          autoClose: 3000,
          position: "top-center",
          closeButton: false
        });
      return false;
    }

    if (!dateRegex.test(date_to)) {
      toast.error("Formato data di fine non valido (AAAA-MM-GG).", {
        autoClose: 3000,
        position: "top-center",
        closeButton: false
      });
      return false;
    }

    return true;
  }

  async function handleSubmit() {
    if (!validateForm()) return;

    setLoading(true);

    const payload = {
      title,
      description,
      date_from,
      date_to,
      salary,
    };


    const url = selectedOffer
      ? `/api/offers/${selectedOffer.id}/update/`
      : "/api/offers/create/";
    const method = selectedOffer ? api.put : api.post;

    try {
      await method(url, payload);

      toast.success(
        selectedOffer
          ? "Offerta aggiornata con successo!"
          : "Offerta creata con successo!",
        {
          position: "top-center",
          autoClose: 1200,
          closeButton: false,
        }
      );

      closeModal();
      if (onOfferSaved) {
        onOfferSaved();
      }
    } catch {
      toast.error("Errore durante l'invio dell'offerta.", {
        position: "top-center",
        autoClose: 1200,
        closeButton: false,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
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
                <DialogPanel className="relative w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all mt-10">
                  <IoMdClose
                    onClick={closeModal}
                    className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-gray-800"
                  />

                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  />

                  <div>
                    <h3 className="font-bold text-lg text-center">
                      {selectedOffer ? "Modifica Offerta" : "Crea una Nuova Offerta"}
                    </h3>

                    <ul className="space-y-3 mt-5">
                      <li>
                        <strong>Titolo Offerta:</strong>
                        <input
                          type="text"
                          className="input input-bordered w-full mt-3"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </li>
                      <li>
                        <strong>Descrizione:</strong>
                        <textarea
                          className="textarea textarea-bordered w-full mt-3"
                          rows="3"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </li>
                      <li className="mt-6">
                        <strong className="block mb-2">Seleziona tipo di durata:</strong>
                        <div className="flex w-full gap-36 mt-3">
                          <div className="flex gap-4">
                            <input
                              type="radio"
                              name="dateType"
                              value="single"
                              checked={isSingleDay}
                              className="radio"
                              onChange={() => {
                                setIsSingleDay(true);
                                setDateTo(date_from);
                              }}
                            />
                            <span>Giorno singolo</span>
                          </div>
                          <div className="flex gap-4">
                            <input
                              type="radio"
                              name="dateType"
                              value="multiple"
                              checked={!isSingleDay}
                              className="radio"
                              onChange={() => setIsSingleDay(false)}
                            />
                            <span>Più giorni</span>
                          </div>
                        </div>
                      </li>
                      {isSingleDay ? (
                        <li>
                          <strong>Data:</strong>
                          <input
                            type="date"
                            className="input input-bordered w-full mt-3"
                            value={date_from}
                            onChange={(e) => {
                              setDateFrom(e.target.value);
                              setDateTo(e.target.value);
                            }}
                          />
                        </li>
                      ) : (
                        <li className="flex items-center gap-4">
                          <div className="w-1/2">
                            <strong>Data da:</strong>
                            <input
                              type="date"
                              className="input input-bordered w-full mt-3"
                              value={date_from}
                              onChange={(e) => setDateFrom(e.target.value)}
                            />
                          </div>
                          <div className="w-1/2">
                            <strong>Data a:</strong>
                            <input
                              type="date"
                              className="input input-bordered w-full mt-3"
                              value={date_to}
                              onChange={(e) => setDateTo(e.target.value)}
                            />
                          </div>
                        </li>
                      )}
                      <li>
                        <strong>Retribuzione oraria:</strong>
                        <input
                          type="text"
                          className="input input-bordered w-full mt-3"
                          value={salary}
                          onChange={(e) => setSalary(e.target.value)}
                        />
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-4/5 mt-3"
                      onClick={handleSubmit}
                    >
                      {selectedOffer ? "Salva Modifiche" : "Crea"}
                    </button>
                    {loading && <Loading />}
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

CreateOffer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  selectedOffer: PropTypes.object,
  onOfferSaved: PropTypes.func,
};

CreateOffer.defaultProps = {
  onOfferSaved: () => { },
};