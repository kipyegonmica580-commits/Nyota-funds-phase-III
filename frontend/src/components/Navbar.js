import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">Nyota Funds</div>
        <ul className="navbar-menu">
          {token && (
            <>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/fund-request">Request Funds</a></li>
              <li><a href="/transactions">Transactions</a></li>
              <li><a href="/admin">Admin</a></li>
            </>
          )}
          <li><a href="/weather">🌤️ Weather</a></li>
        </ul>
        <div className="navbar-user">
          {token && (
            <>
              <span>{user.firstName} {user.lastName}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
