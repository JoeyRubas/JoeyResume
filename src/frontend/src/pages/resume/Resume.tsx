import React from 'react';
import './styles.css';

const PUBLIC_PDF = '/resume/JoeyResume.pdf';
const DEV_SRC_PDF = new URL('/src/pages/resume/resume-dev.pdf', import.meta.url).href;

const Resume: React.FC = () => {
  const [pdfUrl, setPdfUrl] = React.useState<string>(PUBLIC_PDF);

  React.useEffect(() => {
    // In dev, verify the public URL is a PDF; otherwise fall back to src/
    if (import.meta.env.DEV) {
      fetch(PUBLIC_PDF, { method: 'HEAD' })
        .then((res) => {
          const ct = res.headers.get('content-type') || '';
          if (!res.ok || !ct.includes('pdf')) {
            setPdfUrl(DEV_SRC_PDF);
          } else {
            setPdfUrl(PUBLIC_PDF);
          }
        })
        .catch(() => setPdfUrl(DEV_SRC_PDF));
    } else {
      setPdfUrl(PUBLIC_PDF);
    }
  }, []);

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
            <p>
              Unable to display inline. <a href={pdfUrl} target="_blank" rel="noreferrer">Open</a>{' '}
              or <a href={pdfUrl} download>download</a>.
            </p>
          </object>
        </div>
      </div>
    </div>
  );
};

export default Resume;
