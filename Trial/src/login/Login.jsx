import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ email: '', password: '', general: '' }); // Reset errors
    
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      const { token } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        login(); // This should set isAuthenticated to true
        
        // Use the redirect path from state or default to dashboard
        const redirectTo = location.state?.from || '/dashboard';
        navigate(redirectTo, { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response) {
        // Server responded with error status (4xx, 5xx)
        if (error.response.status === 401) {
          setErrors({
            password: 'Invalid email or password',
            email: 'Invalid email or password'
          });
        } else if (error.response.status === 400) {
          // Handle validation errors from server
          const serverErrors = error.response.data.errors || {};
          setErrors(prev => ({
            ...prev,
            ...serverErrors
          }));
        } else {
          setErrors(prev => ({
            ...prev,
            general: 'An error occurred. Please try again.'
          }));
        }
      } else if (error.request) {
        // Request was made but no response
        setErrors(prev => ({
          ...prev,
          general: 'Network error. Please check your connection.'
        }));
      } else {
        // Other errors
        setErrors(prev => ({
          ...prev,
          general: 'Login failed. Please try again.'
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2><FaSignInAlt /> Welcome Back</h2>
          <p>Please enter your credentials to login</p>
        </div>

        {errors.general && (
          <div className="error-message general-error">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label><FaEnvelope /> Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <div className="error-message field-error">
                {errors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <label><FaLock /> Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className={errors.password ? 'error' : ''}
              />
              <button 
                type="button" 
                onClick={handlePasswordToggle} 
                className="password-toggle"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && (
              <div className="error-message field-error">
                {errors.password}
              </div>
            )}
          </div>

          <div className="auth-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            <Link to="/">Back to Welcome</Link> <br />
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;