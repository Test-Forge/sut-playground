import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../styles/Layout.css";

const Layout = () => {
    return (
        <div className="container">
            <nav className="menu">
                <div className="nav-links">
                    <Link to="/home" className="nav-link">Home</Link>
                    <Link to="/webelements" className="nav-link">Elements (beginner)</Link>
                    <Link to="/advanced" className="nav-link">Elements (advanced)</Link>
                    <Link to="/form" className="nav-link">Interactive Form (e2e)</Link>
                </div>
            </nav>
            <main className="main">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
