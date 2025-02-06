import "../styles/Login.css";

const LoginOptions = () => {
  return (
    <div
      style={{
        fontFamily: "Roboto",
        margin: 0,
        padding: 0,
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        color: "#333",
      }}
    >
      <div
        style={{ textAlign: "center", marginBottom: "40px", fontSize: "1.5em" }}
      >
        <h1 style={{ fontSize: "3em", color: "#0288d1", fontWeight: "bold" }}>
          SOS Pharmacist
        </h1>
        <p style={{ fontSize: "1.2em", margin: 0, color: "#666" }}>
          Connetti farmacisti e titolari di farmacia in modo semplice e veloce.
        </p>
      </div>

      {/* Authentication Section */}
      <div
        id="auth-section"
        className="auth-section"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <h2 style={{ fontSize: "2em", color: "#333", marginBottom: "60px" }}>
          Benvenuto!
        </h2>
        {/* Login via email button */}
        <button
          onClick={() => {
            window.location.href = "/login_email";
          }}
          style={{
            padding: "18px",
            fontSize: "1.3em",
            borderRadius: "10px",
            border: "1px solid #ddd",
            backgroundColor: "#0288d1",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            width: "100%",
          }}
          onMouseOver={() => {
            document.querySelector("button").style.backgroundColor = "#0277b8";
          }}
          onMouseOut={() => {
            document.querySelector("button").style.backgroundColor = "#0288d1";
          }}
        >
          Accedi con Email
        </button>
        {/* Link to Registration form */}
        <a
          href="/register"
          style={{
            color: "#0288d1",
            textDecoration: "none",
            fontSize: "1.3em",
            marginTop: "20px",
          }}
        >
          Sei nuovo? Registrati
        </a>
      </div>
    </div>
  );
};

export default LoginOptions;
