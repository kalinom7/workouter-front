import { useState, type ChangeEvent } from 'react'

type AuthMode = 'login' | 'register'

interface AuthModalProps {
  readonly mode: AuthMode
  readonly onClose: () => void
  readonly onSubmit: (data: {
    username: string
    password: string
    confirmPassword?: string
  }) => void
}

function AuthModal({ mode, onClose, onSubmit }: AuthModalProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{mode === 'register' ? 'Register' : 'Login'}</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />

        {mode === 'register' && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
          />
        )}

        <button
          onClick={() =>
            onSubmit({ username, password, confirmPassword })
          }
        >
          {mode === 'register' ? 'Register' : 'Login'}
        </button>

        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  )
}

export default AuthModal
