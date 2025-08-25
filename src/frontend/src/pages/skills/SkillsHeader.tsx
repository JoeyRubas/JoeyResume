import React from 'react';
import ScrollIndicator from '../../components/Scroll/ScrollIndicator';

interface SkillsHeaderProps {
  isAuthenticated: boolean;
  authLoading: boolean;
  handleLogout: () => Promise<void>;
}

const SkillsHeader: React.FC<SkillsHeaderProps> = ({
  isAuthenticated,
  authLoading,
  handleLogout
}) => {
  return (
    <>
      <ScrollIndicator targetId="skills-core" />
      <section className="content">
        <h1>Skills & Experiences</h1>
        <p>
          Here's a breakdown of my technical skills organized by proficiency. Click on any skill for detailed experience and projects.
        </p>
      </section>

      {!authLoading && isAuthenticated && (
        <section className="editor-controls">
          <button type="button" className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </section>
      )}
    </>
  );
};

export default SkillsHeader;