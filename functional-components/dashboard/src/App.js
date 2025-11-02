import React, { useState } from "react";
import SideBar from "./pages/SideBar";
import MainContent from "./pages/ContentPage";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <BrowserRouter>
      <div className="glass-container">
        <SideBar isOpen={isSidebarOpen} />
        <MainContent onToggleSidebar={toggleSidebar} />
      </div>
    </BrowserRouter>
  );
}
