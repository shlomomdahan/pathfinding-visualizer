import { getNodesInShortestPathOrder } from "./algoHelper";

export const executeAlgorithm = (algorithm, grid, startNode, finishNode) => {
  const visitedNodesInOrder = algorithm(grid, startNode, finishNode);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  return { visitedNodesInOrder, nodesInShortestPathOrder };
};
