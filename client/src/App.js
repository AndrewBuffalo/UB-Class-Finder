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

  // good morning andrew :)
  // honestly the CSS took me 80% of the time and it was so annoying lol
  // i just put the directions component there for fun (for now)
  // feature idea: website could be able to forcast available classrooms for a future time, not just based on current time
  // bookmarked data variable: <>{result}</>

  return (
    <div>
      <Directions />
      <CampusSelection />
    </div>
  );
}

function Directions() {
  return <h1 className="directions">Select a Campus</h1>;
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
      <button className="button">
        <img className="image" src={picture} alt="specified campus" />
        <h1 className="text">{campus}</h1>
      </button>
    </div>
  );
}

export default App;
