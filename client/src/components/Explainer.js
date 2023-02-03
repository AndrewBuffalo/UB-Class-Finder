import React from "react";
import Alert from "react-bootstrap/Alert";

function Explainer() {
  return (
    <div className="container">
      <Alert className="rounded" variant="secondary">
        <Alert.Heading>So, how does this work?</Alert.Heading>
        <p>
          Find a Classroom is the perfect solution for University at Buffalo
          students who are looking for an available classroom to study in. With
          just a few clicks, this platform scans a database of UB classes and
          provides up-to-date info on the location and scheduling of classrooms.
          But, keep in mind that it doesn't include private events like office
          hours or club meetings. And, if someone else has already used the site
          to book a study spot, that classroom might not be available. But
          overall, Find a Classroom makes it super easy to find a great study
          spot!
        </p>
        <hr />
        <p className="mb-0">Version 1.0: February 3, 2023</p>
      </Alert>
    </div>
  );
}

export default Explainer;
