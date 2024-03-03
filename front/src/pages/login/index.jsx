import { useState } from "react";
import LoginForm from "../../components/loginForm/loginForm";
import RegisterForm from "../../components/registerForm/registerForm";

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
