import { useState } from "react";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";

function ForgotPasswordComponent() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      await api.post("api/forgot-password/", { email });
      toast.success(
        "E-mail per il ripristino della password inviata. Si prega di controllare la posta in arrivo.",
        {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: true,
        }
      );
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Non esiste un utente con questa email.", {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: true,
        });
      } else {
        toast.error("Si è verificato un errore. Si prega di riprovare.", {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: true,
        });
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <ToastContainer position="top-right" autoClose={3000} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center mt-10 mx-auto p-8 max-w-xl rounded-xl shadow-2xl bg-white"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl text-gray-800 text-center font-semibold">
            Ripristina la tua password
          </h1>
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2 text-lg text-gray-700 font-medium">
            Email
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out text-xl flex justify-center items-center"
          type="submit"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Ripristina"
          )}
        </button>
      </form>
    </div>
  );
}

export default ForgotPasswordComponent;
