const Footer = () => {
  return (
    <footer className="mt-8 text-center text-gray-600 py-10">
      <p className="text-sm">
        SOS Pharmacist - Tutti i diritti riservati &copy; 2025
      </p>
      <p className="text-sm mt-2">
        <a href="privacy.html" className="text-blue-500 hover:underline">
          Privacy Policy
        </a>{" "}
        |{" "}
        <a href="contact.html" className="text-blue-500 hover:underline">
          Contatti
        </a>
      </p>
    </footer>
  );
};

export default Footer;
