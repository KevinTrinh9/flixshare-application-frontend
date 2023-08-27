import React from 'react';
import MovieDashboard from './MovieDashboard';
import TVDashboard from './TVDashboard';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="container">
      <h2>My Dashboard</h2>

      <MovieDashboard />
      <TVDashboard />
    </div>
  );
};

export default Dashboard;
