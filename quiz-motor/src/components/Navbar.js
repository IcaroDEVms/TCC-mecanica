import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    // Adicione aqui sua lógica de logout
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo">
          Manual Rep&Aprova
        </Link>
        
        <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li><Link to="/TelaInicial">Home</Link></li>
          <li><Link to="/manuais">Manuais</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
          <li><button className="logout-button" onClick={handleLogout}>Sair</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;