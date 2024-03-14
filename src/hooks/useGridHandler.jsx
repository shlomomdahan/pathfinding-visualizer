import { useState, useCallback } from "react";

// Assuming initialGrid, toggleWall, and additional utilities are defined
// Add utilities to identify and move start/finish nodes
import {
  initialGrid,
  toggleWall,
  isStartNode,
  isFinishNode,
  moveStartNode,
  moveFinishNode,
} from "../utils/GridUtils";

export const useGridHandler = (grid, setGrid) => {
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [nodeBeingDragged, setNodeBeingDragged] = useState(null); // New state to track if we're dragging start/finish

  const handleMouseDown = useCallback(
    (row, col) => {
      if (isStartNode(grid, row, col) || isFinishNode(grid, row, col)) {
        // Identify if the clicked node is start or finish
        setNodeBeingDragged({
          type: isStartNode(grid, row, col) ? "start" : "finish",
          row,
          col,
        });
      } else {
        const newGrid = toggleWall(grid, row, col);
        setGrid(newGrid);
      }
      setMouseIsPressed(true);
    },
    [grid, setGrid]
  );

  const handleMouseEnter = useCallback(
    (row, col) => {
      if (!mouseIsPressed) return;
      if (nodeBeingDragged) {
        // If we're dragging a start/finish node, move it
        const newGrid =
          nodeBeingDragged.type === "start"
            ? moveStartNode(grid, row, col)
            : moveFinishNode(grid, row, col);
        setGrid(newGrid);
      } else {
        // Regular wall toggle behavior
        const newGrid = toggleWall(grid, row, col);
        setGrid(newGrid);
      }
    },
    [grid, setGrid, mouseIsPressed, nodeBeingDragged]
  );

  const handleMouseUp = useCallback(() => {
    setMouseIsPressed(false);
    setNodeBeingDragged(null); // Reset dragging state
  }, []);

  return { handleMouseDown, handleMouseEnter, handleMouseUp };
};
