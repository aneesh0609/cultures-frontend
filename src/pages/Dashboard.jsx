// src/components/Dashboard.jsx
import React, { useState } from "react";
import { User, Home, LogOut } from "lucide-react";
import Profile from "../components/Profile"; // import the Profile component

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home"); // home or profile

  return (
    <div className="flex h-screen overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
        <div className="text-2xl font-bold p-6 border-b border-gray-700">MyApp</div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex items-center gap-3 p-3 rounded hover:bg-gray-800 transition ${
              activeTab === "home" ? "bg-gray-800 font-semibold" : ""
            }`}
          >
            <Home size={20} /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-3 p-3 rounded hover:bg-gray-800 transition ${
              activeTab === "profile" ? "bg-gray-800 font-semibold" : ""
            }`}
          >
            <User size={20} /> Profile
          </button>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center gap-2 p-2 w-full hover:bg-gray-800 rounded transition">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Topbar */}
        <div className="h-16 bg-white shadow flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <img
              src="/avatar.png"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
          </div>
        </div>

        {/* Content */}
        <main className="p-6 bg-gray-100 flex-1 overflow-auto">
          {activeTab === "home" && (
            <div className="text-2xl font-semibold">Welcome to the Dashboard!</div>
          )}

          {activeTab === "profile" && (
            <Profile /> // render Profile component here
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
