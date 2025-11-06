import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
    const location = useLocation();

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>Book Discovery</h2>
                <p>Dashboard</p>
            </div>

            <nav className="sidebar-nav">
                <Link
                    to="/"
                    className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
                >
                    <span className="nav-icon">📊</span>
                    Dashboard
                </Link>
            </nav>

            <div className="sidebar-footer">
                <p>Programming Books</p>
                <p className="footer-note">Open Library API</p>
            </div>
        </aside>
    );
}

export default Sidebar;