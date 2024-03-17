import { getNodesInShortestPathOrder } from "./algoHelper";

export const executeAlgorithm = (algorithm, grid, startNode, finishNode) => {
  const visitedNodesInOrder = algorithm(grid, startNode, finishNode);
  // get the finish node from the grid visited by the algorithm
  const finish = visitedNodesInOrder.find((node) => node.isFinish);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
  return { visitedNodesInOrder, nodesInShortestPathOrder };
};
