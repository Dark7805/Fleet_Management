import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Vehicles.css';
import { FaEye, FaTrash, FaTimes, FaSave } from 'react-icons/fa';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // Debugging state
  const [debugInfo, setDebugInfo] = useState('');

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

  const openUpdateForm = (vehicle) => {
    console.log('Opening update form for vehicle:', vehicle); // Debug log
    setDebugInfo(`Attempting to open modal for vehicle: ${vehicle._id}`);
    
    setSelectedVehicle(vehicle);
    setFormData({
      vehicleName: vehicle.vehicleName || '',
      registrationNumber: vehicle.registrationNumber || '',
      modelNumber: vehicle.modelNumber || '',
      chassisNumber: vehicle.chassisNumber || '',
      engineNumber: vehicle.engineNumber || '',
      manufacturedBy: vehicle.manufacturedBy || '',
      vehicleType: vehicle.vehicleType || '',
      vehicleColour: vehicle.vehicleColour || '',
      registrationExpiryDate: vehicle.registrationExpiryDate?.substring(0, 10) || '',
      vehicleGroup: vehicle.vehicleGroup || ''
    });
    
    setIsModalOpen(true);
    setDebugInfo(prev => prev + ' - Modal state set to true');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
    setDebugInfo('Modal closed');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/updateVehicle/${selectedVehicle._id}`, formData);
      fetchVehicles();
      closeModal();
    } catch (error) {
      console.error("Error updating vehicle:", error.response?.data || error.message);
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
                <th>Actions</th>
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
                  <td>
                    <span 
                      className="color-badge" 
                      style={{ backgroundColor: vehicle.vehicleColour?.toLowerCase() || '#ccc' }}
                      title={vehicle.vehicleColour}
                    ></span>
                  </td>
                  <td>{vehicle.registrationExpiryDate?.substring(0, 10)}</td>
                  <td>{vehicle.vehicleGroup}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="view-btn"
                        onClick={() => {
                          console.log('Eye button clicked'); // Debug log
                          openUpdateForm(vehicle);
                        }}
                        title="View/Edit Details"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => deleteVehicle(vehicle._id)}
                        disabled={deletingId === vehicle._id}
                        title="Delete Vehicle"
                      >
                        {deletingId === vehicle._id ? 'Deleting...' : <FaTrash />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Form Modal */}
      {isModalOpen && (
        <div className="modal-overlay active" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Update Vehicle Details</h3>
              <button className="close-btn" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Vehicle Name</label>
                <input
                  type="text"
                  name="vehicleName"
                  value={formData.vehicleName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Registration Number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  <FaSave /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehicles;