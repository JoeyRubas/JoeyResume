import React from 'react';
import './styles.css';

interface ScrollIndicatorProps {
  targetId: string;
  bottom?: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  targetId,
  bottom = '20px',
}) => {
  // Only show on desktop screens
  return (
    <a href={`#${targetId}`} className="scroll-indicator-container">
      <div className="scroll-down" style={{ bottom: bottom }} />
    </a>
  );
};

export default ScrollIndicator;
