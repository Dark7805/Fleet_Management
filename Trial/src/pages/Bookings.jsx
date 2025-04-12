import React, { useState } from "react";

const Bookings = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    vehicle: "",
    driver: "",
    pickupDate: "",
    dropDate: "",
    status: "Scheduled",
  });

  const [bookingList, setBookingList] = useState([
    {
      customerName: "Rahul Mehra",
      vehicle: "MH12AB1234",
      driver: "Vikram Singh",
      pickupDate: "2025-04-10",
      dropDate: "2025-04-12",
      status: "Ongoing",
    },
    {
      customerName: "Neha Patil",
      vehicle: "MH14CD5678",
      driver: "Arjun Reddy",
      pickupDate: "2025-04-08",
      dropDate: "2025-04-09",
      status: "Completed",
    },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingList([...bookingList, formData]);
    setFormData({
      customerName: "",
      vehicle: "",
      driver: "",
      pickupDate: "",
      dropDate: "",
      status: "Scheduled",
    });
    alert("Booking created!");
  };

  return (
    <div>
      <h1>Manage Bookings</h1>

      {/* Booking Form */}
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Vehicle Number:
          <input
            type="text"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Driver Name:
          <input
            type="text"
            name="driver"
            value={formData.driver}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Pickup Date:
          <input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Drop Date:
          <input
            type="date"
            name="dropDate"
            value={formData.dropDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Scheduled">Scheduled</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </label>

        <button type="submit">Create Booking</button>
      </form>

      {/* Booking List Table */}
      <div className="table-container">
        <h2>Booking List</h2>
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Driver</th>
              <th>Pickup</th>
              <th>Drop</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookingList.map((booking, index) => (
              <tr key={index}>
                <td>{booking.customerName}</td>
                <td>{booking.vehicle}</td>
                <td>{booking.driver}</td>
                <td>{booking.pickupDate}</td>
                <td>{booking.dropDate}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
