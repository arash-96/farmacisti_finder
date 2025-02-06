import LoginWithEmailForm from "../components/LoginWithEmailForm";

function LoginWithEmail() {
  return (
    <div>
      <LoginWithEmailForm route="/api/token/" method="login" />
    </div>
  );
}

export default LoginWithEmail;
