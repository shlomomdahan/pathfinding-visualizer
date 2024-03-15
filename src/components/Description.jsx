import React, { useState } from "react";
import "./Description.css";

const Description = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3; // Three sections for simplicity

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const closeModal = () => {
    setCurrentPage(1);
    document.querySelector(".modal").style.display = "none";
  };

  return (
    <div className="details-container">
      <div className="close-button" onClick={closeModal}>
        &times;
      </div>
      {currentPage === 1 && (
        <div className="intro-page">
          <h2>Welcome to Pathfinder!</h2>
          <p>This quick guide will help you get started:</p>
          <ul>
            <li>
              <span className="start">Start Node</span>: Click and drag the
              green node to set the start position.
            </li>
            <li>
              <span className="finish">Finish Node</span>: Click and drag the
              red node to set the finish position.
            </li>
            <li>
              <span className="wall">Add Wall</span>: Click on a node to create
              a wall.
            </li>
            <li>
              <span className="shift">Add Weight</span>: Hold the Shift key and
              click on a node to add weight
            </li>
          </ul>
          <p>
            Select an algorithm and a maze type from the dropdowns and click
            "Visualize" to see the algorithm in action! You can also clear the
            board or generate a new random maze using the "Clear Board" button.
          </p>
          <p>
            Pay attention to how long each algorithm takes and how much it
            costs!
          </p>
        </div>
      )}
      {currentPage === 2 && (
        <div className="algorithm-details">
          <h2>Algorithm Details</h2>
          <div className="algorithm">
            <h3>Dijkstra</h3>
            <p>
              Dijkstra's algorithm, conceived by computer scientist Edsger
              Dijkstra in 1956, is a graph search algorithm that solves the
              single-source shortest path problem for a graph with non-negative
              edge weights, producing a shortest path tree.
            </p>
          </div>
          <div className="algorithm">
            <h3>A*</h3>
            <p>
              A* is a computer algorithm that is widely used in pathfinding and
              graph traversal. It is an extension of Dijkstra's algorithm with
              heuristic methods to improve performance and find the shortest
              path between nodes efficiently.
            </p>
          </div>
          <div className="algorithm">
            <h3>Breadth First Search (BFS)</h3>
            <p>
              Breadth First Search is an algorithm used for traversing or
              searching tree or graph data structures. It starts at the tree
              root (or some arbitrary node of a graph), and explores all of the
              neighbor nodes at the present depth prior to moving on to the
              nodes at the next depth level.
            </p>
          </div>
          <div className="algorithm">
            <h3>Depth First Search (DFS)</h3>
            <p>
              Depth First Search is an algorithm for traversing or searching
              tree or graph data structures. The algorithm starts at the root
              node and explores as far as possible along each branch before
              backtracking.
            </p>
          </div>
        </div>
      )}

      {currentPage === 3 && (
        <div className="maze-details">
          <h2>Maze Type Details</h2>
          <div className="maze-type">
            <h3>Random Maze</h3>
            <p>
              A random maze is a maze generated randomly, often used for testing
              pathfinding algorithms. It consists of walls and open passages
              arranged in a randomized pattern.
            </p>
          </div>
          <div className="maze-type">
            <h3>Recursive Division Maze</h3>
            <p>
              Recursive division maze generation is a method of generating mazes
              by recursively dividing a region into smaller sections and
              creating walls between them. It often results in maze structures
              with interesting patterns.
            </p>
          </div>
          <div className="maze-type">
            <h3>Weighted Maze</h3>
            <p>
              A weighted maze is a maze where each cell has a weight associated
              with it. These weights can represent the cost of moving through
              the cell and are used in pathfinding algorithms to find the most
              efficient path.
            </p>
          </div>
        </div>
      )}
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Description;
