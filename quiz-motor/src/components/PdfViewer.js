import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { pdfjs } from 'react-pdf';
import '../styles/PdfViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer = ({ file, onNextDocument, onPrevDocument, currentDocIndex, totalDocs }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const handlePrevious = () => {
    if (pageNumber <= 1) {
      if (currentDocIndex > 0) {
        onPrevDocument();
      }
    } else {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber >= numPages) {
      if (currentDocIndex < totalDocs - 1) {
        onNextDocument();
      }
    } else {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className="pdf-viewer">
      <Document
        file={file}
        onLoadSuccess={onLoadSuccess}
        loading={<div className="loading">Carregando PDF...</div>}
      >
        <Page 
          pageNumber={pageNumber} 
          className="pdf-page"
          width={800}
        />
      </Document>

      <div className="page-controls">
        <button
          className="control-button"
          disabled={pageNumber <= 1 && currentDocIndex === 0}
          onClick={handlePrevious}
        >
          ‹ Anterior
        </button>
        <span className="page-info">
          Documento {currentDocIndex + 1}/{totalDocs} - Página {pageNumber}/{numPages}
        </span>
        <button
          className="control-button"
          disabled={pageNumber >= numPages && currentDocIndex === totalDocs - 1}
          onClick={handleNext}
        >
          Próxima ›
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;
