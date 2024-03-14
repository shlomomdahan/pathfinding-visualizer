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
      id={`node-${row}-${col}`} // Add the unique ID here
      className={`node ${extraClassName}`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
    ></div>
  );
};

export default Node;
