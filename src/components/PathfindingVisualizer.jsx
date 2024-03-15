// PathfindingVisualizer.jsx
import React, { useState, useEffect } from "react";
import "./PathfindingVisualizer.css";
import { executeAlgorithm } from "../algorithms";
import Node from "./Node";
import Toolbar from "../utils/ToolBar";
import { useGridHandler } from "../hooks/useGridHandler";
import { useVisualization } from "../hooks/useVisualization";
import { useMazeGenerator } from "../hooks/useMazeGenerator";
import { initialGrid, findStartNode, findFinishNode } from "../utils/GridUtils";
import { dijkstra } from "../algorithms/dijkstra";
import { dfs } from "../algorithms/dfs";
import { bfs } from "../algorithms/bfs";
import { astar } from "../algorithms/astar";
import WeightLegend from "../components/weightLegend";
import AlgorithmStats from "./algorithmStats";
import Description from "./Description";

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
  { label: "Random Weighted Maze", actionKey: "generateWeightedMaze" },
];

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState(initialGrid());
  const { handleMouseDown, handleMouseEnter, handleMouseUp } = useGridHandler(
    grid,
    setGrid
  );
  const {
    visualize,
    clearBoard,
    clearWeightedBoard,
    resetForVisualization,
    resetForMaze,
  } = useVisualization(grid, setGrid);

  const {
    randomizeBoard,
    generateWeightedMaze,
    generateRecursiveDivisionMaze,
  } = useMazeGenerator(grid, setGrid);
  const [isWeightedGraph, setIsWeightedGraph] = useState(false);

  const [runtime, setRuntime] = useState(0);
  const [pathCost, setPathCost] = useState(0);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0]); // Default to Dijkstra object
  const handleToolbarAction = (actionKey) => {
    switch (actionKey) {
      case "clearBoard":
        clearBoard();
        break;
      case "randomizeBoard":
        resetForMaze();
        randomizeBoard(); // Assuming this generates a random maze
        break;
      case "generateRecursiveDivisionMaze":
        resetForMaze();
        generateRecursiveDivisionMaze();
        break;
      case "generateWeightedMaze":
        resetForMaze();
        generateWeightedMaze();
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

    const startTime = performance.now(); // Start timing
    const result = executeAlgorithm(algorithmFunc, grid, startNode, finishNode);
    const endTime = performance.now(); // End timing

    if (
      !result ||
      !result.visitedNodesInOrder ||
      !result.nodesInShortestPathOrder
    ) {
      console.error("Algorithm did not return expected result.");
      return; // Exit to avoid calling visualize with undefined values
    }

    const runtime = endTime - startTime;
    const pathCost = result.nodesInShortestPathOrder.reduce(
      (acc, node) => acc + node.weight,
      0
    );

    setRuntime(runtime);
    setPathCost(pathCost);

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
        // isWeightedGraph={isWeightedGraph}
      />
      <div className="dashboard">
        <AlgorithmStats runtime={runtime} pathCost={pathCost} />
        <WeightLegend />
      </div>
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
                  weight={node.weight}
                  // onMouseDown={() => handleMouseDown(rowIdx, nodeIdx)}
                  onMouseDown={(event) =>
                    handleMouseDown(event, rowIdx, nodeIdx)
                  }
                  onMouseEnter={(event) => handleMouseEnter(rowIdx, nodeIdx)}
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
