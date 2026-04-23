import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./components/RegisterForm";

export const RegisterView = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      <h1>WORKOUTER</h1>
      <p>LOGO</p>
      <h2>Create new account</h2>
      <RegisterForm />
      <Button
        onClick={() => {
          navigate("/home");
        }}
      >
        {" "}
        Register{" "}
      </Button>
    </>
  );
};
