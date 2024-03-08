export const initialGrid = (rows = 20, cols = 50) => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

export const createNode = (col, row) => ({
  col,
  row,
  isStart: row === 5 && col === 5,
  isFinish: row === 15 && col === 45,
  isVisited: false,
  isWall: false,
});

export const toggleWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = { ...node, isWall: !node.isWall };
  newGrid[row][col] = newNode;
  return newGrid;
};
