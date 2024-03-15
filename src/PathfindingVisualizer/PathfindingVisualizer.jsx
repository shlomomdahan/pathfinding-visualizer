// PathfindingVisualizer.jsx
import React, { useState } from "react";
import "./PathfindingVisualizer.css";
import { executeAlgorithm } from "../algorithms";
import Node from "./Node/Node";
import Toolbar from "../utils/ToolBar";
import { useGridHandler } from "../hooks/useGridHandler";
import { useVisualization } from "../hooks/useVisualization";
import { useMazeGenerator } from "../hooks/useMazeGenerator";
import { initialGrid, findStartNode, findFinishNode } from "../utils/GridUtils";
import { dijkstra } from "../algorithms/dijkstra";
import { dfs } from "../algorithms/dfs";
import { bfs } from "../algorithms/bfs";
import { astar } from "../algorithms/astar";

const algorithms = [
  { label: "Dijkstra", actionKey: "dijkstra", func: dijkstra },
  { label: "A*", actionKey: "astar", func: astar },
  { label: "Breadth First Search", actionKey: "bfs", func: bfs },
  { label: "Depth First Search", actionKey: "dfs", func: dfs },
];

const mazeOptions = [
  { label: "Randomize Board", actionKey: "randomizeBoard" },
  {
    label: "Recursive Division Maze",
    actionKey: "generateRecursiveDivisionMaze",
  },
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

  const { randomizeBoard, generateRecursiveDivisionMaze } = useMazeGenerator(
    grid,
    setGrid
  );

  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0]); // Default to Dijkstra object
  const handleToolbarAction = (actionKey) => {
    switch (actionKey) {
      case "clearBoard":
        clearBoard();
        break;
      case "randomizeBoard":
        resetForVisualization();
        randomizeBoard(); // Assuming this generates a random maze
        break;
      case "generateRecursiveDivisionMaze":
        resetForVisualization();
        generateRecursiveDivisionMaze();
        break;
      case "visualize":
        resetForVisualization();
        startVisualization(selectedAlgorithm.actionKey);
        break;
      default:
        if (actionKey.startsWith("algo-")) {
          const algorithmKey = actionKey.replace("algo-", "");
          const selected = algorithms.find(
            (algo) => algo.actionKey === algorithmKey
          );
          if (selected) {
            setSelectedAlgorithm(selected);
          }
        }
        break;
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
        mazeItems={mazeOptions} // Pass the maze options here
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
                  distance={node.distance}
                  onMouseDown={() => handleMouseDown(rowIdx, nodeIdx)}
                  onMouseEnter={() => handleMouseEnter(rowIdx, nodeIdx)}
                  onMouseUp={handleMouseUp}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="footer">
        <h1>Pathfinding Visualizer</h1>
        <div className="link-img-container">
          <a href="https://github.com/shlomomdahan/pathfinding-visualizer">
            Source Code
          </a>
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub"
            width="30"
            height="30"
          />
          <h5 className="name">by Shlomo Dahan</h5>
        </div>
      </div>
    </div>
  );
};

export default PathfindingVisualizer;
