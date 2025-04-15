import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaPhone, FaIdCard, FaCalendarAlt, FaMapMarkerAlt, FaStickyNote, FaPlus } from "react-icons/fa";
import "./AddDriver.css";

const AddDriver = () => {
  const [formData, setFormData] = useState({
    driverName: "",
    mobileNumber: "",
    age: "",
    licenseNumber: "",
    joiningDate: "",
    notes: "",
    driverStatus: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post("http://localhost:5000/api/newDriver", formData);
      alert("Driver added successfully!");
      // Reset form
      setFormData({
        driverName: "",
        mobileNumber: "",
        age: "",
        licenseNumber: "",
        joiningDate: "",
        notes: "",
        driverStatus: "",
        address: "",
      });
    } catch (error) {
      console.error("Error adding driver:", error);
      alert("Failed to add driver");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="driver-form-container">
      <div className="form-header">
        <h2><FaUser /> Add New Driver</h2>
        <p>Fill in the driver details below</p>
      </div>

      <form onSubmit={handleSubmit} className="driver-form">
        <div className="form-grid">
          <div className="form-group">
            <label><FaUser /> Driver Name</label>
            <input
              type="text"
              name="driverName"
              className="form-input"
              value={formData.driverName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label><FaPhone /> Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              className="form-input"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              title="Please enter a 10-digit mobile number"
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              className="form-input"
              value={formData.age}
              onChange={handleChange}
              min="18"
              max="70"
              required
            />
          </div>

          <div className="form-group">
            <label><FaIdCard /> License Number</label>
            <input
              type="text"
              name="licenseNumber"
              className="form-input"
              value={formData.licenseNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label><FaCalendarAlt /> Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              className="form-input"
              value={formData.joiningDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Driver Status</label>
            <select
              name="driverStatus"
              className="form-select"
              value={formData.driverStatus}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on-leave">On Leave</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label><FaMapMarkerAlt /> Address</label>
            <textarea
              name="address"
              className="form-input"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="form-group full-width">
            <label><FaStickyNote /> Notes</label>
            <textarea
              name="notes"
              className="form-input"
              value={formData.notes}
              onChange={handleChange}
              rows="2"
            />
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Adding Driver...
              </>
            ) : (
              <>
                <FaPlus /> Add Driver
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDriver;