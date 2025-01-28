import { useState, useEffect } from "react";
import api from "../api";
// import Note from "../components/Note";
import "../styles/Form.css";
import "../styles/Home.css";
import Footer from "../components/Footer";
import SectionCard from "../components/SectionCard";

function Home() {
  // const [notes, setNotes] = useState([]);
  // const [content, setContent] = useState("");
  // const [title, setTitle] = useState("");

  // useEffect(() => {
  //   getNotes();
  // }, []);

  // const getNotes = () => {
  //   api
  //     .get("/api/notes/")
  //     .then((res) => res.data)
  //     .then((data) => setNotes(data))
  //     .catch((err) => alert(err));
  // };

  // const deleteNote = (id) => {
  //   api
  //     .delete(`/api/notes/delete/${id}/`)
  //     .then((res) => {
  //       if (res.status === 204) alert("Note Deleted");
  //       else alert("Failed to delete note.");
  //       getNotes();
  //     })
  //     .catch((error) => alert(error));
  // };

  // const createNote = (e) => {
  //   e.preventDefault();
  //   api.post("/api/notes/", { content, title }).then((res) => {
  //     if (res.status == 201) alert("Note Created!");
  //     else alert("Failed to create note.").catch((err) => alert(err));
  //     getNotes();
  //   });
  // };

  const [isModalOpen, setModalOpen] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(null);

  const openCvUpdateForm = () => setModalOpen(true);
  const closeCvUpdateForm = () => {
    setModalOpen(false);
    setUploadMessage("");
    setIsLoading(false);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    api
      .get("/api/user/details/")
      .then((res) => res.data)
      .then((data) => setName(capitalizeFirstLetter(data["profile"]["name"])))
      .catch((err) => alert(err));
  };

  function capitalizeFirstLetter(name) {
    if (!name || typeof name !== "string") return "";

    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  // const handleCvUpload = (event) => {
  //   event.preventDefault();
  //   const fileInput = document.getElementById("cvFile");
  //   const file = fileInput.files[0];

  //   if (file && file.type !== "application/pdf") {
  //     setUploadMessage("Carica solo file PDF.");
  //   } else {
  //     setIsLoading(true);
  //     setTimeout(() => {
  //       setUploadMessage("CV caricato con successo!");
  //       setIsLoading(false);
  //     }, 2000); // Simulate upload delay
  //   }

  return (
    <div className="container mx-auto p-4">
      {/* Colonna sinistra (Benvenuto) */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* shadow-md */}
        <div className="p-6 rounded-lg md:w-1/2 text-center">
          <h2 className="text-2xl font-bold mb-2">Benvenuto, {name}!</h2>
          <p className="text-gray-700">
            Gestisci la tua carriera, cerca nuove offerte di lavoro, leggi le
            recensioni e aggiorna il tuo CV.
          </p>
        </div>

        {/* Colonna destra (Sezioni) */}
        <div className="flex flex-col gap-4 md:w-1/2">
          <SectionCard
            title="Cerca Offerte"
            buttonText="Cerca Offerte"
            buttonColor="bg-blue-500 hover:bg-blue-600"
            onClick={() => (window.location.href = "pagina-offerte.html")}
          />
          <SectionCard
            title="Leggi Recensioni"
            buttonText="Leggi Recensioni"
            buttonColor="bg-blue-500 hover:bg-blue-600"
            onClick={() => (window.location.href = "pagina-recensioni.html")}
          />
          <SectionCard
            title="Aggiorna CV"
            buttonText="Aggiorna CV"
            buttonColor="bg-green-500 hover:bg-green-600"
            onClick={openCvUpdateForm}
          />
        </div>
      </div>

      {/* Modale per caricare il CV */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={closeCvUpdateForm}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Carica il tuo CV</h3>
            {/* onSubmit={handleCvUpload} */}
            <form id="cvForm">
              <label htmlFor="cvFile" className="block mb-2 text-gray-700">
                Seleziona il file del CV (PDF):
              </label>
              <input
                type="file"
                id="cvFile"
                name="cvFile"
                accept="application/pdf"
                required
                className="block w-full mb-4 p-2 border border-gray-300 rounded-lg"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Carica CV
              </button>
            </form>
            {isLoading && (
              <div className="mt-4 text-blue-500">Caricamento in corso...</div>
            )}
            {uploadMessage && (
              <p
                className={`mt-4 ${
                  uploadMessage.includes("successo")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {uploadMessage}
              </p>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Home;
