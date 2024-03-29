import TinyQueue from "tinyqueue";
import { getUnvisitedNeighbors } from "./algoHelper";

export function gbfs(grid, startNode, finishNode) {
  console.log("gbfs");
  const gbfsNodes = createGbfsGrid(grid);
  const visitedNodesInOrder = [];

  const start = findStart(gbfsNodes);
  const finish = findFinish(gbfsNodes);

  const compareNodes = (a, b) => a.h - b.h;

  const openList = new TinyQueue([], compareNodes);
  start.isOpened = true;
  openList.push(start);

  while (openList.length > 0) {
    let currentNode = openList.pop();
    currentNode.isOpened = false;
    currentNode.visited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finish) {
      return visitedNodesInOrder;
    }

    const neighbors = getUnvisitedNeighbors(currentNode, gbfsNodes);
    for (const neighbor of neighbors) {
      if (neighbor.isWall || neighbor.visited) {
        // Check if neighbor is visited
        continue;
      }

      neighbor.h = heuristic(neighbor, finish);
      neighbor.previousNode = currentNode;
      neighbor.visited = true;

      if (!neighbor.isOpened) {
        neighbor.isOpened = true;
        openList.push(neighbor);
      }
    }
  }

  return visitedNodesInOrder;
}

function createGbfsGrid(grid) {
  return grid.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      return {
        ...cell,
        h: Infinity,
        previousNode: null,
        x: rowIndex,
        y: colIndex,
        isOpened: false,
      };
    });
  });
}

function findStart(gbfsGrid) {
  for (const row of gbfsGrid) {
    for (const node of row) {
      if (node.isStart) {
        return node;
      }
    }
  }
}

function findFinish(gbfsGrid) {
  for (const row of gbfsGrid) {
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
