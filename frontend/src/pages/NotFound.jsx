import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Pagina non trovata</h2>
      <p className="text-lg mb-6 text-gray-600">
        Oops! La pagina che stai cercando non esiste o è stata spostata.
      </p>
      <button
        className="bg-blue-600 text-white text-sm px-3 py-2 rounded-md w-64 transition-colors duration-300 hover:bg-blue-800"
        onClick={() => navigate("/")}
      >
        Torna alla homepage
      </button>
    </div>
  );
};

export default NotFound;
