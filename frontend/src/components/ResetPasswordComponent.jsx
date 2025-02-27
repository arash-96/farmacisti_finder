import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";

const ResetPasswordComponent = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Le password non corrispondono.", {
        position: "top-center",
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("api/reset-password/", {
        token,
        password,
      });

      if (response.status !== 200) {
        throw new Error("Qualcosa è andato storto");
      }

      toast.success("La password è stata ripristinata con successo!", {
        position: "top-center",
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: true,
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center mb-10">
          Reimposta Password
        </h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-2">Nuova Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Conferma Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out text-xl flex justify-center items-center"
            type="submit"
          >
            {isLoading ? (
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
              "Reimposta password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordComponent;
