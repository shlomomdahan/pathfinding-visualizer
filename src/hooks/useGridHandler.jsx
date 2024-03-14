import { useState, useCallback } from "react";
import { initialGrid, toggleWall } from "../utils/GridUtils";

// useGridHandler.js
export const useGridHandler = (grid, setGrid) => {
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const handleMouseDown = useCallback(
    (row, col) => {
      const newGrid = toggleWall(grid, row, col);
      setGrid(newGrid);
      setMouseIsPressed(true);
    },
    [grid, setGrid]
  );

  const handleMouseEnter = useCallback(
    (row, col) => {
      if (!mouseIsPressed) return;
      const newGrid = toggleWall(grid, row, col);
      setGrid(newGrid);
    },
    [grid, setGrid, mouseIsPressed]
  );

  const handleMouseUp = useCallback(() => {
    setMouseIsPressed(false);
  }, []);

  return { handleMouseDown, handleMouseEnter, handleMouseUp };
};
