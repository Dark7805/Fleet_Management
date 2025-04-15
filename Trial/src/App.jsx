import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

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
import Tracking from "./pages/Tracking";
import Login from "./login/Login";
import Signup  from './login/Signup'
import { AuthProvider, useAuth } from "./components/AuthContext";

import "./App.css";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function AppContent() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Hide Navbar on login page
  const hideNavbar = location.pathname === "/login" || location.pathname==="/signup";
 
  return (
    <div className="main-container">
      {!hideNavbar && <Navbar />}
      <div className="content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicles"
            element={
              <ProtectedRoute>
                <Vehicles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicles/add"
            element={
              <ProtectedRoute>
                <AddVehicle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicles/groups"
            element={
              <ProtectedRoute>
                <VehicleGroups />
              </ProtectedRoute>
            }
          />

          <Route
            path="/drivers"
            element={
              <ProtectedRoute>
                <Drivers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/drivers/add"
            element={
              <ProtectedRoute>
                <AddDriver />
              </ProtectedRoute>
            }
          />

          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings/new"
            element={
              <ProtectedRoute>
                <CreateBooking />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <Customers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers/add"
            element={
              <ProtectedRoute>
                <AddCustomer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/fuel"
            element={
              <ProtectedRoute>
                <Fuel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fuel/add"
            element={
              <ProtectedRoute>
                <AddFuel />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reminders"
            element={
              <ProtectedRoute>
                <Remainder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reminders/add"
            element={
              <ProtectedRoute>
                <AddRemainder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tracking"
            element={
              <ProtectedRoute>
                <Tracking />
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
