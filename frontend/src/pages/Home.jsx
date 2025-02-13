import { useState, useEffect } from "react";
import api from "../api";
import SectionCard from "../components/SectionCard";
import CvUploadModal from "../components/CvUploadModal";
import CreateOffer from "../components/CreateOffer";
import SearchOffer from "../components/SearchOffer";

function Home() {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [name, setName] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const [openCreateModal, setCreateModal] = useState(false);
  const [openSearchModal, setSearchModal] = useState(false);

  const handleOpen = (setModal) => {
    setModal(true);
  };

  const closeCvUpdateForm = () => {
    setIsCvModalOpen(false);
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
    <div className="container">
      <div className="left-column">
        <h2>Benvenuto, {name}!</h2>
        <p className="text-xl">
          Gestisci la tua carriera, cerca nuove offerte di lavoro, leggi le
          recensioni e aggiorna il tuo CV.
        </p>
      </div>
      {userRole === "farmacista" && (
        <div className="right-column">
          <SectionCard
            //title="Cerca Offerte"
            buttonText="Cerca Offerte"
            buttonColor="bg-blue-500 hover:bg-blue-600"
            setModal={() => handleOpen(setSearchModal)}
          />
          <SectionCard
            //title="Leggi Recensioni"
            buttonText="Leggi Recensioni"
            buttonColor="bg-blue-500 hover:bg-blue-600"
          />
          <SectionCard
            //title="Aggiorna CV"
            buttonText="Aggiorna CV"
            buttonColor="bg-green-500 hover:bg-green-600"
            setModal={() => setIsCvModalOpen(true)}
          />
        </div>
      )}
      {/* If the titolare has logged in */}
      {userRole === "titolare" && (
        <div className="right-column">
          <SectionCard
            //title="Crea Offerta"
            buttonText="Crea Offerta"
            buttonColor="bg-blue-500 hover:bg-blue-600"
            setModal={() => handleOpen(setSearchModal)}
          />
          <SectionCard
            //title="Candidature Ricevute"
            buttonText="Leggi Recensioni"
            buttonColor="bg-blue-500 hover:bg-blue-600"
          />
          {/* <SectionCard
            title="Aggiorna CV"
            buttonText="Aggiorna CV"
            buttonColor="bg-green-500 hover:bg-green-600"
            setModal={() => setIsCvModalOpen(true)}
          /> */}
        </div>
      )}
    </div>
    //</div>
    // <div className="container body mx-auto p-4">
    //   <div className="flex flex-col md:flex-row gap-4">
    //     {/* Left Column */}
    //     <div className="p-6 rounded-lg md:w-1/2 text-center left-column">
    //       <h2 className="text-2xl font-bold mb-2">Benvenuto, {name}!</h2>
    //       {userRole === "farmacista" && (
    //         <p className="text-gray-700">
    //           Gestisci la tua carriera, cerca nuove offerte di lavoro, leggi le
    //           recensioni e aggiorna il tuo CV.
    //         </p>
    //       )}
    //       {userRole === "titolare" && (
    //         <p className="text-gray-700">
    //           Gestisci le tue offerte, visualizza le candidature e consulta le
    //           tue informazioni personali.
    //         </p>
    //       )}
    //     </div>
    //     {/* Right Column - Conditionally Rendered */}
    //     {userRole === "farmacista" && (
    //       <div className="flex flex-col gap-4 md:w-1/2">
    //         <SectionCard
    //           title="Cerca Offerte"
    //           buttonText="Cerca Offerte"
    //           buttonColor="bg-blue-500 hover:bg-blue-600"
    //           setModal={() => handleOpen(setSearchModal)}
    //         />
    //         <SectionCard
    //           title="Leggi Recensioni"
    //           buttonText="Leggi Recensioni"
    //           buttonColor="bg-blue-500 hover:bg-blue-600"
    //         />
    //         <SectionCard
    //           title="Aggiorna CV"
    //           buttonText="Aggiorna CV"
    //           buttonColor="bg-green-500 hover:bg-green-600"
    //           setModal={() => setIsCvModalOpen(true)}
    //         />
    //       </div>
    //     )}
    //     {/* Right Column - Conditionally Rendered for titolare */}
    //     {userRole === "titolare" && (
    //       <div className="flex flex-col gap-4 md:w-1/2">
    //         <SectionCard
    //           title="Crea Offerta"
    //           buttonText="Crea Offerta"
    //           buttonColor="bg-blue-500 hover:bg-blue-600"
    //           setModal={() => handleOpen(setSearchModal)}
    //         />
    //         <SectionCard
    //           title="Candidature Ricevute"
    //           buttonText="Candidature Ricevute"
    //           buttonColor="bg-blue-500 hover:bg-blue-600"
    //         />
    //         <SectionCard
    //           title="Informazioni Personali"
    //           buttonText="Informazioni Personali"
    //           buttonColor="bg-green-500 hover:bg-green-600"
    //         />
    //       </div>
    //     )}
    //     {/* <div className="mt-20">
    //       <Footer />
    //     </div> */}
    //   </div>

    //   {/* Modal per caricare il CV */}
    //   {isCvModalOpen && (
    //     <CvUploadModal isOpen={isCvModalOpen} onClose={closeCvUpdateForm} />
    //   )}
    //   {/* Create Modal Component */}
    //   <CreateOffer isOpen={openCreateModal} setIsOpen={setCreateModal} />
    //   <SearchOffer isOpen={openSearchModal} setIsOpen={setSearchModal} />
    // </div>
  );
}

export default Home;
