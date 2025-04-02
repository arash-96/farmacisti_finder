import { useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";
import "../styles/Form.css";

Form.propTypes = {
  route: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
};

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Email o password errati. Per favore riprova.");
      } else {
        alert(error);
      }
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
            Login
          </h1>
        </div>

        <div className="w-full mb-4">
          <label className="block mb-2 text-lg text-gray-700 font-medium">
            Email
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Inserisci la tua email"
          />
        </div>

        <div className="w-full mb-6">
          <label className="block mb-2 text-lg text-gray-700 font-lg">
            Password
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Inserisci la tua password"
          />
        </div>

        {loading && <LoadingIndicator />}
        <button
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out text-xl"
          type="submit"
        >
          {method === "login" ? "Login" : "Register"}
        </button>
        <p className="mt-4 text-lg text-gray-600">
          Non hai un account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Registrati
          </Link>
        </p>
        <p className="text-lg text-gray-600">
          Hai dimenticato la password?{" "}
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Recupera password
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Form;
