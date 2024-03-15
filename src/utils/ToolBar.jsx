import React from "react";
import "./ToolBar.css"; // Ensure your CSS file is set up for styling

// Button component
const Button = ({ label, onClick, className }) => (
  <button className={`button ${className}`} onClick={onClick}>
    {label}
  </button>
);

// DropdownMenu component
const DropdownMenu = ({ label, items, onActionSelect }) => (
  <div className="dropdown">
    <button className="dropbtn">{label}</button>
    <div className="dropdown-content">
      {items.map((item, index) => (
        <a
          key={index}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onActionSelect(item.actionKey);
          }}
        >
          {item.label}
        </a>
      ))}
    </div>
  </div>
);

// Toolbar component accepting onAction as a prop for handling action selection
const Toolbar = ({
  onAction,
  selectedAlgorithm,
  algorithmItems,
  mazeItems,
  isWeightedGraph,
}) => {
  // Toolbar configuration, potentially fetched or modified dynamically
  let toolbarItems = [
    {
      type: "button",
      label: `Visualize ${selectedAlgorithm}`,
      actionKey: "visualize",
      className: "visualize-button",
    },
    {
      type: "button",
      label: "Clear Board",
      actionKey: "clearBoard",
      className: "clear-board-button",
    },
    {
      type: "dropdown",
      label: "Mazes",
      items: mazeItems,
      className: "maze-dropdown",
    },
    {
      type: "dropdown",
      label: "Select Algorithm",
      items: algorithmItems,
      className: "algorithm-dropdown",
    },

    // {
    //   type: "button",
    //   label: isWeightedGraph
    //     ? "Disable Weighted Graph"
    //     : "Enable Weighted Graph",
    //   actionKey: "toggleWeightedGraph",
    //   className: isWeightedGraph
    //     ? "weighted-graph-button"
    //     : "unweighted-graph-button",
    // },
  ];

  return (
    <div className="toolbar">
      {toolbarItems.map((item, index) => {
        switch (item.type) {
          case "button":
            return (
              <Button
                key={index}
                label={item.label}
                onClick={() => onAction(item.actionKey)}
                className={item.className}
              />
            );
          case "dropdown":
            return (
              <DropdownMenu
                key={index}
                label={item.label}
                items={item.items}
                onActionSelect={(actionKey) => {
                  onAction(actionKey);
                }}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Toolbar;
