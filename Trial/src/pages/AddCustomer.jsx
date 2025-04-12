import React, { useState } from "react";
import axios from "axios";

const AddCustomer = () => {
  const [customerData, setCustomerData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/addCustomer", customerData);
      alert("Customer added successfully!");
      setCustomerData({
        name: "",
        mobile: "",
        email: "",
        address: "",
      });
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Failed to add customer.");
    }
  };

  return (
    <div className="p-6 bg-black rounded-lg shadow-md max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Add Customer</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={customerData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={customerData.mobile}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={customerData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea
            name="address"
            value={customerData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="md:col-span-2 text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
