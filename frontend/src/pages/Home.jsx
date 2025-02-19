import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import SectionCard from "../components/SectionCard";
import CvUploadModal from "../components/CvUploadModal";
import CreateOffer from "../components/CreateOffer";
// import SearchOffer from "../components/SearchOffer";

function Home() {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [name, setName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [openCreateModal, setCreateModal] = useState(false);
  // const [openSearchModal, setSearchModal] = useState(false);

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
      })
      .catch((err) => alert(err));
  };

  function capitalizeFirstLetter(name) {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600">Benvenuto, {name}!</h2>
        {userRole === "farmacista" ? (
          <p className="text-lg text-gray-700 mt-2">
            Gestisci la tua carriera, cerca nuove offerte di lavoro, leggi le
            recensioni e aggiorna il tuo CV.
          </p>
        ) : userRole === "titolare" ? (
          <p className="text-lg text-gray-700 mt-2">
            Gestisci le tue offerte, visualizza le candidature e consulta le tue
            informazioni personali.
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {userRole === "farmacista" && (
          <>
            <SectionCard
              title="Trova le Migliori Offerte"
              buttonText="Cerca Offerte"
              onClick={() => navigate("/cerca_offerte")}
            />
            <SectionCard
              title="/"
              buttonText="/"
              buttonColor="bg-blue-500 hover:bg-blue-600"
            />
            <SectionCard
              buttonText="Aggiorna CV"
              buttonColor="bg-green-500 hover:bg-green-600"
              setModal={() => setIsCvModalOpen(true)}
            />
          </>
        )}
        {userRole === "titolare" && (
          <>
            <SectionCard
              buttonText="Crea Offerta"
              buttonColor="bg-blue-500 hover:bg-blue-600"
              setModal={() => setCreateModal(true)}
            />
            <SectionCard
              buttonText="Candidature Ricevute"
              buttonColor="bg-blue-500 hover:bg-blue-600"
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
      {/* <SearchOffer isOpen={openSearchModal} setIsOpen={setSearchModal} /> */}
    </div>
  );
}

export default Home;
