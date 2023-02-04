import React, { useState, useEffect } from "react";

import NorthCampus from "../photos/NorthCampus.jpg";
import SouthCampus from "../photos/SouthCampus.jpg";
import DowntownCampus from "../photos/DowntownCampus.jpg";

function CampusSelection() {
  return (
    <div>
      <br></br>
      <p className="font-bold text-3xl text-center">Select a Campus</p>;
      <div className="flex my-8">
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
      <button
        className="hover:bg-slate-400"
        onClick={() => setDisClasses(!displayClasses)}
      >
        <img
          className="h-64 w-64 object-cover rounded-xl mx-8"
          src={picture}
          alt="specified campus"
        />
        <h2>{campus}</h2>
      </button>
      {displayClasses && props.children}
    </div>
  );
}

function Classes(props) {
  const [classes, setClasses] = useState([]);
  useEffect(
    () => async () => {
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
