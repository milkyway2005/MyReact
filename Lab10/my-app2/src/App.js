import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/" element={<RegistrationForm />} /> {}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
