import React from "react";
import "./weightLegend.css"; // Assume you create this CSS file

const WeightLegend = () => {
  const weightSteps = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="weight-legend">
      <h4>Weight Legend</h4>
      <div className="weight-steps">
        {weightSteps.map((weight) => (
          <div
            key={weight}
            className="weight-step"
            style={{
              backgroundColor: `hsl(0, 0%, ${100 - weight * 3}%)`, // Adjust the color based on weight
            }}
          >
            {weight}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeightLegend;
