// src/components/Dashboard.jsx
import React, { useState } from "react";
import { User, Home } from "lucide-react";
import Profile from "../components/Profile";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      {/* ✅ Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* ✅ Main Section (starts below navbar) */}
      <main className="pt-[4.5rem] px-4 sm:px-6 lg:px-10 flex-1 flex flex-col items-center overflow-y-auto">
        {/* Toggle Button Group */}
        <div className="flex gap-4 bg-white shadow-md rounded-full px-4 py-2 sticky top-[4.5rem] z-30">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm sm:text-base ${
              activeTab === "home"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Home size={18} /> <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm sm:text-base ${
              activeTab === "profile"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <User size={18} /> <span>Profile</span>
          </button>
        </div>

        {/* ✅ Dashboard Content (proper spacing added below toggle bar) */}
        <div className="w-full max-w-5xl flex-1 mt-14 sm:mt-10 md:mt-8">
          {activeTab === "home" && (
            <section className="bg-white p-6 rounded-2xl shadow-md transition-all">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                Welcome to Your Dashboard 🎉
              </h1>
              <p className="text-gray-600 leading-relaxed">
                Your dashboard provides a quick overview of key data and updates.
                It’s responsive, minimal, and perfectly aligned below the toggle
                buttons with consistent spacing for all screen sizes.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <div className="bg-blue-50 p-5 rounded-xl shadow-sm hover:shadow-md transition">
                  <h2 className="text-lg font-semibold text-blue-700 mb-2">
                    Total Projects
                  </h2>
                  <p className="text-3xl font-bold text-blue-900">12</p>
                </div>
                <div className="bg-green-50 p-5 rounded-xl shadow-sm hover:shadow-md transition">
                  <h2 className="text-lg font-semibold text-green-700 mb-2">
                    Active Users
                  </h2>
                  <p className="text-3xl font-bold text-green-900">458</p>
                </div>
                <div className="bg-yellow-50 p-5 rounded-xl shadow-sm hover:shadow-md transition">
                  <h2 className="text-lg font-semibold text-yellow-700 mb-2">
                    Notifications
                  </h2>
                  <p className="text-3xl font-bold text-yellow-900">8</p>
                </div>
              </div>
            </section>
          )}

          {activeTab === "profile" && (
            <section className="bg-white p-6 rounded-2xl shadow-md transition-all">
              <Profile />
            </section>
          )}
        </div>
      </main>

      {/* ✅ Floating Action Button (Mobile) */}
      <button
        onClick={() =>
          setActiveTab((prev) => (prev === "home" ? "profile" : "home"))
        }
        className="md:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        aria-label="Toggle Section"
      >
        {activeTab === "home" ? <User size={22} /> : <Home size={22} />}
      </button>
    </div>
  );
};

export default Dashboard;
