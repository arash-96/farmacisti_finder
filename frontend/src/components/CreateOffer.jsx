import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import api from "../api";

export default function CreateOffer({ isOpen, setIsOpen }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [salary, setSalary] = useState(0);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    api
      .get("/api/user/details/")
      .then((res) => res.data)
      .then((data) => setUser(data["username"]))
      .catch((err) => alert(err));
  };

  function closeModal() {
    setIsOpen(false);
  }

  async function createOffer() {
    try {
      setLoading(true);
      await api.post("/api/offer/", {
        user,
        title,
        description,
        place,
        time,
        salary,
      });
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
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
                  {/* Close button */}
                  <IoMdClose
                    onClick={closeModal}
                    className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-gray-800"
                  />

                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {/* Modal Title */}
                  </DialogTitle>

                  <div>
                    <h3 className="font-bold text-lg text-center">
                      Crea una Nuova Offerta
                    </h3>
                    {/* Form Fields */}
                    <ul className="space-y-3 mt-5">
                      <li>
                        <strong>Titolo Offerta:</strong>
                        <input
                          type="text"
                          className="input input-bordered w-full mt-3"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </li>
                      <li>
                        <strong>Descrizione:</strong>
                        <textarea
                          className="textarea textarea-bordered w-full mt-3"
                          rows="3"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </li>
                      <li>
                        <strong>Luogo:</strong>
                        <input
                          type="text"
                          className="input input-bordered w-full mt-3"
                          onChange={(e) => setPlace(e.target.value)}
                        />
                      </li>
                      <li>
                        <strong>Orario richiesto:</strong>
                        <select
                          className="select select-bordered w-full mt-3"
                          onChange={(e) => {
                            setTime(e.target.value);
                          }}
                        >
                          <option value=""></option>
                          <option value="mattina">Mattina</option>
                          <option value="pomeriggio">Pomeriggio</option>
                          <option value="sera">Sera</option>
                          <option value="notturno">Notturno</option>
                        </select>
                      </li>
                      <li>
                        <strong>Retribuzione:</strong>
                        <input
                          type="text"
                          className="input input-bordered w-full mt-3"
                          onChange={(e) => setSalary(e.target.value)}
                        />
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-4/5 mt-3"
                      onClick={createOffer}
                    >
                      Crea
                    </button>
                    {loading && (
                      <div className="flex justify-center mt-4">
                        <svg
                          className="animate-spin h-6 w-6 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
                          />
                        </svg>
                      </div>
                    )}
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
  isOpen: PropTypes.bool.isRequired, // Expect a boolean prop
  setIsOpen: PropTypes.func.isRequired, // Expect a function prop
};
