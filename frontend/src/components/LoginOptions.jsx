const LoginOptions = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 font-['Roboto'] px-6">
      <div className="text-center mb-20">
        <h1 className="text-[5em] font-bold text-sky-600 mb-6 leading-tight">
          SOS Pharmacist
        </h1>
        <p className="text-[2em] text-gray-600 max-w-4xl mx-auto">
          Connetti farmacisti e titolari di farmacia in modo semplice e veloce.
        </p>
      </div>

      <div className="flex flex-col items-center w-full max-w-5xl gap-12">
        <h2 className="text-[3em] font-semibold text-gray-700 mb-12">
          Benvenuto!
        </h2>

        <button
          onClick={() => (window.location.href = "/login_email")}
          className="w-full px-10 py-6 text-[2em] font-bold text-white bg-sky-600 rounded-xl border border-gray-300 transition duration-300 hover:bg-sky-700"
        >
          Accedi con Email
        </button>

        <a
          href="/register"
          className="text-sky-600 text-[1.8em] mt-8 hover:underline transition"
        >
          Sei nuovo? Registrati
        </a>
      </div>
    </div>
  );
};
