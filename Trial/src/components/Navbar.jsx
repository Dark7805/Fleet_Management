import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const NavItem = ({ label, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`nav-item ${open ? 'active' : ''}`}>
      <div 
        className="nav-main" 
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <span className="arrow">{open ? "▲" : "▼"}</span>
      </div>
      <div className="sub-menu" aria-hidden={!open}>
        <ul>
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return (
                <li className="sub-menu-item" onClick={() => setOpen(false)}>
                  {child}
                </li>
              );
            }
            return child;
          })}
        </ul>
      </div>
    </div>
  );
};

const Navbar = () => {
  // Handle logout action
  const handleLogout = () => {
    // Clear any user session or token here, example:
    localStorage.removeItem("userToken");
    // Redirect to login or home page
    window.location.href = "/login";
  };

  return (
    <div className="navbar-container">
      <h2 className="navbar-brand">FleetManager</h2>
      <nav className="navbar" aria-label="Main navigation">
        <NavItem label="Dashboard">
          <Link to="/dashboard">Home</Link>
        </NavItem>

        <NavItem label="Vehicles">
          <Link to="/vehicles">Vehicle List</Link>
          <Link to="/vehicles/add">Add Vehicle</Link>
          <Link to="/vehicles/groups">Vehicle Groups</Link>
        </NavItem>

        <NavItem label="Drivers">
          <Link to="/drivers">Driver List</Link>
          <Link to="/drivers/add">Add Driver</Link>
        </NavItem>

        <NavItem label="Bookings">
          <Link to="/bookings">All Bookings</Link>
          <Link to="/bookings/new">Create Booking</Link>
        </NavItem>

        <NavItem label="Customers">
          <Link to="/customers">Customer List</Link>
          <Link to="/customers/add">Add Customer</Link>
        </NavItem>

        <NavItem label="Fuel">
          <Link to="/fuel">Fuel Logs</Link>
          <Link to="/fuel/add">Add Fuel Entry</Link>
        </NavItem>

        <NavItem label="Reminders">
          <Link to="/reminders">View Reminders</Link>
          <Link to="/reminders/add">Add Reminder</Link>
        </NavItem>

        <NavItem label="Tracking">
          <Link to="/tracking">View On Map</Link>
        </NavItem>

        {/* Add the logout button at the end */}
        <NavItem label="Logout">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </NavItem>
      </nav>
    </div>
  );
};

export default Navbar;
