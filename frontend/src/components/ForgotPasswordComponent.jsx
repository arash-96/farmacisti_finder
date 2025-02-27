import { useState } from "react";
import api from "../api";
import LoadingIndicator from "./LoadingIndicator";

function ForgotPasswordComponent() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      // Send a POST request with the email in the payload
      const response = await api.post("api/forgot-password/", { email });
      console.log(response.data);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("User with this email does not exist.");
      } else {
        alert("An error occurred. Please try again.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
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

        {loading && <LoadingIndicator />}
        <button
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out text-xl"
          type="submit"
        >
          Ripristina
        </button>
      </form>
    </div>
  );
}

export default ForgotPasswordComponent;
