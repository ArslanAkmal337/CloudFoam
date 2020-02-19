import "./Dashboard.css";
import React from "react";
import Header from "./Header";

export const Dashboard = () => {
  return (
    <Header activeItem="dashboard">
      <h2 className="header">Dashboard page</h2>
    </Header>
  );
};

export default Dashboard;
