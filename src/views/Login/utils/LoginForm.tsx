import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <>
        <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={() => { navigate("/home") }}>Login</Button>
        
        </>
    )
}