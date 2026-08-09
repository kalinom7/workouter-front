import { Button } from "@/components/ui/button";
import { RegisterForm } from "./components/RegisterForm";
import { useNavigate } from "react-router-dom";

export const RegisterView = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col justify-center items-center pb-5 ">
      <main className="flex-1 flex flex-col justify-center w-full gap-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold">WORKOUTER</h1>
          <p>LOGO</p>
        </div>
        <div className="w-full flex flex-col items-center gap-4">
          <h2 className="text-2xl">Create new account</h2>
          <RegisterForm />
        </div>
      </main>
      <Button
        variant="outline"
        className="rounded-full w-55 text-base border-teal-300"
        onClick={() => navigate("/")}
      >
        I already have an account
      </Button>
    </div>
  );
};
