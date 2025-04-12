import React, { useEffect, useState } from "react";
import './FuelList.css';

const FuelList = () => {
  const [fuelLogs, setFuelLogs] = useState([]);

  const fetchFuelLogs = async () => {
    const res = await fetch("http://localhost:5000/api/getFuels");
    const data = await res.json();
    setFuelLogs(data);
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
              <td>{log.vehicleId.vehicleName}</td>
              <td>{log.driverId.driverName}</td>
              <td>{log.quantity}</td>
              <td>{log.amount}</td>
              <td>{log.odometer}</td>
              <td>{log.comment}</td>
              <td>{log.includeInExpense ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FuelList;
