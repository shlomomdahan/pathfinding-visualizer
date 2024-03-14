export const initialGrid = (rows = 20, cols = 50) => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  console.log("GRID");
  return grid;
};

export const createNode = (col, row) => ({
  col,
  row,
  isStart: row === 5 && col === 5,
  isFinish: row === 15 && col === 45,
  isVisited: false,
  isVisualized: false,
  isPath: false,
  isWall: false,
  distance: Infinity,
  previousNode: null,
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
