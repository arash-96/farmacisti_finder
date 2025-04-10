import PropTypes from "prop-types";

const SectionCard = ({ title, buttonText, setModal, onClick }) => {
  const handleClick = () => {
    if (setModal) setModal();
    if (onClick) onClick();
  };

  return (
    <div className="bg-white rounded-[15px] shadow-lg p-6 m-4 text-center w-[calc(35%-30px)] transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
      <h3 className="text-2xl font-semibold text-blue-600 mb-4">{title}</h3>
      <button
        className="bg-blue-600 text-white px-5 py-3 rounded-lg text-lg transition-colors duration-300 hover:bg-blue-800 w-2/3"
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

SectionCard.propTypes = {
  title: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  setModal: PropTypes.func,
  onClick: PropTypes.func,
};

export default SectionCard;
