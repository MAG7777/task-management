import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../public/images/logo.png";
import { logout } from "./../store/userAction";
import { connect } from "react-redux";

function NavBarMenu({ isLogin, logout }) {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <NavLink activeClassName="activeMenu" exact to={isLogin ? "/" : "/login"}>
          <img src={logo} alt="logo" className="logo" />
        </NavLink>
      </Navbar.Brand>
      <Nav className="mr-auto">
        {
          isLogin ?
            <NavLink
              activeClassName="activeMenu"
              exact to="/"
              style={{ textDecoration: "none" }}>
              Home
          </NavLink> :
            <>
              <NavLink
                activeClassName="activeMenu"
                exact
                to="/register" >
                Register
          </NavLink>
              <NavLink
                activeClassName="activeMenu"
                exact
                to="/login" >
                Login
              </NavLink>
            </>
        }


        <NavLink activeClassName="activeMenu" exact to="/contact">
          Contact
          </NavLink>
        <NavLink activeClassName="activeMenu" exact to="/about">
          About
          </NavLink>
      </Nav>
      {
        isLogin &&
        <Button
          onClick={logout}
          variant="success">
          Logout
        </Button>
      }
    </Navbar>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.authReducer.isLogin
  };
};

const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarMenu);