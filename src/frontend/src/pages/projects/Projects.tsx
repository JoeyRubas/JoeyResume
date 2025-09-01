import React, { useEffect, useState, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import { useNavigate } from '@tanstack/react-router';
import apiService from '../../api/service';
import { Project } from '../../types/project.ts';
import ProjectCard from '../../components/ProjectCard/ProjectCard.tsx';
import './styles.css';

type Placement = {
  projectIdx: number;
  row: number;
  col: number;
  rowSpan: number;
  colSpan: number;
};

const SHAPES: [number, number][] = [
  [2, 2],
  [2, 1],
  [3, 2],
  [1, 2],
  [2, 3],
];
const TOP_SHAPES: [number, number][] = [
  [2, 2],
  [1, 2],
  [2, 1],
];
const masonryBreakpoints = { default: 3, 900: 3, 600: 2 };

function useWindowSize() {
  const [size, setSize] = useState<[number, number]>([
    window.innerWidth,
    window.innerHeight,
  ]);
  useEffect(() => {
    const onResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
}

function getGridDimensions(width: number, count: number) {
  const COLS = width < 600 ? 3 : width < 1024 ? 5 : 8;
  const rowsPerCol = Math.ceil(count / COLS) || 1;
  return { COLS, ROWS: Math.max(5, rowsPerCol * 2) };
}

function buildPlacements(projects: Project[], COLS: number, ROWS: number) {
  const taken = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  const owner = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  const placements: Placement[] = [];

  const occupy = (p: Placement, id: number) => {
    for (let r = 0; r < p.rowSpan; r++)
      for (let c = 0; c < p.colSpan; c++) {
        taken[p.row + r][p.col + c] = true;
        owner[p.row + r][p.col + c] = id;
      }
  };

  const placeOne = (
    projectIdx: number,
    prefRow: number,
    [w, h]: [number, number]
  ) => {
    for (let row = prefRow; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (row + h > ROWS || col + w > COLS) continue;
        let fits = true;
        for (let r = 0; r < h && fits; r++)
          for (let c = 0; c < w; c++) if (taken[row + r][col + c]) fits = false;
        if (!fits) continue;
        const p: Placement = { projectIdx, row, col, rowSpan: h, colSpan: w };
        occupy(p, placements.length);
        placements.push(p);
        return true;
      }
    }
    return false;
  };

  // reserve header area
  for (let c = Math.max(COLS - 4, 0); c < COLS; c++) taken[0][c] = true;

  let pi = 0;
  for (; pi < Math.min(3, projects.length); pi++) {
    placeOne(pi, 0, TOP_SHAPES[pi % TOP_SHAPES.length]);
  }

  let shapeIdx = 0;
  for (; pi < projects.length; pi++) {
    const bias = Math.floor((projects[pi].projectMaturity || 0) / 3);
    placeOne(pi, 1, SHAPES[(shapeIdx++ + bias) % SHAPES.length]);
  }

  // expand into gaps (measured)
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (taken[r][c]) continue;

      const leftId = c > 0 ? owner[r][c - 1] : null;
      const upId = r > 0 ? owner[r - 1][c] : null;

      if (leftId != null) {
        const p = placements[leftId];
        const newCol = p.col + p.colSpan;
        if (
          newCol < COLS &&
          [...Array(p.rowSpan)].every((_, i) => !taken[p.row + i][newCol])
        ) {
          for (let i = 0; i < p.rowSpan; i++) {
            taken[p.row + i][newCol] = true;
            owner[p.row + i][newCol] = leftId;
          }
          p.colSpan++;
        }
        owner[r][c] = leftId;
      } else if (upId != null) {
        const p = placements[upId];
        const newRow = p.row + p.rowSpan;
        if (
          newRow < ROWS &&
          [...Array(p.colSpan)].every((_, i) => !taken[newRow][p.col + i])
        ) {
          for (let i = 0; i < p.colSpan; i++) {
            taken[newRow][p.col + i] = true;
            owner[newRow][p.col + i] = upId;
          }
          p.rowSpan++;
        }
        owner[r][c] = upId;
      }
    }
  }

  return placements;
}

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [width, height] = useWindowSize();

  useEffect(() => {
    apiService
      .getProjects()
      .then(setProjects)
      .catch(e => console.error('Failed to load projects:', e));
  }, []);

  const handleProjectClick = useCallback(
    (id: string) =>
      navigate({ to: '/project/$projectId', params: { projectId: id } }),
    [navigate]
  );

  if (width < 600) {
    return (
      <div className="projects-page">
        <section id="projects-list" className="project-group-section">
          <div style={{ padding: '0 2vw', marginBottom: '1rem' }}>
            <h1 className="project-headline">What I've Built</h1>
            <p className="project-subhead">
              A showcase of my favorite projects.
            </p>
          </div>
          <Masonry
            breakpointCols={masonryBreakpoints}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {projects.map((proj, idx) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                isAuthenticated={false}
                handleProjectClick={() => handleProjectClick(proj.id)}
                handleEdit={() => {}}
                handleDelete={() => {}}
              />
            ))}
          </Masonry>
        </section>
      </div>
    );
  }

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
                isAuthenticated={false}
                handleProjectClick={() => handleProjectClick(proj.id)}
                handleEdit={() => {}}
                handleDelete={() => {}}
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
