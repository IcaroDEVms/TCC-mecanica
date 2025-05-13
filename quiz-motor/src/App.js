import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TelaInicial from './pages/TelaInicial';
import QuizMotor from './pages/QuizMotor';
import './App.css';
import VerManual from './pages/VerManual';
import Footer from './components/Footer';
import ManualSeguranca from './pages/ManualSeguranca';
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Landing" element={<Landing />} />
          <Route path="/TelaInicial" element={<><TelaInicial /><Footer /></>} />
          <Route path="/QuizMotor" element={<><QuizMotor /><Footer /></>} />
          <Route path="/VerManual" element={<><VerManual /><Footer /></>} />
          <Route path="/ManualSeguranca" element={<><ManualSeguranca /><Footer /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;