import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLoginOption = () => {
    setShowLoginModal(true)
  };

  const handleCloseModal = () => {
    setShowLoginModal(false)
    setShowRegisterModal(false)
  };

  const handleLogin = () => {
    setShowLoginModal(false)
    navigate('/home')
  };

  const handleRegisterOption = () => {
    //TODO: implement registration flow
    setShowRegisterModal(true)
  };

  const handleRegister = () => {
    setShowRegisterModal(false)
    navigate('/home')
  };
  
  return (
    <main>
      <div id="login-page">
        <h1>Welcome</h1>

        <div className="buttons">
          <button onClick={handleLoginOption}>Login</button>
          <button onClick={handleRegisterOption}>Register</button>
        </div>

        {showLoginModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
        
        
              <h2>Login</h2>

              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />

              <button onClick={handleLogin}>Continue</button>
              <button
                onClick={handleCloseModal}
                className="close-button"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {showRegisterModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Register</h2>

              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" />

              <button onClick={handleRegister}>Continue</button>
              <button
                onClick={handleCloseModal}
                className="close-button"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Login
