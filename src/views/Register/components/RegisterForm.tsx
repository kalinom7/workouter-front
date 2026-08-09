import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const onRegisterClick = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    navigate("/home");
  };
  return (
    <div className="flex flex-col gap-4 items-center">
      <main className="flex flex-col gap-2 items-center">
        <Input
          className="w-75 rounded-full"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          className="w-75 rounded-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          className="w-75 rounded-full"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </main>
      <Button
        onClick={onRegisterClick}
        size="lg"
        className="w-55 text-xl rounded-full bg-teal-300"
      >
        {" "}
        Register{" "}
      </Button>
    </div>
  );
};
