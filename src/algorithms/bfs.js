import { getUnvisitedNeighbors } from "./algoHelper";

export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const queue = [];
  queue.push(startNode);

  while (!!queue.length) {
    const currentNode = queue.shift();

    if (currentNode.isWall) continue;
    if (currentNode.isVisited) continue;
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) return visitedNodesInOrder;
    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = currentNode.distance + 1;
      neighbor.previousNode = currentNode;
      queue.push(neighbor);
    }
  }
  return visitedNodesInOrder;
}
