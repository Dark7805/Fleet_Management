import React, { useEffect, useState } from "react";
import { FaCar, FaUser, FaGasPump, FaCalendarAlt, FaChartLine } from "react-icons/fa";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard");

        const cards = [
          {
            title: "Total Vehicles",
            value: res.data.totalVehicles,
            icon: <FaCar className="card-icon" />,
            color: "#4361ee"
          },
          {
            title: "Total Drivers",
            value: res.data.totalDrivers,
            icon: <FaUser className="card-icon" />,
            color: "#3a0ca3"
          },
          {
            title: "Ongoing Bookings",
            value: res.data.ongoingBookings,
            icon: <FaCalendarAlt className="card-icon" />,
            color: "#f72585"
          },
          {
            title: "Fuel Used (L)",
            value: res.data.fuelUsed,
            icon: <FaGasPump className="card-icon" />,
            color: "#4cc9f0"
          }
        ];

        setSummaryData(cards);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1><FaChartLine /> Dashboard Overview</h1>
        <p>Key metrics overview</p>
      </div>

      <div className="summary-cards">
        {summaryData.map((item, idx) => (
          <div key={idx} className="summary-card" style={{ borderLeft: `4px solid ${item.color}` }}>
            <div className="card-content">
              <div className="card-icon-container" style={{ backgroundColor: `${item.color}20` }}>
                {item.icon}
              </div>
              <div className="card-text">
                <h3>{item.title}</h3>
                <p>{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
