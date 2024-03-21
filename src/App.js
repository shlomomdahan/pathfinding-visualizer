import React, { useState, useEffect } from "react";
import "./App.css";
import PathfindingVisualizer from "./components/PathfindingVisualizer";
import Description from "./components/Description"; // Ensure the path is correct

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal is open by default
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Function to update the window width state
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // Use useEffect to add window resize event listener on component mount
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // You can adjust the threshold width (e.g., 768px here) as needed
  const shouldShowModal = windowWidth > 768 && isModalOpen;

  return (
    <div className="App">
      {/* Optionally, toggle modal visibility with a button
      <button onClick={() => setIsModalOpen(!isModalOpen)} className="modal-toggle">
        Help
      </button> */}
      {shouldShowModal && (
        <div className="modal">
          <Description />
        </div>
      )}
      <PathfindingVisualizer />
    </div>
  );
}

export default App;
