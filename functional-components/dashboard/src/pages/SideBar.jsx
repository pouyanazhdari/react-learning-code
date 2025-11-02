import React from "react";
import { Link, NavLink } from "react-router-dom";

const SideBar = (props) => {
    return (
        <aside className={`glass-sidebar ${props.isOpen ? "" : "close"}`}>
            <div className="glass-logoWrapper">
                <h2 className="glass-logoText">DASHBOARD</h2>
            </div>

            <div className="glass-userInfo">
                <img src="/images/userAvatar.jpg" alt="User" className="glass-userAvatar" />
                <div className="glass-userDetails">
                    <p className="glass-userName">شادی اژدری</p>
                    <p className="glass-userRole">مدیر سیستم</p>
                    <p className="glass-userEmail">pouyan@example.com</p>
                </div>
            </div>

            <nav className="glass-nav">
                <NavLink
                    to="/"
                    className={({ isActive }) => `glass-navItem ${isActive ? "active" : ""}`}
                >
                    <span>داشبورد</span>
                </NavLink>

                <NavLink
                    to="/Users"
                    className={({ isActive }) => `glass-navItem ${isActive ? "active" : ""}`}
                >
                    <span>کاربران</span>
                </NavLink>

                <NavLink
                    to="/Posts"
                    className={({ isActive }) => `glass-navItem ${isActive ? "active" : ""}`}
                >
                    <span>پست‌ها</span>
                </NavLink>

                <NavLink
                    to="/Gallery"
                    className={({ isActive }) => `glass-navItem ${isActive ? "active" : ""}`}
                >
                    <span>گالری</span>
                </NavLink>

                <NavLink
                    to="/Tasks"
                    className={({ isActive }) => `glass-navItem ${isActive ? "active" : ""}`}
                >
                    <span>تسک‌ها</span>
                </NavLink>
            </nav>

        </aside>
    );
};

export default SideBar;
