import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaTrash, FaUser, FaPhone, FaIdCard, FaCalendarAlt, FaCheck, FaTimes } from "react-icons/fa";
import "./Drivers.css";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/getDrivers");
      setDrivers(res.data);
    } catch (err) {
      console.error("Error fetching drivers:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteDriver = async (id) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      try {
        await axios.delete(`http://localhost:5000/api/deleteDriver/${id}`);
        alert("Driver deleted successfully");
        fetchDrivers();
      } catch (err) {
        console.error("Error deleting driver:", err);
      }
    }
  };

  const handleEditClick = (driver) => {
    setSelectedDriver({
      ...driver,
      joiningDate: driver.joiningDate ? new Date(driver.joiningDate).toISOString().split('T')[0] : ''
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setSelectedDriver({ ...selectedDriver, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await axios.put(
        `http://localhost:5000/api/updateDriver/${selectedDriver._id}`,
        selectedDriver
      );
      alert("Driver updated successfully");
      setShowModal(false);
      fetchDrivers();
    } catch (err) {
      console.error("Error updating driver:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading drivers...</p>
      </div>
    );
  }

  return (
    <div className="drivers-container">
      <div className="drivers-header">
        <h2><FaUser /> Driver Management</h2>
        <p>View and manage all drivers in your fleet</p>
      </div>

      <div className="drivers-table-container">
        <table className="drivers-table">
          <thead>
            <tr>
              <th><FaUser /> Name</th>
              <th><FaPhone /> Mobile</th>
              <th>Age</th>
              <th><FaIdCard /> License No</th>
              <th><FaCalendarAlt /> Joining Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.length > 0 ? (
              drivers.map((driver) => (
                <tr key={driver._id} className="driver-row">
                  <td>{driver.driverName}</td>
                  <td>{driver.mobileNumber}</td>
                  <td>{driver.age}</td>
                  <td>{driver.licenseNumber}</td>
                  <td>{new Date(driver.joiningDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${driver.driverStatus.toLowerCase()}`}>
                      {driver.driverStatus}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button 
                      onClick={() => handleEditClick(driver)}
                      className="view-btn"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => deleteDriver(driver._id)}
                      className="delete-btn"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="no-data">
                <td colSpan="7">No drivers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showModal && selectedDriver && (
        <div className="modal-overlay active">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit Driver Details</h3>
              <button 
                className="close-modal"
                onClick={() => setShowModal(false)}
                disabled={isUpdating}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label><FaUser /> Name</label>
                <input
                  type="text"
                  name="driverName"
                  value={selectedDriver.driverName}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label><FaPhone /> Mobile</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={selectedDriver.mobileNumber}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={selectedDriver.age}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label><FaIdCard /> License No</label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={selectedDriver.licenseNumber}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label><FaCalendarAlt /> Joining Date</label>
                <input
                  type="date"
                  name="joiningDate"
                  value={selectedDriver.joiningDate}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>Status</label>
                <select
                  name="driverStatus"
                  value={selectedDriver.driverStatus}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowModal(false)}
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button 
                className="update-btn"
                onClick={handleUpdate}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <span className="spinner"></span>
                    Updating...
                  </>
                ) : (
                  <>
                    <FaCheck /> Update
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drivers;