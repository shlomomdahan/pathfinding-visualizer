import React, { useState, useEffect } from "react";
import "./App.css";
import PathfindingVisualizer from "./components/PathfindingVisualizer";
import Description from "./components/Description"; // Ensure the path is correct
import Modal from "react-modal";
Modal.setAppElement("#root"); // Assuming your app root element has the id 'root'

function App() {
  const [isFullScreenRecommended, setIsFullScreenRecommended] = useState(
    window.innerWidth > 1400
  );
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal is open by default

  useEffect(() => {
    const handleResize = () => {
      setIsFullScreenRecommended(window.innerWidth > 1400);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen); // Function to toggle modal visibility

  return (
    <div className="App">
      {isFullScreenRecommended ? (
        <>
          <button onClick={toggleModal} className="modal-toggle">
            Help
          </button>
          {isModalOpen && (
            <div className="modal">
              <Description />
            </div>
          )}
          <PathfindingVisualizer />
        </>
      ) : (
        <div className="fullScreenMessage">
          This app is meant to be used in full screen. Please increase the
          window size until this message disappears.
        </div>
      )}
    </div>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import "./App.css";
// import PathfindingVisualizer from "./components/PathfindingVisualizer";

// function App() {
//   // Increase the threshold here, for example, to 1024 pixels
//   const [isFullScreenRecommended, setIsFullScreenRecommended] = useState(
//     window.innerWidth > 1400
//   );

//   useEffect(() => {
//     const handleResize = () => {
//       setIsFullScreenRecommended(window.innerWidth > 1400); // Update here too
//     };

//     window.addEventListener("resize", handleResize);

//     // Clean up the event listener on component unmount
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="App">
//       {!isFullScreenRecommended ? (
//         <div className="fullScreenMessage">
//           This app is meant to be used in full screen. Please increase the
//           window size until this message disappears.
//         </div>
//       ) : (
//         <PathfindingVisualizer />
//       )}
//     </div>
//   );
// }

// export default App;
