import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="/images/logo.jpg" alt="Health & Wellness Logo" />
          <h1>Health & Wellness</h1>
        </Link>
      </div>
      <button className="nav-toggle" aria-label="Toggle navigation">
        <i className="fas fa-bars"></i>
      </button>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {user ? (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><button onClick={logout} className="btn-primary">Logout</button></li>
            </>
          ) : (
            <li><Link to="/login" className="btn-primary">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar; 
 