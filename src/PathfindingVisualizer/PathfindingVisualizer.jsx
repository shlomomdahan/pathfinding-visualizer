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
import { dfs } from "../algorithms/dfs";
import { bfs } from "../algorithms/bfs";

const algorithms = [
  { label: "Dijkstra", actionKey: "dijkstra", func: dijkstra },
  { label: "A*", actionKey: "astar", func: null },
  { label: "Breadth First Search", actionKey: "bfs", func: bfs },
  { label: "Depth First Search", actionKey: "dfs", func: dfs },
];

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState(initialGrid());
  const { handleMouseDown, handleMouseEnter, handleMouseUp } = useGridHandler(
    grid,
    setGrid
  );
  const { visualize, clearBoard, resetForVisualization } = useVisualization(
    grid,
    setGrid
  );

  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0]); // Default to Dijkstra object

  const handleToolbarAction = (actionKey) => {
    if (actionKey === "clearBoard") {
      clearBoard();
    } else if (actionKey.startsWith("algo-")) {
      const algorithmKey = actionKey.replace("algo-", "");
      const selectedAlgorithm = algorithms.find(
        (algo) => algo.actionKey === algorithmKey
      );
      if (selectedAlgorithm) {
        setSelectedAlgorithm(selectedAlgorithm);
      }
    } else if (actionKey === "visualize") {
      resetForVisualization();
      startVisualization(selectedAlgorithm.actionKey); // Use the action key from the selected algorithm object
    }
  };

  const startVisualization = () => {
    const startNode = findStartNode(grid);
    const finishNode = findFinishNode(grid);
    const algorithmFunc = selectedAlgorithm.func;

    if (!algorithmFunc) {
      console.error(`Algorithm function not found.`);
      return;
    }

    const result = executeAlgorithm(algorithmFunc, grid, startNode, finishNode);
    if (
      !result ||
      !result.visitedNodesInOrder ||
      !result.nodesInShortestPathOrder
    ) {
      console.error("Algorithm did not return expected result.");
      return; // Exit to avoid calling visualize with undefined values
    }
    visualize(result.visitedNodesInOrder, result.nodesInShortestPathOrder);
  };

  return (
    <div className="main">
      <Toolbar
        onAction={handleToolbarAction}
        selectedAlgorithm={selectedAlgorithm.label}
        algorithmItems={algorithms.map((algo) => ({
          label: algo.label,
          actionKey: `algo-${algo.actionKey}`,
        }))}
      />
      <div className="grid-wrapper">
        {" "}
        {/* New wrapper for the grid */}
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
