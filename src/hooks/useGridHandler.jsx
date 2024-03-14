import { useState, useCallback } from "react";
import { initialGrid, toggleWall } from "../utils/GridUtils";

export const useGridHandler = () => {
  const [grid, setGrid] = useState(initialGrid());
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const handleMouseDown = useCallback(
    (row, col) => {
      const newGrid = toggleWall(grid, row, col);
      setGrid(newGrid);
      setMouseIsPressed(true);
    },
    [grid]
  );

  const handleMouseEnter = useCallback(
    (row, col) => {
      if (!mouseIsPressed) return;
      const newGrid = toggleWall(grid, row, col);
      setGrid(newGrid);
    },
    [grid, mouseIsPressed]
  );

  const handleMouseUp = useCallback(() => {
    setMouseIsPressed(false);
  }, []);

  return { grid, handleMouseDown, handleMouseEnter, handleMouseUp, setGrid };
};
