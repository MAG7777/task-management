import React from "react";
import { Navbar, Nav, FormControl, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBarMenu() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/">Home</Link>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav>
          <Link to="/task">Task</Link>
        </Nav>
      </Nav>
      {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form> */}
    </Navbar>
  );
}
