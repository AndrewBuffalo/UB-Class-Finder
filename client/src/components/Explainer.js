import React from "react";
import { Alert } from "react-bootstrap";

function Explainer() {
  return (
    <div>
      <Alert variant="success">
        <Alert.Heading>So, how does this work?</Alert.Heading>
        <p>
          Find a Classroom, an independent and student created tool, performs a
          comprehensive search of the University at Buffalo's course catalog by
          scanning information on the location and scheduling of classes. Please
          note that this tool does not include any private or non-public events,
          such as club meetings or office hours.
        </p>
        <hr />
        <p className="mb-0">Latest Release: February 2, 2023</p>
      </Alert>
    </div>
  );
}

export default Explainer;
