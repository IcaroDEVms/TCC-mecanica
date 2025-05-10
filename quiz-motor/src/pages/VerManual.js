import React, { useState } from 'react';
import Navbar from '../components/Navbar.js';
import PdfViewer from '../components/PdfViewer';
import '../styles/VerManual.css';

const VerManual = () => {
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
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
    <div>
      <Navbar />
      <div className="pdf-viewer-container">
        <h1>Manual do Motor</h1>
        <div className="pdf-content">
          <PdfViewer 
            file={pdfFiles[currentDocIndex]}
            onNextDocument={handleNextDoc}
            onPrevDocument={handlePrevDoc}
            currentDocIndex={currentDocIndex}
            totalDocs={pdfFiles.length}
          />
        </div>
      </div>
    </div>
  );
};

export default VerManual;
