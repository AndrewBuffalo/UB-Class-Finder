import React, { useState, useEffect } from "react";

import NorthCampus from "../photos/NorthCampus.jpg";
import SouthCampus from "../photos/SouthCampus.jpg";
import DowntownCampus from "../photos/DowntownCampus.jpg";

function Home() {
  return (
    <div className="text-center py-8">
      <p className="text-5xl py-2 text-blue-600 font-medium">Select a Campus</p>
      <p className="text-md text-gray-800 py-2">
        Find an open classroom to study in.
      </p>
      <CampusSelection />
    </div>
  );
}

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
    <div>
      <button
        className="lg:h-80 lg:w-80"
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
      let response = await fetch(`/api/${props.campus}`);
      response = await response.json();
      console.log(props.campus);
      setClasses(response);
    },
    []
  );
  return (
    <div className="border-2 border-black rounded-xl py-4 text-lg">
      <ul>
        {classes.map((classe) => (
          <li className="font-medium">{classe}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
export { CampusSelection, CampusBox, Classes };
