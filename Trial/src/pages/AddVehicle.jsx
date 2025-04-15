import React, { useState } from "react";
import axios from "axios";
import "./AddVehicles.css";

const AddVehicle = () => {
  const [formData, setFormData] = useState({
    registrationNumber: "",
    vehicleName: "",
    modelNumber: "",
    chassisNumber: "",
    engineNumber: "",
    manufacturedBy: "",
    vehicleType: "",
    vehicleColour: "#ffffff", // Default to white hex color
    registrationExpiryDate: "",
    vehicleGroup: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Adding Vehicle:", formData);
    try {
      await axios.post("http://localhost:5000/api/addVehicles", formData);
      alert("Vehicle added");
      setFormData({
        registrationNumber: "",
        vehicleName: "",
        modelNumber: "",
        chassisNumber: "",
        engineNumber: "",
        manufacturedBy: "",
        vehicleType: "",
        vehicleColour: "#ffffff", // Reset to default color
        registrationExpiryDate: "",
        vehicleGroup: "",
      });
    } catch (err) {
      console.log("Error in adding Vehicle: ", err);
    }
  };

  return (
    <div className="add-vehicle-container">
      <h2>Add Vehicle</h2>
      <form className="vehicle-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Vehicle Name</label>
            <input
              type="text"
              name="vehicleName"
              value={formData.vehicleName}
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Model Number</label>
            <input
              type="text"
              name="modelNumber"
              value={formData.modelNumber}
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Chassis Number</label>
            <input
              type="text"
              name="chassisNumber"
              value={formData.chassisNumber}
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Engine Number</label>
            <input
              type="text"
              name="engineNumber"
              value={formData.engineNumber}
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Manufactured By</label>
            <input
              type="text"
              name="manufacturedBy"
              value={formData.manufacturedBy}
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Vehicle Type</label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              required
              onChange={handleChange}
            >
              <option value="">Select a vehicle type</option>
              <option value="CAR">CAR</option>
              <option value="MOTORCYCLE">MOTORCYCLE</option>
              <option value="TRUCK">TRUCK</option>
              <option value="BUS">BUS</option>
              <option value="TAXI">TAXI</option>
              <option value="BICYCLE">BICYCLE</option>
            </select>
          </div>
          <div className="form-group">
            <label>Vehicle Colour</label>
            <input
              type="color"
              name="vehicleColour"
              value={formData.vehicleColour}
              required
              onChange={handleChange}
            />
            <div
              className="color-preview"
              style={{ backgroundColor: formData.vehicleColour }}
            />
          </div>
          <div className="form-group">
            <label>Registration Expiry Date</label>
            <input
              type="date"
              name="registrationExpiryDate"
              value={formData.registrationExpiryDate}
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Vehicle Group</label>
            <select
              name="vehicleGroup"
              value={formData.vehicleGroup}
              required
              onChange={handleChange}
            >
              <option value="">Select Group</option>
              <option value="group-a">Group A</option>
              <option value="group-b">Group B</option>
              <option value="group-c">Group C</option>
            </select>
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" className="submit-btn">
            Add Vehicle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicle;
