import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";

export default function CreateOffer({ isOpen, setIsOpen }) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-xl font-bold text-gray-600"
                  >
                    X
                  </button>

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
                        />
                      </li>
                      <li>
                        <strong>Descrizione:</strong>
                        <textarea
                          className="textarea textarea-bordered w-full mt-3"
                          rows="3"
                        />
                      </li>
                      <li>
                        <strong>Luogo:</strong>
                        <input
                          type="text"
                          className="input input-bordered w-full mt-3"
                        />
                      </li>
                      <li>
                        <strong>Orario richiesto:</strong>
                        <select className="select select-bordered w-full mt-3">
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
                        />
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-4/5 mt-3"
                    >
                      Crea
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

CreateOffer.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Expect a boolean prop
  setIsOpen: PropTypes.func.isRequired, // Expect a function prop
};
