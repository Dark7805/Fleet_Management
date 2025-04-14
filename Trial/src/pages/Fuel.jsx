import React, { useEffect, useState } from "react";
import './FuelList.css';

const FuelList = () => {
  const [fuelLogs, setFuelLogs] = useState([]);

  const fetchFuelLogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/getFuels");
      const data = await res.json();
      setFuelLogs(data);
    } catch (error) {
      console.error("Error fetching fuel logs:", error);
    }
  };

  useEffect(() => {
    fetchFuelLogs();
  }, []);

  return (
    <div className="fuel-list">
      <h2>Fuel Logs</h2>
      <table>
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Driver</th>
            <th>Fuel Quantity (L)</th>
            <th>Amount (₹)</th>
            <th>Odometer</th>
            <th>Comment</th>
            <th>In Expense</th>
          </tr>
        </thead>
        <tbody>
          {fuelLogs.map((log) => (
            <tr key={log._id}>
              <td data-label="Vehicle">
                {log.vehicleId?.vehicleName || log.vehicleName || "N/A"}
              </td>
              <td data-label="Driver">
                {log.driverId?.driverName || log.driverName || "N/A"}
              </td>
              <td data-label="Fuel Quantity (L)">{log.quantity}</td>
              <td data-label="Amount (₹)">{log.amount}</td>
              <td data-label="Odometer">{log.odometer}</td>
              <td data-label="Comment">{log.comment}</td>
              <td data-label="In Expense">{log.includeInExpense ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FuelList;
