import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthModal from './components/AuthModal'
import './Login.css'

type AuthMode = 'login' | 'register' | null

function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<AuthMode>(null)

  const closeModal = () => setMode(null)

  const handleSubmit = (data: {
    username: string
    password: string
    confirmPassword?: string
  }) => {
    console.log(mode, data)

    closeModal()
    navigate('/home')
  }

  return (
    <main>
      <div id="login-page">
        <h1>Welcome</h1>

        <div className="buttons">
          <button onClick={() => setMode('login')}>Login</button>
          <button onClick={() => setMode('register')}>Register</button>
        </div>

        {mode && (
          <AuthModal
            mode={mode}
            onClose={closeModal}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </main>
  )
}

export default Login
