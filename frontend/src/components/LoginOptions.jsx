import { useNavigate } from "react-router-dom";

const LoginOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 font-['Roboto'] px-4">
      <div className="text-center mb-10">
        <h1 className="text-[3em] font-bold text-sky-600 mb-2">SOS Pharmacist</h1>
        <p className="text-[1.2em] text-gray-600">
          Connetti farmacisti e titolari di farmacia in modo semplice e veloce.
        </p>
      </div>

      <div className="flex flex-col items-center w-full max-w-3xl gap-8">
        <h2 className="text-[2em] font-semibold text-gray-700 mb-8">Benvenuto!</h2>

        <button
          onClick={() => (navigate("/login_email"))}
          className="w-full px-6 py-4 text-[1.3em] font-bold text-white bg-sky-600 rounded-lg border border-gray-300 transition duration-300 hover:bg-sky-700"
        >
          Accedi con Email
        </button>

        <a
          href="/register"
          className="text-sky-600 text-[1.3em] mt-4 hover:underline transition"
        >
          Sei nuovo? Registrati
        </a>
      </div>
    </div>
  );
};


export default LoginOptions;