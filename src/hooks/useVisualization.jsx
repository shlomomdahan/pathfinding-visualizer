import { useRef, useCallback } from "react";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";

export const useVisualization = (grid, setGrid, initialGrid) => {
  const timeoutIdsRef = useRef([]);

  // Clear all timeouts to prevent overlapping animations
  const clearAllTimeouts = useCallback(() => {
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];
  }, []);

  // Reset the grid to its initial state
  const resetGrid = useCallback(() => {
    clearAllTimeouts(); // Ensuring we clear timeouts when resetting the grid
    const newGrid = initialGrid();
    setGrid(newGrid);
  }, [setGrid, initialGrid, clearAllTimeouts]);

  // The main function to visualize the algorithm
  const visualize = useCallback(() => {
    clearAllTimeouts(); // Clear existing animations before starting a new one
    const startNode = findStartNode(grid);
    const finishNode = findFinishNode(grid);
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }, [grid, setGrid, clearAllTimeouts]);

  function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) {
          element.className = "node node-visited";
          if (node.isStart) {
            element.className = "node node-start";
          }
          if (node.isFinish) {
            element.className = "node node-finish";
          }
        }
      }, 10 * i);
    }
  }

  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) {
          element.className = "node node-shortest-path";
        }
        if (node.isStart) {
          element.className = "node node-start";
        }
        if (node.isFinish) {
          element.className = "node node-finish";
        }
      }, 50 * i);
    }
  }

  // Function to stop the visualization and reset the grid
  const stopVisualization = useCallback(() => {
    clearAllTimeouts();
    resetGrid();
  }, [clearAllTimeouts, resetGrid]);

  return { visualize, stopVisualization, resetGrid };
};

const findStartNode = (grid) => {
  for (const row of grid) {
    for (const node of row) {
      if (node.isStart) return node;
    }
  }
};

const findFinishNode = (grid) => {
  for (const row of grid) {
    for (const node of row) {
      if (node.isFinish) return node;
    }
  }
};
