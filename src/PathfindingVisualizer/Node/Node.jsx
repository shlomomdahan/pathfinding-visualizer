import React from "react";
import "./Node.css";

const Node = ({
  isStart,
  isFinish,
  isVisited,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isVisited
    ? "node-visited"
    : isWall
    ? "node-wall"
    : "";

  return (
    <div
      className={`node ${extraClassName}`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
    ></div>
  );
};

export default Node;
