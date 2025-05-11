import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import PdfViewer from '../components/PdfViewer';
import '../styles/VerManual.css';

const VerManual = () => {
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleDarkModeChange = () => {
      setIsDarkMode(localStorage.getItem('darkMode') === 'true');
    };

    window.addEventListener('storage', handleDarkModeChange);
    window.addEventListener('darkModeChange', handleDarkModeChange);

    // Initial check
    handleDarkModeChange();

    return () => {
      window.removeEventListener('storage', handleDarkModeChange);
      window.removeEventListener('darkModeChange', handleDarkModeChange);
    };
  }, []);

  const pdfFiles = [
    '/pdfs/M-01.pdf',
    '/pdfs/M-02.pdf',
    '/pdfs/M-03.pdf',
    '/pdfs/M-04.pdf',
    '/pdfs/M-05.pdf',
    '/pdfs/M-06.pdf',
    '/pdfs/M-07.pdf',
  ];

  const handleNextDoc = () => {
    if (currentDocIndex < pdfFiles.length - 1) {
      setCurrentDocIndex(currentDocIndex + 1);
    }
  };

  const handlePrevDoc = () => {
    if (currentDocIndex > 0) {
      setCurrentDocIndex(currentDocIndex - 1);
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Navbar />
      <div className="pdf-viewer-container">
        <h1>{isMobile ? 'Manual' : 'Manual do Motor'}</h1>
        <div className="pdf-content">
          <PdfViewer 
            file={pdfFiles[currentDocIndex]}
            onNextDocument={handleNextDoc}
            onPrevDocument={handlePrevDoc}
            currentDocIndex={currentDocIndex}
            totalDocs={pdfFiles.length}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default VerManual;
