import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TelaInicial from './pages/TelaInicial';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/TelaInicial" element={<TelaInicial />} />
      </Routes>
    </Router>
  );
}

export default App;
