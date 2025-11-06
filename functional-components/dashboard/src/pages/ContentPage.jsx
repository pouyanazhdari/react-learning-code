import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import Users from "../components/Users";
import Posts from "../components/Posts";
import Gallery from "../components/Gallery";
import Tasks from "../components/Tasks";
import AddUser from "../assets/features/AddUser";
import AddPost from "../assets/features/AddPost";

const MainContent = (props) => {
    const location = useLocation();

    // تابع هوشمند برای تعیین عنوان
    const getTitle = (path) => {
        if (path.startsWith("/Posts/add") || path === "/Posts") return "پست‌ها";
        if (path.startsWith("/Users/add") || path === "/Users") return "کاربران";
        if (path.startsWith("/Gallery")) return "گالری";
        if (path.startsWith("/Tasks")) return "تسک‌ها";
        return "داشبورد";
    };

    const currentTitle = getTitle(location.pathname);

    return (
        <main className="glass-main">
            {/* هدر داشبورد */}
            <header className="glass-header">
                <button onClick={props.onToggleSidebar} className="glass-toggleBtn">
                    <i className="fa fa-navicon"></i>
                </button>
                <h1 className="glass-headerTitle">{currentTitle}</h1>
            </header>

            {/* محتوای اصلی */}
            <section className="glass-content">
                <Routes>
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

                    {/* مسیر نامعتبر */}
                    <Route path="*" element={<Navigate replace to="/Users" />} />
                </Routes>
            </section>
        </main>
    );
};

export default MainContent;