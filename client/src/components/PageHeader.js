import React from "react";
import { Navbar, Container } from "react-bootstrap";

function PageHeader() {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container className="d-flex h-100 align-items-center">
        <Navbar.Brand className="navbar-brand">Find a Classroom</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default PageHeader;
