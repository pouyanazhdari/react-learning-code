import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// 📦 import کامپوننت‌ها
import Users from "../components/Users";
import Posts from "../components/Posts";
import Gallery from "../components/Gallery";
import Tasks from "../components/Tasks";
import AddUser from "../assets/features/AddUser";
import AddPost from "../assets/features/AddPost";
import Helper from "../assets/features/Helper";

const MainContent = (props) => {
    return (
        <main className="glass-main">
            {/* 🔹 هدر داشبورد */}
            <header className="glass-header">
                <button onClick={props.onToggleSidebar} className="glass-toggleBtn">
                    <i className="fa fa-navicon"></i>
                </button>
                <h1 className="glass-headerTitle">داشبورد</h1>
            </header>

            {/* 🔹 محتوای اصلی */}
            <section className="glass-content">
                <Routes>
                    {/* مسیر پیش‌فرض → انتقال به پست‌ها */}
                    <Route path="/" element={<Navigate replace to="/Posts" />} />

                    {/* کاربران */}
                    <Route path="Users" element={<Users />} />
                    <Route path="Users/add/:userId?" element={<AddUser />} />

                    {/* پست‌ها */}
                    <Route path="Posts" element={<Posts />} />
                    <Route path="Posts/add/:postId?" element={<AddPost />} />

                    {/* گالری و تسک‌ها */}
                    <Route path="Gallery" element={<Gallery />} />
                    <Route path="Tasks" element={<Tasks />} />

                    {/* مسیرهای نامعتبر → هدایت به کاربران */}
                    <Route path="*" element={<Navigate replace to="/Users" />} />
                </Routes>
            </section>
        </main>
    );
};

export default MainContent;
