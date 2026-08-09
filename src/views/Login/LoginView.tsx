import { Button } from "@/components/ui/button";
import { LoginForm } from "./components/LoginForm";
import { useNavigate } from "react-router-dom";

export const LoginView = () => {
  const navigate = useNavigate();

  const onRegisterClick = () => {
    navigate("/register");
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center pb-5 ">
      <main className="flex-1 flex flex-col justify-center w-full gap-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold">WORKOUTER</h1>
          <p>LOGO</p>
        </div>
        <div className="w-full flex flex-col items-center gap-4">
          <h2 className="text-2xl ">Welcome!</h2>
          <LoginForm />
          <Button variant="ghost">Forgotten password?</Button>
        </div>
      </main>
      <Button
        variant="outline"
        className="rounded-full w-55 text-base border-teal-300"
        onClick={onRegisterClick}
      >
        Create new account
      </Button>
    </div>
  );
};
