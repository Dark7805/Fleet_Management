import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateBooking = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    vehicle: "",
    driver: "",
    tripType: "Single Trip",
    startLocation: "",
    endLocation: "",
    totalKm: "",
    startDate: "",
    endDate: "",
    totalAmount: "",
    tripStatus: "Scheduled",
    email: ""
  });

  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  // Fetch dropdown data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerRes = await axios.get("http://localhost:5000/api/customers");
        const vehicleRes = await axios.get("http://localhost:5000/api/getVehicles");
        const driverRes = await axios.get("http://localhost:5000/api/getDrivers");

        setCustomers(customerRes.data);
        setVehicles(vehicleRes.data);
        setDrivers(driverRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/bookings", formData);
      alert("Trip created successfully!");
      setFormData({
        customerName: "",
        vehicle: "",
        driver: "",
        tripType: "Single Trip",
        startLocation: "",
        endLocation: "",
        totalKm: "",
        startDate: "",
        endDate: "",
        totalAmount: "",
        tripStatus: "Scheduled",
        email: ""
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to create trip.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Booking</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

        <label className="col-span-2">
          Customer Name:
          <select
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c._id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </label>

        <label>
          Vehicle:
          <select
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Vehicle</option>
            {vehicles.map((v) => (
              <option key={v._id} value={v.registrationNumber}>{v.registrationNumber}</option>
            ))}
          </select>
        </label>

        <label>
          Driver:
          <select
            name="driver"
            value={formData.driver}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Driver</option>
            {drivers
              .filter((d) => d.status === "Available")
              .map((d) => (
                <option key={d._id} value={d.name}>{d.name}</option>
              ))}
          </select>
        </label>

        <label>
          Trip Type:
          <select
            name="tripType"
            value={formData.tripType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Single Trip">Single Trip</option>
            <option value="Round Trip">Round Trip</option>
          </select>
        </label>

        <label>
          Start Location:
          <input
            type="text"
            name="startLocation"
            value={formData.startLocation}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        <label>
          End Location:
          <input
            type="text"
            name="endLocation"
            value={formData.endLocation}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        <label>
          Total KM:
          <input
            type="number"
            name="totalKm"
            value={formData.totalKm}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        <label>
          Total Amount:
          <input
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        <label>
          Trip Status:
          <select
            name="tripStatus"
            value={formData.tripStatus}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </label>

        <label className="col-span-2">
          Customer Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        <div className="col-span-2 text-center">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Trip
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBooking;
