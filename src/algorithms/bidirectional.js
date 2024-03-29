import { getUnvisitedNeighbors } from "./algoHelper";

export function bidirectional(grid, startNode, finishNode) {
  let visitedNodesInOrder = [];
  startNode.distanceFromStart = 0;
  finishNode.distanceFromFinish = 0;

  let queueFromStart = [startNode];
  let queueFromFinish = [finishNode];

  let visitedFromStart = new Set([startNode]);
  let visitedFromFinish = new Set([finishNode]);

  while (queueFromStart.length > 0 && queueFromFinish.length > 0) {
    let meetingNode = expandSearchFromStart() || expandSearchFromFinish();
    if (meetingNode) {
      linkPath(meetingNode);
      break;
    }
  }

  return visitedNodesInOrder;

  function expandSearchFromStart() {
    if (queueFromStart.length === 0) return null;
    let currentNode = queueFromStart.shift();
    visitedNodesInOrder.push(currentNode);

    if (visitedFromFinish.has(currentNode)) return currentNode;

    processNeighbors(
      currentNode,
      queueFromStart,
      visitedFromStart,
      "visitedFromStart",
      "previousNode"
    );
    return null;
  }

  function expandSearchFromFinish() {
    if (queueFromFinish.length === 0) return null;
    let currentNode = queueFromFinish.shift();
    visitedNodesInOrder.push(currentNode);

    if (visitedFromStart.has(currentNode)) return currentNode;

    processNeighbors(
      currentNode,
      queueFromFinish,
      visitedFromFinish,
      "visitedFromFinish",
      "previousNodeFromFinish"
    );
    return null;
  }

  function processNeighbors(
    node,
    queue,
    visitedSet,
    visitedProp,
    previousNodeProp
  ) {
    let neighbors = getUnvisitedNeighbors(node, grid);
    for (let neighbor of neighbors) {
      if (!neighbor.isWall && !visitedSet.has(neighbor)) {
        neighbor[visitedProp] = true;
        neighbor[previousNodeProp] = node;
        visitedSet.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  function linkPath(meetingNode) {
    let cur = meetingNode;

    while (!cur.isFinish) {
      cur.previousNodeFromFinish.previousNode = cur;
      cur = cur.previousNodeFromFinish;
    }
  }
}
