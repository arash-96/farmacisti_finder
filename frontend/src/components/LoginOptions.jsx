const LoginOptions = () => {
  return (
    <div className="auth-section text-center flex flex-col items-center gap-4">
      <h2 className="text-xl text-gray-600">Benvenuto!</h2>
      <button
        onClick={() => alert('Funzione Google Login!')}
        className="text-base p-3 rounded-lg border border-gray-300 w-1/4 focus:outline-none focus:border-blue-600 bg-blue-600 text-white font-bold cursor-pointer transition-colors duration-300 hover:bg-blue-700"
      >
        Accedi con Google
      </button>
      <button
        onClick={() => alert('Funzione Facebook Login!')}
        className="text-base p-3 rounded-lg border border-gray-300 w-1/4 focus:outline-none focus:border-blue-600 bg-blue-600 text-white font-bold cursor-pointer transition-colors duration-300 hover:bg-blue-700"
      >
        Accedi con Facebook
      </button>
      <button
        onClick={() => alert('Login tramite email in arrivo!')}
        className="text-base p-3 rounded-lg border border-gray-300 w-1/4 focus:outline-none focus:border-blue-600 bg-blue-600 text-white font-bold cursor-pointer transition-colors duration-300 hover:bg-blue-700"
      >
        Accedi con Email
      </button>
      <a href="/register" className="text-blue-600 underline">
        Sei nuovo? Registrati
      </a>
    </div>
  );
};

export default LoginOptions;
