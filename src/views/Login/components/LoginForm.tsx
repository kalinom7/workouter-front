import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
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
      </main>
      <Button
        size="lg"
        className="w-55 text-xl rounded-full bg-teal-300"
        onClick={() => {
          navigate("/home");
        }}
      >
        Login
      </Button>
    </div>
  );
};
