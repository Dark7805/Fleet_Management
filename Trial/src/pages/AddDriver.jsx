// src/components/AddDriver.jsx
import React, { useState } from "react";
import axios from "axios";

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
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Add Driver</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 font-semibold">Driver Name</label>
            <input
              type="text"
              name="driverName"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
              value={formData.driverName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Age</label>
            <input
              type="number"
              name="age"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">License Number</label>
            <input
              type="text"
              name="licenseNumber"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
              value={formData.licenseNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
              value={formData.joiningDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Driver Status</label>
            <select
              name="driverStatus"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
              value={formData.driverStatus}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold">Address</label>
            <textarea
              name="address"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Notes</label>
            <textarea
              name="notes"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded"
          >
            Add Driver
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDriver;
