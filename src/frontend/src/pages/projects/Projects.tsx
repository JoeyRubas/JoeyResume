import React, { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import apiService from "../../api/service";
import { Project } from "../../types/project.ts";
import { useAuth } from "../../hooks/useAuth";
import ProjectCard from "../../components/ProjectCard/ProjectCard.tsx";
import "./styles.css";

type Placement = {
  projectIdx: number;
  row: number;
  col: number;
  rowSpan: number;
  colSpan: number;
};

function useWindowSize() {
  const [size, setSize] = useState<[number, number]>([
    window.innerWidth,
    window.innerHeight,
  ]);
  useEffect(() => {
    const onResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return size;
}

function getGridDimensions(width: number, projectCount: number) {
  let COLS = 8;
  if (width < 600) COLS = 3;
  else if (width < 1024) COLS = 5;

  const rowsPerCol = Math.ceil(projectCount / COLS) || 1;
  const ROWS = Math.max(5, rowsPerCol * 2);

  return { COLS, ROWS };
}

function buildPlacements(projects: Project[], COLS: number, ROWS: number) {
  const SHAPES: [number, number][] = [[2, 2], [2, 1], [3, 2], [1, 2], [2, 3]];
  const TOP_SHAPES: [number, number][] = [[2, 2], [1, 2], [2, 1]];

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

  const canExpand = (p: Placement, dir: "right" | "down") => {
    if (dir === "right") {
      const newCol = p.col + p.colSpan;
      if (newCol >= COLS) return false;
      return [...Array(p.rowSpan)].every((_, i) => !taken[p.row + i][newCol]);
    } else {
      const newRow = p.row + p.rowSpan;
      if (newRow >= ROWS) return false;
      return [...Array(p.colSpan)].every((_, i) => !taken[newRow][p.col + i]);
    }
  };

  const expand = (p: Placement, id: number, dir: "right" | "down") => {
    if (dir === "right") {
      const col = p.col + p.colSpan;
      for (let r = p.row; r < p.row + p.rowSpan; r++) {
        taken[r][col] = true;
        owner[r][col] = id;
      }
      p.colSpan++;
    } else {
      const row = p.row + p.rowSpan;
      for (let c = p.col; c < p.col + p.colSpan; c++) {
        taken[row][c] = true;
        owner[row][c] = id;
      }
      p.rowSpan++;
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
          for (let c = 0; c < w; c++)
            if (taken[row + r][col + c]) fits = false;
        if (!fits) continue;
        const p: Placement = { projectIdx, row, col, rowSpan: h, colSpan: w };
        occupy(p, placements.length);
        placements.push(p);
        return true;
      }
    }
    return false;
  };

  // reserve header row space
    const carveFrom = Math.max(COLS - 4, 0);
    for (let c = carveFrom; c < COLS; c++) taken[0][c] = true;


  let pi = 0;
  for (; pi < Math.min(3, projects.length); pi++) {
    const shape = TOP_SHAPES[pi % TOP_SHAPES.length];
    placeOne(pi, 0, shape);
  }

  let shapeIdx = 0;
  for (; pi < projects.length; pi++) {
    const bias = Math.floor((projects[pi].projectMaturity || 0) / 3);
    const shape = SHAPES[(shapeIdx + bias) % SHAPES.length];
    placeOne(pi, 1, shape);
    shapeIdx++;
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (taken[r][c]) continue;
      const leftId = c > 0 ? owner[r][c - 1] : null;
      const upId = r > 0 ? owner[r - 1][c] : null;
      if (leftId != null && canExpand(placements[leftId], "right"))
        expand(placements[leftId], leftId, "right");
      else if (upId != null && canExpand(placements[upId], "down"))
        expand(placements[upId], upId, "down");
    }
  }

  return placements;
}

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    projectMaturity: 1,
    githubUrl: "",
    liveUrl: "",
    showNumberCommits: false,
    skillsUsed: [],
  });

  const [width, height] = useWindowSize();

  useEffect(() => {
    apiService
      .getProjects()
      .then(setProjects)
      .catch((e) => console.error("Failed to load projects:", e));
  }, []);

  if (authLoading)
    return (
      <div className="projects-page">
        <div className="loading">Loading…</div>
      </div>
    );

  const { COLS, ROWS } = getGridDimensions(width, projects.length);
  const placements = buildPlacements(projects, COLS, ROWS);

  // row height scales with viewport height
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
    gridRow: "1 / span 1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: "0 2vw",
  }}
>
  <h1 className="headline projectHeadline">What I've Built</h1>
<p className="subhead projectSubhead">A showcase of my favorite projects.</p>
</div>




          {placements.map((p) => {
            const proj = projects[p.projectIdx];
            return (
              <ProjectCard
                key={proj.id}
                project={proj}
                isAuthenticated={isAuthenticated}
                handleProjectClick={() =>
                  navigate({
                    to: "/project/$projectId",
                    params: { projectId: proj.id },
                  })
                }
                handleEdit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                 
                  setEditingProjectId(proj.id);
                }}
                handleDelete={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
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
