// Vehicles.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Vehicles.css'; // We'll update this CSS

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/getVehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5000/api/deleteVehicle/${id}`);
      setVehicles(prev => prev.filter(vehicle => vehicle._id !== id));
    } catch (error) {
      console.error("Error deleting vehicle:", error.response?.data || error.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="vehicle-list-container">
      <h2 className="page-title">Vehicle List</h2>

      {loading ? (
        <div className="loading-animation">
          <div className="spinner"></div>
          <p>Loading vehicles...</p>
        </div>
      ) : (
        <div className="table-wrapper">
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
                <th>Reg. Expiry</th>
                <th>Group</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(vehicle => (
                <tr 
                  key={vehicle._id}
                  className={deletingId === vehicle._id ? 'deleting-row' : ''}
                >
                  <td>{vehicle.vehicleName}</td>
                  <td>{vehicle.registrationNumber}</td>
                  <td>{vehicle.modelNumber}</td>
                  <td>{vehicle.chassisNumber}</td>
                  <td>{vehicle.engineNumber}</td>
                  <td>{vehicle.manufacturedBy}</td>
                  <td>{vehicle.vehicleType}</td>
                  <td>
                    <span 
                      className="color-badge" 
                      style={{ backgroundColor: vehicle.vehicleColour.toLowerCase() }}
                      title={vehicle.vehicleColour}
                    ></span>
                  </td>
                  <td>{vehicle.registrationExpiryDate}</td>
                  <td>{vehicle.vehicleGroup}</td>
                  <td>
                    <button 
                      className={`delete-btn ${deletingId === vehicle._id ? 'deleting' : ''}`}
                      onClick={() => deleteVehicle(vehicle._id)}
                      disabled={deletingId === vehicle._id}
                    >
                      {deletingId === vehicle._id ? (
                        <span className="deleting-text">Deleting...</span>
                      ) : (
                        'Delete'
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Vehicles;
