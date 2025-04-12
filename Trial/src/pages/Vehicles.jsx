import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Vehicles.css'; // Optional: your custom styles

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getVehicles'); // Adjust this if you're using a different route
      setVehicles(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const deleteVehicle = async (id) => {
    console.log("Attempting to delete vehicle with ID:", id);
    try {
      await axios.delete(`http://localhost:5000/api/deleteVehicle/${id}`);
      setVehicles(prev => prev.filter(vehicle => vehicle._id !== id));
    } catch (error) {
      console.error("Error deleting vehicle:", error.response?.data || error.message);
    }
  };
  

  return (
    <div className="vehicle-list-container">
      <h2>Vehicle List</h2>
      <table className="vehicle-table">
        <thead>
          <tr>
            <th>Vehicle Name</th>
            <th>Registration</th>
            <th>Model</th>
            <th>Chassis No</th>
            <th>Engine No</th>
            <th>Manufacturer</th>
            <th>Type</th>
            <th>Color</th>
            <th>registrationExpiryDate</th>
            <th>Group</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => (
            <tr key={vehicle._id}>
              <td>{vehicle.vehicleName}</td>
              <td>{vehicle.registrationNumber}</td>
              <td>{vehicle.modelNumber}</td>
              <td>{vehicle.chassisNumber}</td>
              <td>{vehicle.engineNumber}</td>
              <td>{vehicle.manufacturedBy}</td>
              <td>{vehicle.vehicleType}</td>
              <td>{vehicle.vehicleColour}</td>
              <td>{vehicle.registrationExpiryDate}</td>
              <td>{vehicle.vehicleGroup}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteVehicle(vehicle._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vehicles;
