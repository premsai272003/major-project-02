import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/DashBoard/Home';
import Income from './pages/DashBoard/Income';
import Expence from './pages/DashBoard/Expence';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path='/login'  element={<Login />} />
          <Route path='/signUp'  element={<SignUp />} />
          <Route path='/dashBoard'  element={<Home />} />
          <Route path='/income'  element={<Income />} />
          <Route path='/expence'  element={<Expence />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

const Root = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ?(
    <Navigate to="/dashBoard" />
  ) : (
    <Navigate to="/login" />
  );
};