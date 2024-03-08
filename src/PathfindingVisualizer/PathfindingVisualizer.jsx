import React, { useState, useEffect, useRef, useCallback } from "react";
import "./PathfindingVisualizer.css";
import Node from "./Node/Node";
import { initialGrid, toggleWall } from "../utils/GridUtils";

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const timeoutIdsRef = useRef([]);

  useEffect(() => {
    setGrid(initialGrid());
  }, []);

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

  const clearAllTimeouts = () => {
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];
  };

  const visualize = () => {
    clearAllTimeouts();
    if (grid.some((row) => row.some((node) => node.isVisited))) {
      resetGrid();
    }

    let newGrid = [...grid];
    let delay = 0;
    const delayIncrement = 10;

    for (let row = 0; row < newGrid.length; row++) {
      for (let col = 0; col < newGrid[row].length; col++) {
        const timeoutId = setTimeout(() => {
          newGrid[row][col].isVisited = true;
          setGrid(newGrid.map((row) => [...row]));
        }, delay);
        timeoutIdsRef.current.push(timeoutId);
        delay += delayIncrement;
      }
    }
  };

  const stopVisualization = () => {
    clearAllTimeouts();
    setGrid(initialGrid());
  };

  const resetGrid = () => {
    const resetGrid = grid.map((row) =>
      row.map((node) => ({ ...node, isVisited: false }))
    );
    setGrid(resetGrid);
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => setMouseIsPressed(false);
    document.addEventListener("mouseup", handleMouseUpGlobal);
    return () => document.removeEventListener("mouseup", handleMouseUpGlobal);
  }, []);

  return (
    <div className="main">
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((node, nodeIdx) => (
              <Node
                key={nodeIdx}
                isStart={node.isStart}
                isFinish={node.isFinish}
                isVisited={node.isVisited}
                isWall={node.isWall}
                onMouseDown={() => handleMouseDown(rowIdx, nodeIdx)}
                onMouseEnter={() => handleMouseEnter(rowIdx, nodeIdx)}
                onMouseUp={handleMouseUp}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={visualize}>Visualize</button>
      <button onClick={stopVisualization}>Clear Board</button>
    </div>
  );
};

export default PathfindingVisualizer;
