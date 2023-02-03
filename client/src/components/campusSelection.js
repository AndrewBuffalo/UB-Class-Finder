import React, { useState, useEffect } from "react";

import NorthCampus from "../photos/NorthCampus.jpg";
import SouthCampus from "../photos/SouthCampus.jpg";
import DowntownCampus from "../photos/DowntownCampus.jpg";

import Button from "react-bootstrap/Button";

function CampusSelection() {
  return (
    <div>
      <br></br>
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
      <br></br>
    </div>
  );
}

function CampusBox(props) {
  const campus = props.campus;
  const picture = props.picture;
  const [displayClasses, setDisClasses] = useState(false);
  return (
    <div>
      <Button
        className="rounded"
        variant="outline-dark"
        onClick={() => setDisClasses(!displayClasses)}
      >
        <img className="image rounded" src={picture} alt="specified campus" />
        <h2 className="text">{campus}</h2>
      </Button>
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
