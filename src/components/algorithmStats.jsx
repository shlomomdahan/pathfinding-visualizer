import React from "react";
import "./algorithmStats.css"; // Make sure the path is correct
// Optional: Import icons if you're using them

const AlgorithmStats = ({ runtime, pathCost }) => {
  return (
    <div className="algorithm-stats">
      <div className="stat-item">
        {/* Optional: Icon for runtime */}
        <div className="stat-label">Runtime</div>
        <div className="stat-value">{runtime.toFixed(2)}ms</div>
      </div>
      <div className="stat-item">
        {/* Optional: Icon for path cost */}
        <div className="stat-label">Path Cost</div>
        <div className="stat-value">{pathCost.toFixed(0)}</div>
      </div>
    </div>
  );
};

export default AlgorithmStats;
