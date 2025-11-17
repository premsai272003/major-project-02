// src/App.jsx
import React from "react";
import {
 BrowserRouter as Router,
 Routes,
 Route,
 Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/DashBoard/Home";
import Income from "./pages/DashBoard/Income";
import Expense from "./pages/DashBoard/Expense";
import Download from "./pages/DashBoard/Download";
import UserProvider from "./context/UserContext";
import ThemeProvider from "./context/ThemeContext";

const App = () => {
 return (
 <ThemeProvider>
 <UserProvider>
 <Router>
 <Routes>
 <Route path="/" element={<Root />} />
 <Route path="/login" element={<Login />} />
 <Route path="/signup" element={<SignUp />} />
 <Route path="/dashboard" element={<Home />} />

 {/* The Income and Expense Routes are already here! */}
 <Route path="/income" element={<Income />} />
 <Route path="/expense" element={<Expense />} />
 <Route path="/download" element={<Download />} />
 </Routes>
 </Router>
 </UserProvider>
 </ThemeProvider>
 );
};

export default App;

const Root = () => {
 const isAuthenticated = !!localStorage.getItem("token");

 return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};