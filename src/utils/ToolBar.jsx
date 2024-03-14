import React from "react";
import "./ToolBar.css"; // Ensure your CSS file is set up for styling

// Button component
const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
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
const Toolbar = ({ onAction }) => {
  // Toolbar configuration, potentially fetched or modified dynamically
  const toolbarItems = [
    { type: "button", label: "Visualize", actionKey: "visualize" },
    { type: "button", label: "Clear Board", actionKey: "clearBoard" },
    {
      type: "dropdown",
      label: "Actions",
      items: [
        { label: "Print Hi", actionKey: "printHi" },
        { label: "None", actionKey: "None" },
        // Additional actions can be added here
      ],
    },
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
              />
            );
          case "dropdown":
            return (
              <DropdownMenu
                key={index}
                label={item.label}
                items={item.items}
                onActionSelect={onAction}
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
