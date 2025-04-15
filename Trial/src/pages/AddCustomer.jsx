import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import "./AddCustomer.css";

const AddCustomer = () => {
  const [customerData, setCustomerData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post("http://localhost:5000/api/addCustomers", customerData);
      alert("Customer added successfully!");
      // Reset form
      setCustomerData({
        name: "",
        mobile: "",
        email: "",
        address: "",
      });
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Failed to add customer");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="customer-form-container">
      <div className="form-header">
        <h2><FaUser /> Add New Customer</h2>
        <p>Fill in the customer details below</p>
      </div>

      <form onSubmit={handleSubmit} className="customer-form">
        <div className="form-grid">
          <div className="form-group">
            <label><FaUser /> Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={customerData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label><FaPhone /> Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              className="form-input"
              value={customerData.mobile}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              title="Please enter a 10-digit mobile number"
            />
          </div>

          <div className="form-group">
            <label><FaEnvelope /> Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={customerData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label><FaMapMarkerAlt /> Address</label>
            <textarea
              name="address"
              className="form-input"
              value={customerData.address}
              onChange={handleChange}
              rows="3"
              required
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
                Adding Customer...
              </>
            ) : (
              <>
                <FaPlus /> Add Customer
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;