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
  weight,
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
    : isVisualized
    ? "node-visited"
    : isWall
    ? "node-wall"
    : "";

  const maxWeight = 20;
  const minGreyValue = 255; // White
  const maxGreyValue = 200; // Light grey, adjust this value for darker shades if needed

  const greyDecreasePerWeight = (minGreyValue - maxGreyValue) / (maxWeight - 1);

  const greyValue = Math.max(
    minGreyValue - (weight - 1) * greyDecreasePerWeight,
    0
  );
  const backgroundColor = `rgb(${greyValue}, ${greyValue}, ${greyValue})`;

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
      data-distance={distance}
      data-weight={weight}
      style={{
        backgroundColor:
          !isStart && !isFinish && !isWall ? backgroundColor : "",
      }}
    ></div>
  );
};

export default Node;

// const Node = ({
//   row,
//   col,
//   isStart,
//   isFinish,
//   isVisualized,
//   isPath,
//   isWall,
//   weight,
//   distance,
//   onMouseDown,
//   onMouseEnter,
//   onMouseUp,
// }) => {
//   const extraClassName = isFinish
//     ? "node-finish"
//     : isStart
//     ? "node-start"
//     : isPath
//     ? "node-shortest-path"
//     : isVisualized // Use the renamed prop here
//     ? `node-visited` // Adjust this line if you have specific class names based on status
//     : isWall
//     ? "node-wall"
//     : "";

//   return (
//     <div
//       id={`node-${row}-${col}`}
//       className={`node ${extraClassName}`}
//       onMouseDown={onMouseDown}
//       onMouseEnter={onMouseEnter}
//       onMouseUp={onMouseUp}
//       data-distance={distance}
//       data-weight={weight}
//     ></div>
//   );
// };

// export default Node;
