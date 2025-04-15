import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaChartLine, FaUsers, FaTools, FaSignInAlt } from 'react-icons/fa';
import './WelcomeLanding.css'; // We'll create this CSS file next

const WelcomeLandingPage = () => {
  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <h1>Welcome to Fleet Management and Allocation System</h1>
        <p>Efficiently manage your vehicle fleet with our comprehensive solution</p>
      </header>

      <main className="welcome-main">
        <section className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FaCar className="feature-icon" />
              <h3>Vehicle Management</h3>
              <p>Track all your vehicles in one centralized system with detailed records.</p>
            </div>
            <div className="feature-card">
              <FaChartLine className="feature-icon" />
              <h3>Real-time Analytics</h3>
              <p>Get insights into fleet utilization, maintenance costs, and more.</p>
            </div>
            <div className="feature-card">
              <FaUsers className="feature-icon" />
              <h3>Driver Allocation</h3>
              <p>Efficiently assign drivers to vehicles with scheduling tools.</p>
            </div>
            <div className="feature-card">
              <FaTools className="feature-icon" />
              <h3>Maintenance Tracking</h3>
              <p>Schedule and track vehicle maintenance to ensure fleet reliability.</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to Get Started?</h2>
          <p>Join hundreds of organizations managing their fleets efficiently with our system</p>
          <Link to="/login" className="login-button">
            <FaSignInAlt /> Proceed to Login
          </Link>
        </section>
      </main>

      <footer className="welcome-footer">
        <p>© {new Date().getFullYear()} Fleet Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WelcomeLandingPage;