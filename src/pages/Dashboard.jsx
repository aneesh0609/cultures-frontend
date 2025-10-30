// src/components/Dashboard.jsx
import React, { useState } from "react";
import { User, Home } from "lucide-react";
import Profile from "../components/Profile";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <>
    <div className=" bg-gray-900">
      <Navbar />
      <div className=" py-14 px-6">
           <Profile />
      </div>
    </div>
    
   
    </>
  )
}

export default Dashboard;
