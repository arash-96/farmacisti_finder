function Unauthorized() {
    return (
        <div className="text-center mt-20">
            <h1 className="text-3xl font-bold text-red-600">Accesso Negato</h1>
            <p className="mt-4 text-gray-700">Non hai i permessi per accedere a questa pagina.</p>
        </div>
    );
}

export default Unauthorized;