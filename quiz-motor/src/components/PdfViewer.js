import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { pdfjs } from 'react-pdf';
import '../styles/PdfViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer = ({ file, onNextDocument, onPrevDocument, currentDocIndex, totalDocs, isDarkMode }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [isNavigating, setIsNavigating] = useState(false);
  
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setScale(0.8);
      } else if (width <= 768) {
        setScale(0.9);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const handlePrevious = () => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    
    if (pageNumber <= 1) {
      if (currentDocIndex > 0) {
        onPrevDocument();
      }
    } else {
      setPageNumber(pageNumber - 1);
    }

    setTimeout(() => {
      setIsNavigating(false);
    }, 500); // 500ms delay between navigation actions
  };

  const handleNext = () => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    
    if (pageNumber >= numPages) {
      if (currentDocIndex < totalDocs - 1) {
        onNextDocument();
      }
    } else {
      setPageNumber(pageNumber + 1);
    }

    setTimeout(() => {
      setIsNavigating(false);
    }, 500); // 500ms delay between navigation actions
  };

  return (
    <div className={`pdf-viewer ${isDarkMode ? 'dark' : ''}`}>
      <Document
        file={file}
        onLoadSuccess={onLoadSuccess}
        loading={<div className="loading">Carregando PDF...</div>}
      >
        <Page 
          pageNumber={pageNumber} 
          className="pdf-page"
          width={Math.min(800, window.innerWidth - 32)}
          scale={scale}
        />
      </Document>

      <div className="page-controls">
        <button
          className={`control-button ${isNavigating ? 'navigating' : ''}`}
          disabled={isNavigating || (pageNumber <= 1 && currentDocIndex === 0)}
          onClick={handlePrevious}
        >
          ‹ Anterior
        </button>
        <span className="page-info">
          Documento {currentDocIndex + 1}/{totalDocs} - Página {pageNumber}/{numPages}
        </span>
        <button
          className={`control-button ${isNavigating ? 'navigating' : ''}`}
          disabled={isNavigating || (pageNumber >= numPages && currentDocIndex === totalDocs - 1)}
          onClick={handleNext}
        >
          Próxima ›
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;
