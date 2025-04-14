import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEdit, FaTimes, FaCheck } from "react-icons/fa";
import "./Bookings.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings");
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await axios.put(`http://localhost:5000/api/bookings/${editData._id}`, editData);
      setBookings(prev => prev.map(b => b._id === editData._id ? { ...b, ...editData } : b));
      setTimeout(() => {
        setSelectedBooking(null);
      }, 300); // Delay to allow animation
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bookings-dashboard">
      <header className="bookings-header">
        <h1>Bookings Management</h1>
        <div className="header-actions">
          <button className="refresh-btn" onClick={() => window.location.reload()}>
            Refresh
          </button>
        </div>
      </header>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading bookings...</p>
        </div>
      ) : (
        <div className="bookings-content">
          <div className="bookings-table-container">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Driver</th>
                  <th>Trip Type</th>
                  <th>Route</th>
                  <th>Distance</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="booking-row">
                    <td>
                      <div className="customer-cell">
                        <span className="customer-name">{b.customer?.name}</span>
                      </div>
                    </td>
                    <td>{b.driver?.driverName}</td>
                    <td>
                      <span className={`trip-type ${b.tripType.toLowerCase().replace(' ', '-')}`}>
                        {b.tripType}
                      </span>
                    </td>
                    <td>
                      <div className="route-info">
                        <span className="location">{b.startLocation}</span>
                        <span className="route-arrow">→</span>
                        <span className="location">{b.endLocation}</span>
                      </div>
                    </td>
                    <td>{b.totalKm} km</td>
                    <td className="amount-cell">₹{b.totalAmount}</td>
                    <td>
                      <span className={`status-badge ${b.tripStatus.toLowerCase()}`}>
                        {b.tripStatus}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="view-btn"
                        onClick={() => {
                          setSelectedBooking(b);
                          setEditData(b);
                        }}
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {selectedBooking && (
        <div className={`modal-overlay ${selectedBooking ? 'active' : ''}`}>
          <div className="edit-modal">
            <div className="modal-header">
              <h2>Edit Booking Details</h2>
              <button 
                className="close-modal"
                onClick={() => setSelectedBooking(null)}
                disabled={isUpdating}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Trip Type</label>
                  <select 
                    name="tripType" 
                    value={editData.tripType} 
                    onChange={handleEditChange}
                    className="form-select"
                  >
                    <option value="Single Trip">Single Trip</option>
                    <option value="Round Trip">Round Trip</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Start Location</label>
                  <input
                    type="text"
                    name="startLocation"
                    value={editData.startLocation}
                    onChange={handleEditChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>End Location</label>
                  <input
                    type="text"
                    name="endLocation"
                    value={editData.endLocation}
                    onChange={handleEditChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Distance (KM)</label>
                  <input
                    type="number"
                    name="totalKm"
                    value={editData.totalKm}
                    onChange={handleEditChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Total Amount (₹)</label>
                  <input
                    type="number"
                    name="totalAmount"
                    value={editData.totalAmount}
                    onChange={handleEditChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Trip Status</label>
                  <select 
                    name="tripStatus" 
                    value={editData.tripStatus} 
                    onChange={handleEditChange}
                    className="form-select"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setSelectedBooking(null)}
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

export default Bookings;