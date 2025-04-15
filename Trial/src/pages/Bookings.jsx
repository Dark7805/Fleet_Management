import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEdit, FaTimes, FaCheck } from "react-icons/fa";
import "./Bookings.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const [customers, setCustomers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, customersRes, driversRes] = await Promise.all([
          axios.get("http://localhost:5000/api/bookings"),
          axios.get("http://localhost:5000/api/getcustomers"),
          axios.get("http://localhost:5000/api/getDrivers"),
        ]);
        setBookings(bookingsRes.data);
        setCustomers(customersRes.data);
        setDrivers(driversRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Fetch available drivers when the start or end date changes
    const fetchAvailableDrivers = async () => {
      if (!editData.startDate || !editData.endDate) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/api/available-drivers?startDate=${editData.startDate}&endDate=${editData.endDate}`
        );
        setAvailableDrivers(res.data);
      } catch (err) {
        console.error("Failed to fetch available drivers", err);
      }
    };

    fetchAvailableDrivers();
  }, [editData.startDate, editData.endDate]); // Trigger when startDate or endDate changes

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await axios.put(`http://localhost:5000/api/trips/${editData._id}`, editData);
      setBookings((prev) =>
        prev.map((b) => (b._id === editData._id ? { ...b, ...editData } : b))
      );
      setTimeout(() => {
        setSelectedBooking(null);
      }, 300);
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const getDriverStatus = (driver) => {
    if (!driver) return "Yet to Assign";
    return driver.driverStatus === "Available" ? "Driver Available" : "Driver Not Available";
  };

  return (
    <div className="bookings-dashboard">
      <header className="bookings-header">
        <h1>Bookings Management</h1>
      </header>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading bookings...</p>
        </div>
      ) : (
        <div className="bookings-content">
          <div className="bookings-table-container">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Driver</th>
                  <th>Driver Status</th>
                  <th>Trip Type</th>
                  <th>Route</th>
                  <th>Distance</th>
                  <th>Amount</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="booking-row">
                    <td><span className="customer-name">{b.customer?.name}</span></td>
                    <td>{b.driver ? b.driver.driverName || "Name missing" : "Not Assigned"}</td>
                    <td>{getDriverStatus(b.driver)}</td>
                    <td><span className={`trip-type ${b.tripType.toLowerCase().replace(" ", "-")}`}>{b.tripType}</span></td>
                    <td>
                      <div className="route-info">
                        <span className="location">{b.startLocation}</span>
                        <span className="route-arrow">→</span>
                        <span className="location">{b.endLocation}</span>
                      </div>
                    </td>
                    <td>{b.totalKm} km</td>
                    <td className="amount-cell">₹{b.totalAmount}</td>
                    <td>{formatDate(b.startDate)}</td>
                    <td>{formatDate(b.endDate)}</td>
                    <td><span className={`status-badge ${b.tripStatus.toLowerCase()}`}>{b.tripStatus}</span></td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => {
                          setSelectedBooking(b);
                          setEditData({
                            ...b,
                            customer: b.customer?._id,
                            driver: b.driver?._id,
                          });
                        }}
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ✨ Edit Modal */}
      {selectedBooking && (
        <div className={`modal-overlay ${selectedBooking ? "active" : ""}`}>
          <div className="edit-modal">
            <div className="modal-header">
              <h2>Edit Booking Details</h2>
              <button className="close-modal" onClick={() => setSelectedBooking(null)} disabled={isUpdating}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Customer</label>
                  <select
                    name="customer"
                    value={editData.customer}
                    onChange={handleEditChange}
                    className="form-select"
                  >
                    <option value="">Select Customer</option>
                    {customers.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Driver</label>
                  <select
                    name="driver"
                    value={editData.driver}
                    onChange={handleEditChange}
                    className="form-select"
                  >
                    <option value="">Select Driver</option>
                    {availableDrivers.map((d) => (
                      <option key={d._id} value={d._id}>{d.driverName}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Trip Type</label>
                  <select name="tripType" value={editData.tripType} onChange={handleEditChange} className="form-select">
                    <option value="Single Trip">Single Trip</option>
                    <option value="Round Trip">Round Trip</option>
                  </select>
                </div>

                {/* Other fields... */}
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setSelectedBooking(null)} disabled={isUpdating}>
                Cancel
              </button>
              <button className="update-btn" onClick={handleUpdate} disabled={isUpdating}>
                {isUpdating ? <><span className="spinner"></span> Updating...</> : <><FaCheck /> Update</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
