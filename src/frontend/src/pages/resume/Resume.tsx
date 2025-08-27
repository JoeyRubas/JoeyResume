import React from 'react';
import './styles.css';

const Resume: React.FC = () => {
  const isProd = import.meta.env.PROD;
  const pdfFileName = isProd ? 'JoeyResume.pdf' : 'resume-dev.pdf';

  const pdfUrl = isProd 
    ? `/${pdfFileName}` 
    : new URL(`/src/pages/resume/${pdfFileName}`, import.meta.url).href;
  
  return (
    <div className="resume-page">
      <div className="resume-container">
        <div className="resume-pdf-container">
          <object
            data={pdfUrl}
            type="application/pdf"
            className="resume-pdf"
            title="Resume PDF"
          >
            <iframe
              src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
              className="resume-pdf"
              title="Resume PDF"
              frameBorder="0"
              loading="lazy"
            />
          </object>
        </div>
      </div>
    </div>
  );
};

export default Resume;
