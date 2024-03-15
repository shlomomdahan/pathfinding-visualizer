import React from "react";
import "./Node.css";

const Node = ({
  row,
  col,
  isStart,
  isFinish,
  isVisualized,
  isPath,
  isWall,
  distance,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isPath
    ? "node-shortest-path"
    : isVisualized // Use the renamed prop here
    ? `node-visited` // Adjust this line if you have specific class names based on status
    : isWall
    ? "node-wall"
    : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
      data-distance={distance}
    ></div>
  );
};

export default Node;
