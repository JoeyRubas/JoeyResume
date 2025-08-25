import React, { useEffect, useState, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import { useNavigate } from '@tanstack/react-router';
import apiService from '../../api/service';
import { Project } from '../../types/project.ts';
import { useAuth } from '../../hooks/useAuth';
import ProjectCard from '../../components/ProjectCard/ProjectCard.tsx';
import { useWindowSize } from './useWindowSize';
import { getGridDimensions, buildPlacements, type Placement } from './gridUtils';
import './styles.css';

const masonryBreakpoints = { default: 3, 900: 3, 600: 2 };

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [width, height] = useWindowSize();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await apiService.getProjects();
        setProjects(projects);
      } catch (e: unknown) {
        console.error('Failed to load projects:', e);
      }
    };
    loadProjects();
  }, []);

  const handleProjectClick = useCallback(
    (id: string) =>
      navigate({ to: '/project/$projectId', params: { projectId: id } }),
    [navigate]
  );

  const handleEdit = useCallback(
    (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setEditingProjectId(id);
    },
    []
  );

  const handleDelete = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const id = e.currentTarget.dataset.projectId;
      if (!id) return;
      try {
        // Note: delete functionality would need to be implemented in API
        console.log('Delete project:', id);
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    },
    []
  );

  // Use masonry layout for smaller screens
  if (width < 900) {
    return (
      <div className="projects-page">
        <section className="content">
          <h1>What I've Built</h1>
          <p>A showcase of my favorite projects</p>
        </section>
        <section id="projects-list" className="project-group-section">
          <Masonry
            breakpointCols={masonryBreakpoints}
            className="masonry-grid"
            columnClassName="masonry-grid-column"
          >
            {projects.map(proj => (
              <ProjectCard
                key={proj.id}
                project={proj}
                isAuthenticated={isAuthenticated}
                handleProjectClick={() => handleProjectClick(proj.id)}
                handleEdit={e => handleEdit(proj.id, e)}
                handleDelete={handleDelete}
              />
            ))}
          </Masonry>
        </section>
      </div>
    );
  }

  // Use custom grid layout for larger screens
  const { COLS, ROWS } = getGridDimensions(width, projects.length);
  const placements = buildPlacements(projects, COLS, ROWS);
  const rowHeight = Math.max(180, Math.floor(height / 4));

  return (
    <div className="projects-page">
      <section id="projects-list" className="project-group-section">
        <div
          className="projects-grid l-mosaic"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridAutoRows: `${rowHeight}px`,
          }}
        >
          <div
            style={{
              gridColumn: `${Math.max(COLS - 4, 1)} / -1`,
              gridRow: '1 / span 1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              padding: '0 2vw',
            }}
          >
            <h1 className="project-headline">What I've Built</h1>
            <p className="project-subhead">
              A showcase of my favorite projects
            </p>
          </div>
          {placements.map(p => {
            const proj = projects[p.projectIdx];
            return (
              <ProjectCard
                key={proj.id}
                project={proj}
                isAuthenticated={isAuthenticated}
                handleProjectClick={() => handleProjectClick(proj.id)}
                handleEdit={e => handleEdit(proj.id, e)}
                handleDelete={handleDelete}
                mosaicSize={Math.max(p.colSpan, p.rowSpan)}
                style={{
                  gridColumn: `${p.col + 1} / span ${p.colSpan}`,
                  gridRow: `${p.row + 1} / span ${p.rowSpan}`,
                }}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Projects;