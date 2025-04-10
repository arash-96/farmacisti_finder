import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import SectionCard from "../components/SectionCard";
import CvUploadModal from "../components/CvUploadModal";
import CreateOffer from "../components/CreateOffer";
import DescriptionModal from "../components/DescriptionModal";

function Home() {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [name, setName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [openCreateModal, setCreateModal] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserDetails = () => {
    api
      .get("/api/user/details/")
      .then((res) => res.data)
      .then((data) => {
        setName(capitalizeFirstLetter(data.profile.name));
        setUserRole(data.profile.userRole);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err);
        setIsLoading(false);
      });
  };

  function capitalizeFirstLetter(name) {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
  }

  return isLoading ? (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
    </div>
  ) : (
    <div className="container mx-auto px-4 py-12 mb-18">
      <div className="text-center mb-8">
        {userRole !== "admin" && (
          <h2 className="text-3xl font-bold text-blue-600">Benvenuto, {name}!</h2>
        )}
        {(userRole === "farmacista") ? (
          <p className="text-lg text-gray-700 mt-2">
            Gestisci la tua carriera, cerca nuove offerte di lavoro, leggi le
            recensioni e aggiorna il tuo CV.
          </p>
        ) : (userRole === "titolare") ? (
          <p className="text-lg text-gray-700 mt-2">
            Gestisci le tue offerte, visualizza le candidature e consulta le tue
            informazioni personali.
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {(userRole === "farmacista") && (
          <>
            <SectionCard
              title="Trova le Migliori Offerte"
              buttonText="Cerca Offerte"
              onClick={() => navigate("/cerca_offerte")}
            />
            <SectionCard
              title="Carica il CV"
              buttonText="Aggiorna CV"
              buttonColor="bg-green-500 hover:bg-green-600"
              setModal={() => setIsCvModalOpen(true)}
            />
          </>
        )}
        {(userRole === "titolare") && (
          <>
            <SectionCard
              buttonText="Crea Offerta"
              buttonColor="bg-blue-500 hover:bg-blue-600"
              setModal={() => setCreateModal(true)}
            />
            <SectionCard
              buttonText="Candidature Ricevute"
              buttonColor="bg-blue-500 hover:bg-blue-600"
              onClick={() => navigate("/candidature")}
            />
            <SectionCard
              buttonText="Le Mie Offerte"
              buttonColor="bg-purple-500 hover:bg-purple-600"
              onClick={() => navigate("/mie_offerte")}
            />
          </>
        )}
        <>
          <SectionCard
            title="Aggiorna la tua descrizione"
            buttonText="Modifica Descrizione"
            buttonColor="bg-blue-500 hover:bg-blue-600"
            setModal={() => setIsDescriptionModalOpen(true)}
          />
        </>
        {userRole === "admin" && (
          <>
            <SectionCard
              buttonText="Tutte le farmacie"
              buttonColor="bg-blue-500 hover:bg-blue-600"
              onClick={() => navigate("/farmacie")}
            />
          </>
        )}
      </div>

      {isCvModalOpen && (
        <CvUploadModal
          isOpen={isCvModalOpen}
          onClose={() => setIsCvModalOpen(false)}
        />
      )}
      <CreateOffer isOpen={openCreateModal} setIsOpen={setCreateModal} />
      <DescriptionModal isOpen={isDescriptionModalOpen} setIsOpen={setIsDescriptionModalOpen} />
    </div>
  );
}

export default Home;
