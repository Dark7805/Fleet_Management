// Drivers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Drivers.css"; // Create this for styling

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/getDrivers");
      setDrivers(res.data);
    } catch (err) {
      console.error("Error fetching drivers:", err);
    }
  };

  const deleteDriver = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteDriver/${id}`);
      alert("Driver deleted successfully");
      fetchDrivers(); // Refresh the list
    } catch (err) {
      console.error("Error deleting driver:", err);
    }
  };

  return (
    <div className="driver-list-container">
      <h2>Driver List</h2>
      <table className="driver-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Age</th>
            <th>License No</th>
            <th>Joining Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver._id}>
              <td>{driver.name}</td>
              <td>{driver.mobile}</td>
              <td>{driver.age}</td>
              <td>{driver.licenseNumber}</td>
              <td>{new Date(driver.joiningDate).toLocaleDateString()}</td>
              <td>{driver.status}</td>
              <td>
                <button
                  onClick={() => deleteDriver(driver._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Drivers;
