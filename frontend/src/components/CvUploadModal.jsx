import PropTypes from "prop-types";

function CvUploadModal({ isOpen, onClose, isLoading }) {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("cvFile");
    const file = fileInput.files[0];

    if (file && file.type !== "application/pdf") {
      alert("Carica solo file PDF.");
    } else {
      alert("Caricamento in corso...");
      // Handle actual upload logic here...
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
        {isLoading && (
          <div className="mt-4 text-blue-500">Caricamento in corso...</div>
        )}
      </div>
    </div>
  );
}

// Prop validation
CvUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

// Default props
CvUploadModal.defaultProps = {
  isLoading: false,
};

export default CvUploadModal;
