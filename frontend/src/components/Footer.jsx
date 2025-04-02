const Footer = () => {
  return (
    <footer className="text-center text-gray-600 py-10">
      <p className="text-sm">
        SOS Pharmacist - Tutti i diritti riservati &copy; 2025
      </p>
      <p className="text-sm mt-1">
        info@sospharmacist.com
      </p>
      <p className="text-sm mt-2">
        <a className="text-blue-500 hover:underline" href="/privacy" target="_blank">Privacy Policy</a> |{" "}
        <a className="text-blue-500 hover:underline" href="/terms" target="_blank">Termini e Condizioni</a>
      </p>
    </footer>
  );
};

export default Footer;
