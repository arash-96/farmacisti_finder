import PropTypes from "prop-types";

const SectionCard = ({ title, buttonText, buttonColor, onClick }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <button
        className={`${buttonColor} text-white px-4 py-2 rounded-lg hover:brightness-110`}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

// Adding PropTypes for props validation
SectionCard.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default SectionCard;
