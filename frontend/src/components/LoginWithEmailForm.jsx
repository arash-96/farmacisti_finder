import { useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

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
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center mt-20 mx-auto p-6 max-w-md rounded-lg shadow-lg"
    >
      <h1 className="text-lg text-gray-600 text-center mb-4">Login</h1>
      <div className="w-4/5">
        <label className="block mb-2 text-sm text-gray-700">Email</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email"
        />
      </div>
      <div className="w-4/5 mb-4">
        <label className="block mb-2 text-sm text-gray-700">Password</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      {loading && <LoadingIndicator />}
      <button
        className="w-4/5 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}

export default Form;
