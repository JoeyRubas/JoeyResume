import React, { memo, useCallback } from 'react';
import { Project } from '../../types/project';

export interface ProjectCardProps {
  project: Project;
  isAuthenticated: boolean;
  handleProjectClick: (id: string) => void;
  handleEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  mosaicSize?: number;
  style?: React.CSSProperties;
}

const ProjectCard: React.FC<ProjectCardProps> = memo(
  ({
    project,
    isAuthenticated,
    handleProjectClick,
    handleEdit,
    handleDelete,
    mosaicSize,
    style,
  }) => {
    const onCardClick = useCallback(
      () => handleProjectClick(project.id),
      [handleProjectClick, project.id]
    );
    const onKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') handleProjectClick(project.id);
      },
      [handleProjectClick, project.id]
    );

    return (
      <div
        className="project-card-v2 compact"
        onClick={onCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={onKeyDown}
        style={style}
      >
        <div className="project-card-header">
          <div className="project-header-content">
            <h3 className="project-name">{project.name}</h3>
            <div className="project-links">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" />
                  </svg>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Live Site"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="project-description">
          <span className="desc-text">{project.description}</span>
        </div>
        <div className="project-skills">
          {project.skillsUsed?.map(skill => (
            <span key={skill} className="skill-pill">
              {skill}
            </span>
          ))}
        </div>
        {isAuthenticated && (
          <div className="admin-actions">
            <button
              id={`edit${project.id}`}
              className="btn ghost"
              onClick={handleEdit}
              title="Edit"
            >
              <span role="img" aria-label="Edit">
                ✏️
              </span>
            </button>
            <button
              id={`delete${project.id}`}
              className="btn danger"
              onClick={handleDelete}
              title="Delete"
            >
              <span role="img" aria-label="Delete">
                🗑️
              </span>
            </button>
          </div>
        )}
      </div>
    );
  }
);

export default ProjectCard;
