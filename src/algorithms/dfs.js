import { getUnvisitedNeighbors } from "./algoHelper";

export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const stack = [];
  stack.push(startNode);

  while (!!stack.length) {
    const currentNode = stack.pop();

    if (currentNode.isWall) continue;
    if (currentNode.isVisited) continue;
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) return visitedNodesInOrder;
    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = currentNode.distance + 1;
      neighbor.previousNode = currentNode;
      stack.push(neighbor);
    }
  }
  return visitedNodesInOrder;
}
