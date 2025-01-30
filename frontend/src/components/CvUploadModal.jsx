import PropTypes from "prop-types";
import api from "../api";

function CvUploadModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("cvFile");
    const file = fileInput.files[0];

    api
      .get("/api/user/details/")
      .then((res) => res.data)
      .then((data) => {
        console.log(data["id"]);
      })
      .catch((err) => alert(err));
    console.log(file);

    if (file && file.type !== "application/pdf") {
      alert("Carica solo file PDF.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-gray-600"
        >
          X
        </button>
        <h3 className="text-xl font-bold mb-4">Carica il tuo CV</h3>
        <form id="cvForm" onSubmit={handleSubmit}>
          <input
            type="file"
            id="cvFile"
            name="cvFile"
            accept="application/pdf"
            required
            className="block w-full mb-4 p-2"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Carica CV
          </button>
        </form>
      </div>
    </div>
  );
}

// Prop validation
CvUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CvUploadModal;
