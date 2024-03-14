// PathfindingVisualizer.jsx
import React, { useState } from "react";
import "./PathfindingVisualizer.css";
import { executeAlgorithm } from "../algorithms";
import Node from "./Node/Node";
import Toolbar from "../utils/ToolBar";
import { useGridHandler } from "../hooks/useGridHandler";
import { useVisualization } from "../hooks/useVisualization";
import { initialGrid, findStartNode, findFinishNode } from "../utils/GridUtils";
import { dijkstra } from "../algorithms/dijkstra";

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState(initialGrid);
  const { handleMouseDown, handleMouseEnter, handleMouseUp } = useGridHandler(
    grid,
    setGrid
  );
  const { visualize, clearBoard } = useVisualization(grid, setGrid);

  // Available algorithms map
  const algorithms = {
    dijkstra: dijkstra,
    // Add more algorithms here
  };

  const startVisualization = (algorithmName) => {
    const startNode = findStartNode(grid);
    const finishNode = findFinishNode(grid);
    const algorithm = algorithms[algorithmName];

    if (!algorithm) {
      console.error(`Algorithm ${algorithmName} not found.`);
      return;
    }

    const { visitedNodesInOrder, nodesInShortestPathOrder } = executeAlgorithm(
      algorithm,
      grid,
      startNode,
      finishNode
    );
    visualize(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const handleToolbarAction = (actionKey) => {
    const actionMap = {
      visualize: () => startVisualization("dijkstra"),
      clearBoard: clearBoard,
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
                isWall={node.isWall}
                isVisualized={node.isVisualized}
                isPath={node.isPath}
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
