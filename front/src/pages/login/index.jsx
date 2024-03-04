import { useState } from "react";
import LoginForm from "../../components/loginForm";
import RegisterForm from "../../components/registerForm";

function LoginPage() {
  const [displayLoginForm, setDisplayLoginForm] = useState(true);

  return (
    <>
      {displayLoginForm ? (
        <LoginForm setDisplayLoginForm={setDisplayLoginForm} />
      ) : (
        <RegisterForm setDisplayLoginForm={setDisplayLoginForm} />
      )}
    </>
  );
}

export default LoginPage;
