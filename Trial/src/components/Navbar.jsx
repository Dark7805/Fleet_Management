import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const SidebarItem = ({ label, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="sidebar-item">
      <div className="sidebar-main" onClick={() => setOpen(!open)}>
        {label}
        <span className="arrow">{open ? "▲" : "▼"}</span>
      </div>
      {open && <div className="sidebar-sub">{children}</div>}
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="sidebar">
      <h2>FleetManager</h2>

      <SidebarItem label="Dashboard">
        <Link to="/">Home</Link>
      </SidebarItem>

      <SidebarItem label="Vehicles">
        <Link to="/vehicles">Vehicle List</Link>
        <Link to="/vehicles/add">Add Vehicle</Link>
        <Link to="/vehicles/groups">Vehicle Groups</Link>
      </SidebarItem>

      <SidebarItem label="Drivers">
        <Link to="/drivers">Driver List</Link>
        <Link to="/drivers/add">Add Driver</Link>
      </SidebarItem>

      <SidebarItem label="Bookings">
        <Link to="/bookings">All Bookings</Link>
        <Link to="/bookings/new">Create Booking</Link>
      </SidebarItem>

      <SidebarItem label="Customers">
        <Link to="/customers">Customer List</Link>
        <Link to="/customers/add">Add Customer</Link>
      </SidebarItem>

      <SidebarItem label="Fuel">
        <Link to="/fuel">Fuel Logs</Link>
        <Link to="/fuel/add">Add Fuel Entry</Link>
      </SidebarItem>

      <SidebarItem label="Reminders">
        <Link to="/reminders">View Reminders</Link>
        <Link to="/reminders/add">Add Reminder</Link>
      </SidebarItem>
    </nav>
  );
};

export default Navbar;
