import React, { useState, useEffect } from "react";

import NorthCampus from "../photos/NorthCampus.jpg";
import SouthCampus from "../photos/SouthCampus.jpg";
import DowntownCampus from "../photos/DowntownCampus.jpg";

function CampusSelection() {
  return (
    <div className="flex justify-center gap-10 py-6">
      <CampusBox picture={NorthCampus}>
        <Classes campus="north" />
      </CampusBox>
      <CampusBox picture={SouthCampus}>
        <Classes campus="south" />
      </CampusBox>
      <CampusBox picture={DowntownCampus}>
        <Classes campus="downtown" />
      </CampusBox>
    </div>
  );
}

function CampusBox(props) {
  const picture = props.picture;
  const [displayClasses, setDisClasses] = useState(false);
  return (
    <div className="text-center">
      <button
        className="h-80 w-80"
        onClick={() => setDisClasses(!displayClasses)}
      >
        <img className="rounded-xl" src={picture} alt="specified campus" />
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
