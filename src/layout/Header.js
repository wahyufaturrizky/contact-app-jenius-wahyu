//TODO: DONE set NavbarBrand to go to home page and export Header

import React from "react";
import { Navbar, NavbarBrand, NavbarText } from "reactstrap";

const Header = () => {
  return (
    <Navbar className="nav">
      <NavbarBrand
        onClick={() => window.open("https://www.linkedin.com/in/wahyu-fatur-rizky/", "_blank")}
        className="text-white navbrand"
        style={{
          cursor: "pointer",
        }}
      >
        WAHYU Contact App
      </NavbarBrand>
      <NavbarText
        onClick={() => window.open("https://www.linkedin.com/in/wahyu-fatur-rizky/", "_blank")}
        className="text-white float-right navtxt"
        style={{
          cursor: "pointer",
        }}
      >
        Contact app by Wahyu
      </NavbarText>
    </Navbar>
  );
};

export default Header;
