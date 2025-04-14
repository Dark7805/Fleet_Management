import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddFuel.css";

const FuelForm = () => {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [formData, setFormData] = useState({
    vehicleId: "",
    driverId: "",
    quantity: "",
    odometer: "",
    amount: "",
    comment: "",
    includeInExpense: false,
  });

  useEffect(() => {
    const fetchData = async () => {
        try {
          const [vehicleRes, driverRes] = await Promise.all([
            axios.get('http://localhost:5000/api/getVehicles'),
            axios.get('http://localhost:5000/api/getDrivers')
          ]);
    
          console.log("Vehicles:", vehicleRes.data); // 👈 Add this
          console.log("Drivers:", driverRes.data);
          console.log("Vehicle Names:", vehicles.map((vehicle) => v.vehicleName));
          console.log("Driver Names:", drivers.map((driver) => d.driverName));

          setVehicles(vehicleRes.data);
          setDrivers(driverRes.data);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/addFuel", formData);
      alert("Fuel entry added!");
    } catch (err) {
      console.error("Error submitting fuel:", err);
      alert("Error adding fuel entry.");
    }
  };

  return (
    <div className="fuel-form-container">
      <h2>Add Fuel Entry</h2>
      <form onSubmit={handleSubmit} className="fuel-form">
        <div className="form-row">
          <div className="form-group">
            <label>Vehicle</label>
            <select name="vehicleId" onChange={handleChange} required>
              <option value="">Select Vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.vehicleName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Driver</label>
            <select name="driverId" onChange={handleChange} required>
              <option value="">Select Driver</option>
              {drivers.map((driver) => (
                <option key={driver._id} value={driver._id}>
                  {driver.driverName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Fuel Quantity (L)</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Odometer Reading (km)</label>
            <input type="number" name="odometer" value={formData.odometer} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Amount (₹)</label>
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Comment</label>
            <input type="text" name="comment" value={formData.comment} onChange={handleChange} />
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" name="includeInExpense" checked={formData.includeInExpense} onChange={handleChange} />
              Include in Expense
            </label>
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" className="submit-btn">Add Fuel</button>
        </div>
      </form>
    </div>
  );
};

export default FuelForm;
