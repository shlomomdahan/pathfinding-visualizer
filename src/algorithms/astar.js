import TinyQueue from "tinyqueue";
import { getUnvisitedNeighbors } from "./algoHelper";

export function astar(grid, startNode, finishNode) {
  const aStarNodes = createAStarGrid(grid);
  const visitedNodesInOrder = []; // List to store the order of visited nodes

  const start = findStart(aStarNodes);
  const finish = findFinish(aStarNodes);

  // Comparator function for TinyQueue
  const compareNodes = (a, b) => a.f - b.f;

  const openList = new TinyQueue([], compareNodes);
  start.isOpened = true;
  openList.push(start);

  while (openList.length > 0) {
    let currentNode = openList.pop();
    currentNode.isOpened = false;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finish) {
      return visitedNodesInOrder;
    }

    const neighbors = getUnvisitedNeighbors(currentNode, aStarNodes);
    for (const neighbor of neighbors) {
      if (neighbor.isWall || neighbor.isOpened) {
        continue;
      }

      // const gScore = currentNode.g + 1;
      const gScore = currentNode.g + neighbor.weight;
      if (gScore < neighbor.g) {
        neighbor.h = heuristic(neighbor, finish);
        neighbor.previousNode = currentNode;
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
        if (!neighbor.isOpened) {
          neighbor.isOpened = true;
          openList.push(neighbor);
        }
      }
    }
  }

  return visitedNodesInOrder;
}

function createAStarGrid(grid) {
  const aStarGrid = grid.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      return {
        ...cell,
        f: 0,
        g: Infinity, // Initially, all nodes have an infinite distance from the start, except the start node itself
        h: 0,
        previousNode: null,
        x: rowIndex, // Adding x coordinate for clarity
        y: colIndex, // Adding y coordinate for clarity
        isOpened: false, // Track whether the node is in the open list
        weight: cell.weight || 1,
      };
    });
  });

  // Initialize start node
  const startNode = findStart(aStarGrid);
  startNode.g = 0;
  startNode.f = heuristic(startNode, findFinish(aStarGrid));

  return aStarGrid;
}

function findStart(aStarGrid) {
  for (const row of aStarGrid) {
    for (const node of row) {
      if (node.isStart) {
        return node;
      }
    }
  }
}

function findFinish(aStarGrid) {
  for (const row of aStarGrid) {
    for (const node of row) {
      if (node.isFinish) {
        return node;
      }
    }
  }
}

function heuristic(pos0, pos1) {
  return Math.abs(pos1.row - pos0.row) + Math.abs(pos1.col - pos0.col);
}
