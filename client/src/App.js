import "./App.css";
import React, { useState, useEffect } from "react";
import NorthCampus from "./photos/NorthCampus.jpg";
import SouthCampus from "./photos/SouthCampus.jpg";
import DowntownCampus from "./photos/DowntownCampus.jpg";

function App() {
  const [result, setResult] = useState();

  useEffect(() => {
    fetch("/classes")
      .then((res) => res.json())
      .then((result) => {
        setResult(result["South Campus"]);
        console.log(result);
      });
  }, []);

  // MAIN REACT APP JSX

  return (
    <div>
      <Navbar />
      <CampusSelection />
    </div>
  );
}

function CampusSelection() {
  return (
    <div className="container">
      <CampusBox campus="North Campus" picture={NorthCampus} />
      <CampusBox campus="South Campus" picture={SouthCampus} />
      <CampusBox campus="Downtown Campus" picture={DowntownCampus} />
    </div>
  );
}

function CampusBox(props) {
  const campus = props.campus;
  const picture = props.picture;
  return (
    <div>
      <button>
        <img className="image" src={picture} alt="specified campus" />
        <h1 className="text">{campus}</h1>
      </button>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Find a Classroom</h1>
      <h1>University at Buffalo</h1>
    </nav>
  );
}

export default App;

// button will need an onClick that renders a new page with the corresponding campus information
// also website should eventually be able to forcast for a future time on the second page, not just on current information
// data variable: <>{result}</>
