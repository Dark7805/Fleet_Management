import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import AddVehicle from "./pages/AddVehicle";
import VehicleGroups from "./pages/VehicleGroups";
import Vehicles from "./pages/Vehicles";
import Customers from "./pages/Customers";
import Fuel from "./pages/Fuel";
import AddDriver from "./pages/AddDriver";
import Drivers from "./pages/Drivers";
import CreateBooking from "./pages/CreateBooking";
import Bookings from "./pages/Bookings";
import AddCustomer from "./pages/AddCustomer";
import AddFuel from "./pages/AddFuel";
import Remainder from "./pages/Remainder";
import AddRemainder from "./pages/AddRemainder";

import "./App.css";

function App() {
  return (
    <div className="main-container">
      <Navbar />
      <div className="content">
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Vehicles */}
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/add" element={<AddVehicle />} />
          <Route path="/vehicles/groups" element={<VehicleGroups />} />

          {/* Drivers */}
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/drivers/add" element={<AddDriver />} />

          {/* Bookings */}
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/bookings/new" element={<CreateBooking />} />

          {/* Customers */}
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/add" element={<AddCustomer />} />

          {/* Fuel */}
          <Route path="/fuel" element={<Fuel />} />
          <Route path="/fuel/add" element={<AddFuel />} />

          {/* Reminders */}
          <Route path="/remainders" element={<Remainder />} />
          <Route path="/remainders/add" element={<AddRemainder />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
