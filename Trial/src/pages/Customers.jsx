import './Customer.css'

import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa"; // ✅ CORRECT


const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", mobile: "", email: "", address: "" });

  const fetchCustomers = async () => {
    const res = await fetch("http://localhost:5000/api/getcustomers")
    ;
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
    <div>
      <h2>Customer List</h2>
      <table>
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
            <tr key={cust._id}>
              <td>{cust.name}</td>
              <td>{cust.mobile}</td>
              <td>{cust.email}</td>
              <td>{cust.address}</td>
              <td>
                <FaEye style={{ cursor: "pointer", marginRight: "10px" }} onClick={() => handleEditClick(cust)} />
                <FaTrash style={{ cursor: "pointer" }} onClick={() => deleteCustomer(cust._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingCustomer && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Customer</h3>
            <form onSubmit={handleUpdate}>
  <label htmlFor="name">Name:</label>
  <input type="text" name="name" id="name" value={editForm.name} onChange={handleEditChange} required />

  <label htmlFor="mobile">Mobile:</label>
  <input type="text" name="mobile" id="mobile" value={editForm.mobile} onChange={handleEditChange} required />

  <label htmlFor="email">Email:</label>
  <input type="email" name="email" id="email" value={editForm.email} onChange={handleEditChange} required />

  <label htmlFor="address">Address:</label>
  <input type="text" name="address" id="address" value={editForm.address} onChange={handleEditChange} required />

  <button type="submit">Update</button>
  <button type="button" onClick={() => setEditingCustomer(null)}>Cancel</button>
</form>

          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
