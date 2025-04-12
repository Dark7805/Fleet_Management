import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const summaryData = [
    { title: "Total Vehicles", value: 24 },
    { title: "Total Drivers", value: 18 },
    { title: "Ongoing Bookings", value: 7 },
    { title: "Pending Maintenance", value: 3 },
    { title: "Fuel Used This Week", value: "420 L" },
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="summary-cards">
        {summaryData.map((item, index) => (
          <div key={index} className="card">
            <h3>{item.title}</h3>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
