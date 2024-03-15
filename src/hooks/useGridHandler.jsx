import { useState, useCallback } from "react";

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
  const [actionType, setActionType] = useState(null);

  const handleMouseDown = useCallback(
    (event, row, col) => {
      setMouseIsPressed(true);
      if (event.shiftKey) {
        // If Shift is pressed, set the weight of the node to 30
        setActionType("setWeight");
        const newGrid = grid.map((gridRow, gridRowIndex) =>
          gridRow.map((node, nodeColIndex) => {
            if (gridRowIndex === row && nodeColIndex === col) {
              return { ...node, weight: 30 }; // Setting weight to 30
            }
            return node;
          })
        );
        setGrid(newGrid);
      } else if (isStartNode(grid, row, col) || isFinishNode(grid, row, col)) {
        setActionType(isStartNode(grid, row, col) ? "moveStart" : "moveFinish");
      } else {
        setActionType("toggleWall");
        const newGrid = toggleWall(grid, row, col);
        setGrid(newGrid);
      }
    },
    [grid, setGrid]
  );

  const handleMouseEnter = useCallback(
    (row, col) => {
      if (!mouseIsPressed) return;
      let newGrid;
      switch (actionType) {
        case "setWeight":
          newGrid = grid.map((gridRow, gridRowIndex) =>
            gridRow.map((node, nodeColIndex) => {
              if (gridRowIndex === row && nodeColIndex === col) {
                return { ...node, weight: 30 }; // Set weight to 30 for drag over
              }
              return node;
            })
          );
          break;
        case "moveStart":
        case "moveFinish":
          newGrid =
            actionType === "moveStart"
              ? moveStartNode(grid, row, col)
              : moveFinishNode(grid, row, col);
          break;
        case "toggleWall":
        default:
          newGrid = toggleWall(grid, row, col);
      }
      setGrid(newGrid);
    },
    [grid, setGrid, mouseIsPressed, actionType]
  );

  const handleMouseUp = useCallback(() => {
    setMouseIsPressed(false);
    setActionType(null); // Reset action type
  }, []);

  return { handleMouseDown, handleMouseEnter, handleMouseUp };
};
