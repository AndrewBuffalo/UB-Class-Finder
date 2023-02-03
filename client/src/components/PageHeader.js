import React from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function PageHeader() {
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand classname="NavbarBrand">Find a Classroom</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default PageHeader;
