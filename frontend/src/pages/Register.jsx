import Form from "../components/Forms";

function Register() {
  return (
    <div>
      <Form route="/api/user/register/" method="register" />
    </div>
  );
}

export default Register;
