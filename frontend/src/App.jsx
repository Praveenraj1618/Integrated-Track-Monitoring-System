// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import all page components
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Detections from './pages/Detections';
import DetectionDetail from './pages/DetectionDetail';
import ReportIssue from './pages/ReportIssue';
import Admin from './pages/Admin';
import Settings from './pages/Settings';
import MyTasks from './pages/MyTasks'; // FIX #1: Added the missing import for MyTasks

function App() {
  return (
    <Routes>
      {/* === Public Routes === */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/report" element={<ReportIssue />} />

      {/* === Internal App (Protected Routes) === */}
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="detections" element={<Detections />} />
        <Route path="detections/:id" element={<DetectionDetail />} />
        <Route path="mytasks" element={<MyTasks />} />
        <Route path="report" element={<ReportIssue />} />
        <Route path="admin" element={<Admin />} /> {/* FIX #2: Removed the duplicate Admin route */}
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;