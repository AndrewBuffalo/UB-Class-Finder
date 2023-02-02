import React, { useState, useEffect } from "react";

import NorthCampus from "../photos/NorthCampus.jpg";
import SouthCampus from "../photos/SouthCampus.jpg";
import DowntownCampus from "../photos/DowntownCampus.jpg";

function CampusSelection() {
  return (
    <div>
      <h1 className="directions">Select a Campus</h1>;
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
    </div>
  );
}

function CampusBox(props) {
  const campus = props.campus;
  const picture = props.picture;
  const [displayClasses, setDisClasses] = useState(false);
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
  const [classes, setClasses] = useState([]);
  useEffect(
    () =>
      //`/${props.campus}`
      async () => {
        let response = await fetch(`${props.campus}`);
        response = await response.json();
        console.log(props.campus);
        setClasses(response);
      },
    []
  );
  return (
    <div>
      <ul>
        {classes.map((classe) => (
          <li>{classe}</li>
        ))}
      </ul>
    </div>
  );
}

export { CampusSelection, CampusBox, Classes };
