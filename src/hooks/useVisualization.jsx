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

  const clearWeights = useCallback(() => {
    clearAllTimeouts();
    setGrid((prevGrid) =>
      prevGrid.map((row) =>
        row.map((node) => ({
          ...node,
          // isPath: false,
          // distance: Infinity,
          // isVisualized: false,
          // isVisited: false,
          // previousNode: null,
          weight: 1,
        }))
      )
    );
  }, [clearAllTimeouts, setGrid]);

  const clearWalls = useCallback(() => {
    clearAllTimeouts();
    setGrid((prevGrid) =>
      prevGrid.map((row) =>
        row.map((node) => ({
          ...node,
          // isPath: false,
          // distance: Infinity,
          // isVisualized: false,
          // isVisited: false,
          // previousNode: null,
          // weight: 1,
          isWall: false,
        }))
      )
    );
  }, [clearAllTimeouts, setGrid]);

  const resetForVisualization = useCallback(() => {
    clearAllTimeouts();
    setGrid((prevGrid) => {
      return prevGrid.map((row) =>
        row.map((node) => ({
          ...node,
          isVisualized: false,
          isPath: false,
          isVisited: false,
          distance: Infinity,
          previousNode: null,
        }))
      );
    });
  }, [clearAllTimeouts, setGrid]);

  const resetForMaze = useCallback(() => {
    clearAllTimeouts();
    setGrid((prevGrid) => {
      return prevGrid.map((row) =>
        row.map((node) => ({
          ...node,
          isVisualized: false,
          isPath: false,
          isVisited: false,
          distance: Infinity,
          previousNode: null,
          isWall: false,
          weight: 1,
        }))
      );
    });
  }, [clearAllTimeouts, setGrid]);

  // Function to animate Dijkstra's algorithm
  const visualize = useCallback(
    (visitedNodesInOrder, nodesInShortestPathOrder) => {
      clearAllTimeouts();
      visitedNodesInOrder.forEach((node, index) => {
        const timeoutId = setTimeout(() => {
          setGrid((prevGrid) => {
            const newGrid = prevGrid.map((row, rowIndex) =>
              row.map((n, colIndex) => {
                if (n.row === node.row && n.col === node.col) {
                  return { ...n, isVisualized: true, distance: node.distance };
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
                  return { ...n, isPath: true, distance: node.distance };
                }
                return n;
              })
            );
            return newGrid;
          });
        }, totalAnimationTime + 50 * index);
        timeoutIdsRef.current.push(timeoutId);
      });
    },
    [setGrid, clearAllTimeouts]
  );

  return {
    visualize,
    clearBoard,
    clearWeights,
    clearWalls,
    resetForVisualization,
    resetForMaze,
  };
};
