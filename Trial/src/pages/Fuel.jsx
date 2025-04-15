import React, { useEffect, useState } from "react";
import { FaGasPump, FaCar, FaUser, FaRupeeSign, FaTachometerAlt, FaComment, FaReceipt } from "react-icons/fa";
import './FuelList.css';

const FuelList = () => {
  const [fuelLogs, setFuelLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFuelLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/getFuels");
      if (!res.ok) throw new Error('Failed to fetch fuel logs');
      const data = await res.json();
      setFuelLogs(data);
    } catch (error) {
      console.error("Error fetching fuel logs:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFuelLogs();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading fuel logs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={fetchFuelLogs} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="fuel-container">
      <div className="fuel-header">
        <h2><FaGasPump /> Fuel Logs</h2>
        <div className="header-actions">
          <button className="refresh-btn" onClick={fetchFuelLogs}>
            Refresh
          </button>
        </div>
      </div>

      <div className="fuel-table-container">
        <table className="fuel-table">
          <thead>
            <tr>
              <th><FaCar /> Vehicle</th>
              <th><FaUser /> Driver</th>
              <th><FaGasPump /> Fuel (L)</th>
              <th><FaRupeeSign /> Amount</th>
              <th><FaTachometerAlt /> Odometer</th>
              <th><FaComment /> Comment</th>
              <th><FaReceipt /> In Expense</th>
            </tr>
          </thead>
          <tbody>
            {fuelLogs.length > 0 ? (
              fuelLogs.map((log) => (
                <tr key={log._id} className="fuel-row">
                  <td data-label="Vehicle">
                    {log.vehicleId?.vehicleName || log.vehicleName || "N/A"}
                  </td>
                  <td data-label="Driver">
                    {log.driverId?.driverName || log.driverName || "N/A"}
                  </td>
                  <td data-label="Fuel (L)" className="quantity">
                    {log.quantity}
                  </td>
                  <td data-label="Amount" className="amount">
                    ₹{log.amount}
                  </td>
                  <td data-label="Odometer">
                    {log.odometer} km
                  </td>
                  <td data-label="Comment" className="comment">
                    {log.comment || "-"}
                  </td>
                  <td data-label="In Expense">
                    <span className={`status-badge ${log.includeInExpense ? 'included' : 'excluded'}`}>
                      {log.includeInExpense ? "Yes" : "No"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="no-data">
                <td colSpan="7">No fuel logs found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FuelList;