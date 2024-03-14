import React, { useState, useEffect } from "react";
import "./App.css";
import PathfindingVisualizer from "./PathfindingVisualizer/PathfindingVisualizer";

function App() {
  // Increase the threshold here, for example, to 1024 pixels
  const [isFullScreenRecommended, setIsFullScreenRecommended] = useState(
    window.innerWidth > 1400
  );

  useEffect(() => {
    const handleResize = () => {
      setIsFullScreenRecommended(window.innerWidth > 1400); // Update here too
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="App">
      {!isFullScreenRecommended ? (
        <div className="fullScreenMessage">
          This app is meant to be used in full screen. Please increase the
          window size until this message disappears.
        </div>
      ) : (
        <PathfindingVisualizer />
      )}
    </div>
  );
}

export default App;
