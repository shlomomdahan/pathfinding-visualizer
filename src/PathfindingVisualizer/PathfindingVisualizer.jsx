import React, { useState, useEffect, useRef, useCallback } from "react";
import "./PathfindingVisualizer.css";
import Node from "./Node/Node";
import { initialGrid } from "../utils/GridUtils";
import { useGridHandler } from "../hooks/useGridHandler";
import { useVisualization } from "../hooks/useVisualization";
import Toolbar from "../utils/ToolBar";

const PathfindingVisualizer = () => {
  const { grid, handleMouseDown, handleMouseEnter, handleMouseUp, setGrid } =
    useGridHandler();

  const { visualize, stopVisualization, resetGrid } = useVisualization(
    grid,
    setGrid,
    initialGrid
  );

  const timeoutIdsRef = useRef([]);

  const clearAllTimeouts = () => {
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];
  };

  const printHI = () => {
    console.log("Hi");
  };

  const handleToolbarAction = (actionKey) => {
    const actionMap = {
      visualize: visualize,
      clearBoard: resetGrid,
      printHi: printHI,
      // Add more action mappings here as needed
    };

    const action = actionMap[actionKey];
    if (action) {
      action();
    }
  };

  return (
    <div className="main">
      <Toolbar onAction={handleToolbarAction} />
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((node, nodeIdx) => (
              <Node
                key={nodeIdx}
                col={node.col}
                row={node.row}
                isStart={node.isStart}
                isFinish={node.isFinish}
                isVisited={node.isVisited}
                isWall={node.isWall}
                // isPath={node.isPath} // Make sure you handle this new state
                onMouseDown={() => handleMouseDown(rowIdx, nodeIdx)}
                onMouseEnter={() => handleMouseEnter(rowIdx, nodeIdx)}
                onMouseUp={handleMouseUp}
              />
            ))}
          </div>
        ))}
      </div>
      <h1
        style={{
          textAlign: "center",
          marginTop: "10px",
          color: "Black",
        }}
      >
        Pathfinding Visualizer
      </h1>
    </div>
  );
};

export default PathfindingVisualizer;
