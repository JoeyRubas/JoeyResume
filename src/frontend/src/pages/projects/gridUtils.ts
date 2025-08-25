import { Project } from '../../types/project.ts';

export type Placement = {
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

export function getGridDimensions(width: number, count: number) {
  const COLS = width < 600 ? 3 : width < 1024 ? 5 : 8;
  const rowsPerCol = Math.ceil(count / COLS) || 1;
  return { COLS, ROWS: Math.max(5, rowsPerCol * 2) };
}

export function buildPlacements(
  projects: Project[],
  COLS: number,
  ROWS: number
): Placement[] {
  const taken = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  const owner = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  const placements: Placement[] = [];

  // Place high maturity projects in top shapes
  const topProjects = projects
    .map((p, i) => ({ ...p, originalIndex: i }))
    .filter(p => p.projectMaturity >= 7)
    .slice(0, 3);

  const remainingIndices = new Set(
    projects.map((_, i) => i).filter(i => !topProjects.some(p => p.originalIndex === i))
  );

  // Place top projects
  topProjects.forEach((proj, i) => {
    if (i >= TOP_SHAPES.length) return;
    const [rowSpan, colSpan] = TOP_SHAPES[i];
    let placed = false;

    for (let r = 0; r <= ROWS - rowSpan && !placed; r++) {
      for (let c = 0; c <= COLS - colSpan && !placed; c++) {
        if (canPlace(taken, r, c, rowSpan, colSpan)) {
          markTaken(taken, owner, r, c, rowSpan, colSpan, proj.originalIndex);
          placements[proj.originalIndex] = {
            projectIdx: proj.originalIndex,
            row: r,
            col: c,
            rowSpan,
            colSpan,
          };
          placed = true;
        }
      }
    }
  });

  // Place remaining projects
  Array.from(remainingIndices).forEach(projectIdx => {
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const [rowSpan, colSpan] = shape;
    let placed = false;

    for (let r = 0; r <= ROWS - rowSpan && !placed; r++) {
      for (let c = 0; c <= COLS - colSpan && !placed; c++) {
        if (canPlace(taken, r, c, rowSpan, colSpan)) {
          markTaken(taken, owner, r, c, rowSpan, colSpan, projectIdx);
          placements[projectIdx] = {
            projectIdx,
            row: r,
            col: c,
            rowSpan,
            colSpan,
          };
          placed = true;
        }
      }
    }

    if (!placed) {
      for (let r = 0; r < ROWS && !placed; r++) {
        for (let c = 0; c < COLS && !placed; c++) {
          if (!taken[r][c]) {
            markTaken(taken, owner, r, c, 1, 1, projectIdx);
            placements[projectIdx] = {
              projectIdx,
              row: r,
              col: c,
              rowSpan: 1,
              colSpan: 1,
            };
            placed = true;
          }
        }
      }
    }
  });

  // Grow placements
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

function canPlace(
  taken: boolean[][],
  r: number,
  c: number,
  rowSpan: number,
  colSpan: number
): boolean {
  for (let i = 0; i < rowSpan; i++) {
    for (let j = 0; j < colSpan; j++) {
      if (taken[r + i][c + j]) return false;
    }
  }
  return true;
}

function markTaken(
  taken: boolean[][],
  owner: (number | null)[][],
  r: number,
  c: number,
  rowSpan: number,
  colSpan: number,
  projectIdx: number
) {
  for (let i = 0; i < rowSpan; i++) {
    for (let j = 0; j < colSpan; j++) {
      taken[r + i][c + j] = true;
      owner[r + i][c + j] = projectIdx;
    }
  }
}