import React, { useState } from "react";
import Users from "../components/Users";
import Posts from "../components/Posts";
import Gallery from "../components/Gallery";
import Tasks from "../components/Tasks";
import AddUser from "../assets/features/AddUser";
import Helper from "../assets/features/Helper";
import { Route, Routes, Navigate } from "react-router-dom";

const MainContent = (props) => {
    // const [isUser, setIsUser] = useState(true)
    return (
        <main className="glass-main">
            <header className="glass-header">
                <button onClick={props.onToggleSidebar} className="glass-toggleBtn">
                    <i className="fa fa-navicon"></i>
                </button>
                <h1 className="glass-headerTitle">داشبورد</h1>
            </header>

            <section className="glass-content">
                <Routes>
                    {/* <Route path="/" element={<Navigate replace to="/posts" />} /> */}
                    <Route path="/" element={<div>صفحه اصلی داشبورد</div>} />
                    <Route path="/Users" element={<Users />} />
                    <Route path="/Users/add" element={<AddUser />}>
                        <Route path=":userId" element={<Helper />} />
                    </Route>
                    <Route path="/Posts" element={<Posts />} />
                    <Route path="/Gallery" element={<Gallery />} />
                    <Route path="/Tasks" element={<Tasks />} />
                    {/* <Route path="*" element={<Users />} /> */}
                </Routes>
            </section>
        </main>
    );
};

export default MainContent;
