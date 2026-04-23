import { Button } from "@/components/ui/button";
import { LoginForm } from "./components/LoginForm";
import { useNavigate } from "react-router-dom";

export const LoginView = () => {
  const navigate = useNavigate();

  const onRegisterClick = () => {
    navigate("/register");
  };
  return (
    <>
      <h1>WORKOUTER</h1>
      <p>LOGO</p>
      <h2>Welcome</h2>
      <LoginForm />
      <Button>Forgotten passowrd?</Button>
      <Button onClick={onRegisterClick}>Create new account</Button>
    </>
  );
};
