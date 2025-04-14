// src/components/AddDriver.jsx
import React, { useState } from "react";
import axios from "axios";
import "./AddDriver.css"; // Add this CSS file for the styles

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", formData);
    try {
      await axios.post("http://localhost:5000/api/drivers", formData);
      alert("Driver added!");
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
    }
  };

  return (
    <div className="add-driver-container">
      <h2 className="form-header">Add Driver</h2>
      <form onSubmit={handleSubmit} className="driver-form">
        <div className="form-group">
          <label>Driver Name</label>
          <input
            type="text"
            name="driverName"
            className="form-input"
            value={formData.driverName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            className="form-input"
            value={formData.mobileNumber}
            onChange={handleChange}
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
          />
        </div>

        <div className="form-group">
          <label>License Number</label>
          <input
            type="text"
            name="licenseNumber"
            className="form-input"
            value={formData.licenseNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Joining Date</label>
          <input
            type="date"
            name="joiningDate"
            className="form-input"
            value={formData.joiningDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Driver Status</label>
          <select
            name="driverStatus"
            className="form-select"
            value={formData.driverStatus}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            className="form-input"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            className="form-input"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <div className="form-footer">
          <button type="submit" className="submit-btn">
            Add Driver
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDriver;
