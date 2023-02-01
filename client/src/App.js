import "./App.css";
import React, { useState, useEffect } from "react";
import NorthCampus from "./photos/NorthCampus.jpg";
import SouthCampus from "./photos/SouthCampus.jpg";
import DowntownCampus from "./photos/DowntownCampus.jpg";

function App() {
  //const [result, setResult] = useState();

  // useEffect(() => {
  //   fetch("/classes")
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setResult(result["South Campus"]);
  //       console.log(result);
  //     });
  // }, []);

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

      <CampusBox campus="North Campus" picture={NorthCampus}>
        <Classes campus="north" />
      </CampusBox>

      <CampusBox campus="South Campus" picture={SouthCampus}>
        <Classes campus="south" />
      </CampusBox>

      <CampusBox campus="Downtown Campus" picture={DowntownCampus}>
        <Classes campus="downtown" />
      </CampusBox>
    </div>
  );
}

function CampusBox(props) {
  const campus = props.campus;
  const picture = props.picture;
  const [displayClasses, setDisClasses] = useState(false)
  return (
    <div>
      <button className="button" onClick={() => setDisClasses(!displayClasses)}>
        <img className="image" src={picture} alt="specified campus" />
        <h1 className="text">{campus}</h1>
      </button>
      {displayClasses && props.children}
    </div>
  );
}

function Classes(props) {
  const [classes, setClasses] = useState([])
  useEffect(() => //`/${props.campus}`
  (async () => {
    let response = await fetch(`${props.campus}`)
    response = await response.json()
    console.log(props.campus)
    setClasses(response)
  }), []);
  return (
    <div>
      <ul>
        {
          classes.map(classe => (
            <li>{classe}</li>
          ))}
      </ul>
    </div>
  )
}
export default App;
