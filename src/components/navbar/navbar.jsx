// src/Navbar.js
import React, { useState } from 'react';
import './Navbar.css'; // Import the CSS file for styling
import { NavLink } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
    const [isMobile, setIsMobile] = useState(false);
    const toggleMenu = () => {
        setIsMobile(!isMobile);
    };

    return (
        <nav className="navbar">
            <div className="logo">MyApp</div>
            <ul className={`nav-links ${isMobile ? 'active' : ''}`}>
                <li>
                    <NavLink 
                        to="/home" 
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Home
                    </NavLink>
                </li>
                {isLoggedIn ? (
                    <>
                        <li>
                            <NavLink 
                                to="/inventory" 
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                Inventory
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/dashboard" 
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="logout-button">
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink 
                                to="/login" 
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/register" 
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                Sign Up
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
            <div className="menu-toggle" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;