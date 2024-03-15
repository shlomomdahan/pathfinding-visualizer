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

      const gScore = currentNode.g + 1;
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

  return [];
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

// slower implementation:

// import { getAllNodes, getUnvisitedNeighbors } from "./algoHelper";

// export function astar(grid, startNode, finishNode) {
//   const aStarNodes = createAStarGrid(grid);
//   const start = findStart(aStarNodes);
//   const finish = findFinish(aStarNodes);

//   const openList = [];
//   const closedList = [];
//   const visitedNodesInOrder = []; // To keep track of nodes as they are visited

//   openList.push(start);

//   while (openList.length > 0) {
//     let lowestIndex = 0;
//     for (let i = 0; i < openList.length; i++) {
//       if (openList[i].f < openList[lowestIndex].f) {
//         lowestIndex = i;
//       }
//     }

//     let currentNode = openList[lowestIndex];

//     // Move the currentNode from the openList to the closedList
//     openList.splice(lowestIndex, 1);
//     closedList.push(currentNode);
//     visitedNodesInOrder.push(currentNode); // Add the currentNode to the visitedNodesInOrder list

//     if (currentNode === finish) {
//       // If we've reached the finish node, return the nodes visited in order
//       return visitedNodesInOrder;
//     }

//     const neighbors = getUnvisitedNeighbors(currentNode, aStarNodes);
//     for (const neighbor of neighbors) {
//       if (closedList.includes(neighbor) || neighbor.isWall) {
//         continue;
//       }

//       const gScore = currentNode.g + 1;
//       let gScoreIsBest = false;

//       if (!openList.includes(neighbor)) {
//         gScoreIsBest = true;
//         neighbor.h = heuristic(neighbor, finish);
//         openList.push(neighbor);
//       } else if (gScore < neighbor.g) {
//         gScoreIsBest = true;
//       }

//       if (gScoreIsBest) {
//         neighbor.previousNode = currentNode;
//         neighbor.g = gScore;
//         neighbor.f = neighbor.g + neighbor.h;
//       }
//     }
//   }

//   // In case no path is found.
//   return [];
// }

// function heuristic(pos0, pos1) {
//   const d1 = Math.abs(pos1.row - pos0.row);
//   const d2 = Math.abs(pos1.col - pos0.col);
//   return d1 + d2;
// }

// function createAStarGrid(grid) {
//   return grid.map((row) => {
//     return row.map((cell) => {
//       return {
//         ...cell,
//         f: 0,
//         g: 0,
//         h: 0,
//         previousNode: null,
//       };
//     });
//   });
// }

// function findStart(aStarGrid) {
//   for (const row of aStarGrid) {
//     for (const node of row) {
//       if (node.isStart) {
//         return node;
//       }
//     }
//   }
// }

// function findFinish(aStarGrid) {
//   for (const row of aStarGrid) {
//     for (const node of row) {
//       if (node.isFinish) {
//         return node;
//       }
//     }
//   }
// }
