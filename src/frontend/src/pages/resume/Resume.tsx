import React from 'react';
import './styles.css';

const Resume: React.FC = () => {
  const pdfUrl = '/resume/JoeyResume.pdf';

  return (
    <div className="resume-page">
      <div className="resume-container">
        <div className="resume-actions">
          <a className="resume-button" href={pdfUrl} target="_blank" rel="noreferrer">
            Open in new tab
          </a>
          <a className="resume-button" href={pdfUrl} download>
            Download PDF
          </a>
        </div>

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
            <p>
              Your browser can’t display PDFs inline.{' '}
              <a href={pdfUrl} target="_blank" rel="noreferrer">Open the resume</a>{' '}
              or <a href={pdfUrl} download>download it</a>.
            </p>
          </object>
        </div>
      </div>
    </div>
  );
};

export default Resume;
