// useVisualization.js
import { useRef, useCallback } from "react";
import { initialGrid } from "../utils/GridUtils";

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
  const visualize = useCallback(
    (visitedNodesInOrder, nodesInShortestPathOrder) => {
      clearAllTimeouts();

      visitedNodesInOrder.forEach((node, index) => {
        const timeoutId = setTimeout(() => {
          setGrid((prevGrid) => {
            const newGrid = prevGrid.map((row, rowIndex) =>
              row.map((n, colIndex) => {
                if (n === node) {
                  return { ...n, isVisualized: true };
                }
                return n;
              })
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
              row.map((n) => {
                if (n.row === node.row && n.col === node.col) {
                  // Adjusted condition
                  return { ...n, isPath: true };
                }
                return n;
              })
            );
            console.log("Shortest path node", node);
            return newGrid;
          });
        }, totalAnimationTime + 50 * index);
        timeoutIdsRef.current.push(timeoutId);
      });
    },
    [grid, clearAllTimeouts]
  );

  return { visualize, clearBoard };
};
