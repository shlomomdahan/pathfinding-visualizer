// export const initialGrid = (rows = 30, cols = 50) => {
//   const grid = [];
//   for (let row = 0; row < rows; row++) {
//     const currentRow = [];
//     for (let col = 0; col < cols; col++) {
//       currentRow.push(createNode(col, row));
//     }
//     grid.push(currentRow);
//   }
//   return grid;
// };

const NUM_ROWS = 30;
const NUM_COLS = 50;

export function initialGrid() {
  const grid = [];
  for (let row = 0; row < NUM_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < NUM_COLS; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
}

export const createNode = (col, row, isWeightedGraph) => ({
  col,
  row,
  isStart: row === 5 && col === 5,
  isFinish: row === 25 && col === 45,
  isVisited: false,
  isVisualized: false,
  isPath: false,
  isWall: false,
  distance: Infinity,
  previousNode: null,
  weight: 1,
});

export const toggleWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = { ...node, isWall: !node.isWall };
  newGrid[row][col] = newNode;
  return newGrid;
};

export const findStartNode = (grid) => {
  for (const row of grid) {
    for (const node of row) {
      if (node.isStart) return node;
    }
  }
};

export const findFinishNode = (grid) => {
  for (const row of grid) {
    for (const node of row) {
      if (node.isFinish) return node;
    }
  }
};

// Example utility function implementations
export const isStartNode = (grid, row, col) => {
  // Implementation based on your grid structure
  return grid[row][col].isStart;
};

export const isFinishNode = (grid, row, col) => {
  // Implementation based on your grid structure
  return grid[row][col].isFinish;
};

export const moveStartNode = (grid, newRow, newCol) => {
  // Deep clone the grid to avoid direct mutations
  const newGrid = grid.map((row) => row.map((node) => ({ ...node })));

  // Utilize your existing utility to find the current start node
  const oldStartNode = findStartNode(newGrid);
  if (oldStartNode) {
    oldStartNode.isStart = false; // Reset the old start node
  }

  // Directly access and set the new start node
  const newStartNode = newGrid[newRow][newCol];
  newStartNode.isStart = true;
  newStartNode.isWall = false; // Ensure the start node is not a wall

  return newGrid;
};

export const moveFinishNode = (grid, newRow, newCol) => {
  // Deep clone the grid to avoid direct mutations
  const newGrid = grid.map((row) => row.map((node) => ({ ...node })));

  // Utilize your existing utility to find the current finish node
  const oldFinishNode = findFinishNode(newGrid);
  if (oldFinishNode) {
    oldFinishNode.isFinish = false; // Reset the old finish node
  }

  // Directly access and set the new finish node
  const newFinishNode = newGrid[newRow][newCol];
  newFinishNode.isFinish = true;

  return newGrid;
};
