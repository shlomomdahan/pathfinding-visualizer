import { useCallback } from "react";

export const useMazeGenerator = (grid, setGrid) => {
  const randomizeBoard = useCallback(() => {
    setGrid((grid) =>
      grid.map((row) =>
        row.map((node) => {
          if (node.isStart || node.isFinish) {
            return node;
          }
          const isWall = Math.random() < 0.3;
          return { ...node, isWall };
        })
      )
    );
  }, [setGrid]);

  const generateWeightedMaze = useCallback(() => {
    setGrid((prevGrid) => {
      return prevGrid.map((row) =>
        row.map((node) => {
          // Avoid altering the start, finish, or wall nodes
          if (node.isStart || node.isFinish || node.isWall) return node;

          // Randomly decide to assign a high weight to some nodes
          const assignHighWeight = Math.random() < 0.2; // 20% chance for simplicity
          if (assignHighWeight) {
            return { ...node, weight: Math.floor(Math.random() * 20) + 20 }; // Weights between 10 and 29
          }
          return node;
        })
      );
    });
  }, [setGrid]);

  const generateRecursiveDivisionMaze = useCallback(() => {
    setGrid((prevGrid) => {
      // Initialize the grid, preserving the start and finish nodes
      const gridCopy = prevGrid.map((row, rowIndex) =>
        row.map((node, colIndex) => ({
          ...node,
          isWall:
            (rowIndex === 0 ||
              rowIndex === prevGrid.length - 1 ||
              colIndex === 0 ||
              colIndex === row.length - 1) &&
            !node.isStart &&
            !node.isFinish,
        }))
      );

      divideGrid(
        gridCopy,
        1,
        gridCopy.length - 2,
        1,
        gridCopy[0].length - 2,
        chooseOrientation(gridCopy.length - 2, gridCopy[0].length - 2)
      );
      return gridCopy;
    });
  }, [setGrid]);

  const chooseOrientation = (height, width) => {
    if (width < height) {
      return "HORIZONTAL";
    } else if (height < width) {
      return "VERTICAL";
    } else {
      return Math.random() >= 0.5 ? "HORIZONTAL" : "VERTICAL";
    }
  };

  const divideGrid = useCallback(
    (grid, rowStart, rowEnd, colStart, colEnd, orientation) => {
      if (rowEnd - rowStart < 2 || colEnd - colStart < 2) {
        return; // Not enough space to divide further
      }

      const isHorizontal = orientation === "HORIZONTAL";

      if (isHorizontal) {
        const wallRow =
          Math.floor(Math.random() * ((rowEnd - rowStart) / 2)) * 2 +
          rowStart +
          1;
        const passageCol =
          Math.floor(Math.random() * ((colEnd - colStart + 1) / 2)) * 2 +
          colStart;

        for (let col = colStart; col <= colEnd; col++) {
          if (
            col === passageCol ||
            grid[wallRow][col].isStart ||
            grid[wallRow][col].isFinish
          )
            continue;
          grid[wallRow][col].isWall = true;
        }

        divideGrid(
          grid,
          rowStart,
          wallRow - 1,
          colStart,
          colEnd,
          chooseOrientation(wallRow - rowStart, colEnd - colStart + 1)
        );
        divideGrid(
          grid,
          wallRow + 1,
          rowEnd,
          colStart,
          colEnd,
          chooseOrientation(rowEnd - wallRow, colEnd - colStart + 1)
        );
      } else {
        const wallCol =
          Math.floor(Math.random() * ((colEnd - colStart) / 2)) * 2 +
          colStart +
          1;
        const passageRow =
          Math.floor(Math.random() * ((rowEnd - rowStart + 1) / 2)) * 2 +
          rowStart;

        for (let row = rowStart; row <= rowEnd; row++) {
          if (
            row === passageRow ||
            grid[row][wallCol].isStart ||
            grid[row][wallCol].isFinish
          )
            continue;
          grid[row][wallCol].isWall = true;
        }

        divideGrid(
          grid,
          rowStart,
          rowEnd,
          colStart,
          wallCol - 1,
          chooseOrientation(rowEnd - rowStart + 1, wallCol - colStart)
        );
        divideGrid(
          grid,
          rowStart,
          rowEnd,
          wallCol + 1,
          colEnd,
          chooseOrientation(rowEnd - rowStart + 1, colEnd - wallCol)
        );
      }
    },
    []
  );

  return {
    randomizeBoard,
    generateWeightedMaze,
    generateRecursiveDivisionMaze,
  };
};
