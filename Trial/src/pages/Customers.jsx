import './Customer.css';
import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", mobile: "", email: "", address: "" });

  const fetchCustomers = async () => {
    const res = await fetch("http://localhost:5000/api/getcustomers");
    const data = await res.json();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    await fetch(`http://localhost:5000/api/customers/${id}`, { method: "DELETE" });
    fetchCustomers();
  };

  const handleEditClick = (customer) => {
    setEditingCustomer(customer._id);
    setEditForm(customer);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/customers/${editingCustomer}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setEditingCustomer(null);
    fetchCustomers();
  };

  return (
    <div className="bookings-dashboard">
      <div className="bookings-header">
        <h1>Customer List</h1>
      </div>

      <div className="bookings-table-container">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              <tr key={cust._id} className="booking-row">
                <td>{cust.name}</td>
                <td>{cust.mobile}</td>
                <td>{cust.email}</td>
                <td>{cust.address}</td>
                <td>
                  <button className="view-btn" onClick={() => handleEditClick(cust)}>
                    <FaEye />
                  </button>
                  <button className="view-btn" onClick={() => deleteCustomer(cust._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingCustomer && (
        <div className="modal-overlay active">
          <div className="edit-modal">
            <div className="modal-header">
              <h2>Edit Customer</h2>
              <button className="close-modal" onClick={() => setEditingCustomer(null)}>×</button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={editForm.name} onChange={handleEditChange} className="form-input" />
                  </div>
                  <div className="form-group">
                    <label>Mobile</label>
                    <input type="text" name="mobile" value={editForm.mobile} onChange={handleEditChange} className="form-input" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={editForm.email} onChange={handleEditChange} className="form-input" />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" value={editForm.address} onChange={handleEditChange} className="form-input" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setEditingCustomer(null)}>Cancel</button>
                <button type="submit" className="update-btn">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
