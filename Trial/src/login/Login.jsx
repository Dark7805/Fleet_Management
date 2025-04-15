import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/AuthContext'; // Assuming you have this AuthContext to manage authentication
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // Assuming this context provides the login method for setting auth state
  const from = location.state?.from?.pathname || '/dashboard'; // Default redirect to dashboard if no previous page

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Make API call to your login endpoint (replace with your actual API URL)
      const response = await axios.post('http://localhost:5000/api/login', formData);

      // Assuming the API returns a token after successful login
      const { token } = response.data;

      if (token) {
        // Store the token in localStorage or sessionStorage
        localStorage.setItem('token', token);

        // Optionally, update your auth context or global state here
        login(); // Assuming login sets isAuthenticated to true in context

        navigate(from, { replace: true }); // Redirect user to previous page or default
        console.log('Login successful');
      }
    } catch (error) {
      console.error('Login error:', error);
      console.log(error.response.data)
      alert('Invalid credentials');
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
            />
          </div>

          <div className="form-group">
            <label><FaLock /> Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="auth-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
