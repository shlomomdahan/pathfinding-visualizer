// useVisualization.js
import { useRef, useCallback, useState } from "react";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { initialGrid, findStartNode, findFinishNode } from "../utils/GridUtils";

export const useVisualization = (grid, setGrid) => {
  const timeoutIdsRef = useRef([]);

  // Function to clear all timeouts
  const clearAllTimeouts = useCallback(() => {
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];
  }, []);

  // Function to clear the board
  const clearBoard = useCallback(() => {
    clearAllTimeouts();
    setGrid(initialGrid());
  }, [initialGrid, clearAllTimeouts]);

  // Function to animate Dijkstra's algorithm
  const visualize = useCallback(() => {
    clearAllTimeouts();
    const startNode = findStartNode(grid);
    const finishNode = findFinishNode(grid);
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

    // Animate visited nodes
    visitedNodesInOrder.forEach((node, index) => {
      const timeoutId = setTimeout(() => {
        setGrid((prevGrid) => {
          const newGrid = prevGrid.map((row) =>
            row.map((n) =>
              n.row === node.row && n.col === node.col
                ? { ...n, nodeStatus: "node-visited" }
                : n
            )
          );
          return newGrid;
        });
      }, 10 * index);
      timeoutIdsRef.current.push(timeoutId);
    });

    // Animate shortest path
    const totalAnimationTime = visitedNodesInOrder.length * 10;
    nodesInShortestPathOrder.forEach((node, index) => {
      const timeoutId = setTimeout(() => {
        setGrid((prevGrid) => {
          const newGrid = prevGrid.map((row) =>
            row.map((n) =>
              n === node ? { ...n, nodeStatus: "node-shortest-path" } : n
            )
          );
          return newGrid;
        });
      }, totalAnimationTime + 50 * index);
      timeoutIdsRef.current.push(timeoutId);
    });
  }, [grid, clearAllTimeouts]);

  return { visualize, clearBoard };
};

// // hooks/usePathfindingVisualization.js
// import { useCallback, useRef, useState } from "react";

// export const usePathfindingVisualization = (initialGrid) => {
//   const [grid, setGrid] = useState(initialGrid());
//   const timeoutIdsRef = useRef([]);

//   const clearAllTimeouts = useCallback(() => {
//     timeoutIdsRef.current.forEach(clearTimeout);
//     timeoutIdsRef.current = [];
//   }, []);

const visualize = useCallback(
  (visitedNodesInOrder, nodesInShortestPathOrder) => {
    clearAllTimeouts();
    // Example visualization logic
    // This part should animate the nodes based on visitedNodesInOrder and nodesInShortestPathOrder
    // Adjust this logic to fit your application's needs
  },
  [clearAllTimeouts]
);

//   const clearBoard = useCallback(() => {
//     clearAllTimeouts();
//     setGrid(initialGrid());
//   }, [initialGrid, clearAllTimeouts]);

//   return { grid, setGrid, visualize, clearBoard };
// };
