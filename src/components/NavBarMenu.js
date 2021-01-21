import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../public/images/logo.png";

export default function NavBarMenu() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <NavLink activeClassName="activeMenu" exact to="/">
          <img src={logo} alt="logo" className="logo" />
        </NavLink>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav>
          <NavLink activeClassName="activeMenu" exact to="/" style={{textDecoration:"none"}}>
            Home
          </NavLink>

          <NavLink activeClassName="activeMenu" exact to="/task">
            Task
          </NavLink>
        </Nav>
      </Nav>
    </Navbar>
  );
}
