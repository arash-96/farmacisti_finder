import PropTypes from "prop-types";
import api from "../api";
import { useEffect, useState } from "react";

function CvUploadModal({ isOpen, onClose }) {
  const [pdfFile, setPdfFile] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get("/api/user/details/")
      .then((res) => res.data)
      .then((data) => {
        if (data.profile.pdf_file) {
          setPdfFile(`data:application/pdf;base64,${data.profile.pdf_file}`);
        }
      })
      .catch((err) => alert(err));
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const file = event.target.elements.cvFile.files[0];

    if (!file) {
      alert("Seleziona un file prima di inviare.");
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Carica solo file PDF.");
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];

      api
        .put(
          "/api/user/details/",
          {
            pdf_file: base64String,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          setPdfFile(`data:application/pdf;base64,${base64String}`);
          setLoading(false);
        })
        .catch((err) => {
          alert("Errore durante l'upload: " + err);
          setLoading(false);
        });
    };

    reader.onerror = (error) => {
      alert("Errore nella lettura del file: " + error);
    };

    reader.readAsDataURL(file);
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
          {loading && (
            <div className="flex justify-center mt-4">
              <svg
                className="animate-spin h-5 w-5 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
                />
              </svg>
            </div>
          )}
          {pdfFile && (
            <div>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              <a
                href={pdfFile}
                target="_blank"
                className="text-blue-500 block mt-5"
              >
                📥 Scarica il tuo CV
              </a>
            </div>
          )}
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
