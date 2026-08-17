// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [successAnim, setSuccessAnim] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'sabriyana' && password === '12345') {
      setSuccessAnim(true);
      localStorage.setItem('isAuthenticated', 'true');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2500);
    } else {
      setError('Invalid ID or Password. Use sabriyana / 12345');
    }
  };

  return (
    <div className="login-container">
      {successAnim && (
        <div className="login-success-overlay">
          <div className="login-success-3d-text">LOGIN SUCCESSFUL</div>
        </div>
      )}

      <div className="login-card">
        <div className="login-header">
          <h1 className="login-brand-title">SABRIYANA</h1>
          <p className="login-brand-subtitle">CRAFT CHOCOLATE & HONEY</p>
          
         
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          {error && <div className="login-error-message">{error}</div>}
          
          <div className="login-input-group">
            <span className="login-input-icon"><FaUser /></span>
            <input
              type="text"
              className="login-input-field"
              placeholder="Username or Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="login-input-group">
            <span className="login-input-icon"><FaLock /></span>
            <input
              type={showPassword ? 'text' : 'password'}
              className="login-input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span 
              className="login-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="login-options-row">
            <label className="login-remember-label">
              <input
                type="checkbox"
                className="login-checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
            <a href="#forgot" className="login-forgot-link" onClick={(e) => e.preventDefault()}>
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login-submit-button">
            LOG IN TO SABRIYANA
          </button>
        </form>

        <div className="login-footer">
          <p>Need an account? <span className="login-admin-contact">Contact your Administrator.</span></p>
        </div>
      </div>
      <div className="login-page-footer-text">
        © 2025 Sabriyana Project. All rights reserved.
      </div>
    </div>
  );
};

export default Login;