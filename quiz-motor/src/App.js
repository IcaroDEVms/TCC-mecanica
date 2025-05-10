import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TelaInicial from './pages/TelaInicial';
import QuizMotor from './pages/QuizMotor';
import './App.css';
import VerManual from './pages/VerManual';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/TelaInicial" element={<TelaInicial />} />
        <Route path="/QuizMotor" element={<QuizMotor />} />
        <Route path="/VerManual" element={<VerManual />} />
      </Routes>
    </Router>
  );
}

export default App;
