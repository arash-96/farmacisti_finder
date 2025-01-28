import { useState, useEffect } from "react";
import api from "../api";
import Footer from "../components/Footer";
import SectionCard from "../components/SectionCard";
import CvUploadModal from "../components/CvUploadModal";

function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  //const [uploadMessage, setUploadMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const openCvUpdateForm = () => setModalOpen(true);
  const closeCvUpdateForm = () => {
    setModalOpen(false);
    // setUploadMessage("");
    setIsLoading(false);
  };

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserDetails = () => {
    api
      .get("/api/user/details/")
      .then((res) => res.data)
      .then((data) => {
        setName(capitalizeFirstLetter(data["profile"]["name"]));
        setUserRole(data["profile"]["userRole"]);
      })
      .catch((err) => alert(err));
  };

  function capitalizeFirstLetter(name) {
    if (!name || typeof name !== "string") return "";

    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Column */}
        <div className="p-6 rounded-lg md:w-1/2 text-center">
          <h2 className="text-2xl font-bold mb-2">Benvenuto, {name}!</h2>
          <p className="text-gray-700">
            Gestisci la tua carriera, cerca nuove offerte di lavoro, leggi le
            recensioni e aggiorna il tuo CV.
          </p>
        </div>
        {/* Right Column - Conditionally Rendered */}
        {userRole === "farmacista" && (
          <div className="flex flex-col gap-4 md:w-1/2">
            <SectionCard
              title="Cerca Offerte"
              buttonText="Cerca Offerte"
              buttonColor="bg-blue-500 hover:bg-blue-600"
            />
            <SectionCard
              title="Leggi Recensioni"
              buttonText="Leggi Recensioni"
              buttonColor="bg-blue-500 hover:bg-blue-600"
            />
            <SectionCard
              title="Aggiorna CV"
              buttonText="Aggiorna CV"
              buttonColor="bg-green-500 hover:bg-green-600"
              onClick={openCvUpdateForm}
            />
          </div>
        )}
        {/* Right Column - Conditionally Rendered for titolare */}
        {userRole === "titolare" && (
          <div className="flex flex-col gap-4 md:w-1/2">
            <SectionCard
              title="Crea Offerta"
              buttonText="Crea Offerta"
              buttonColor="bg-blue-500 hover:bg-yellow-600"
            />
            <SectionCard
              title="Candidature Ricevute"
              buttonText="Candidature Ricevute"
              buttonColor="bg-blue-500 hover:bg-orange-600"
            />
            <SectionCard
              title="Informazioni Personali"
              buttonText="Informazioni Personali"
              buttonColor="bg-green-500 hover:bg-orange-600"
            />
          </div>
        )}
      </div>
      {/* Modal per caricare il CV */}
      {isModalOpen && (
        <CvUploadModal
          isOpen={isModalOpen}
          onClose={closeCvUpdateForm}
          isLoading={isLoading}
        />
      )}
      <Footer />
    </div>
  );
}

export default Home;
