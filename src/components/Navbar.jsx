import React from "react";
import { Container, Navbar, Nav, Image } from "react-bootstrap";
import incognito from "../assets/hacker.png";

export default function NavBar() {
  return (
    <>
      <Container className="navContainer">
        <Navbar expand="lg" className="darkBg navbar-dark mx-2">
          <Container className="darkBgBranding mx-auto">
            <Image src={incognito} className="brandImg d-inline" />
            <Navbar.Brand href="#home" className="darkBgText">
              <p className="d-inline brandText">&lt; Yash Wadhvani &gt;</p>
            </Navbar.Brand>
          </Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                href="/"
                className="darkBgText hover-underline-animation"
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#about"
                className="darkBgText hover-underline-animation"
              >
                About Me
              </Nav.Link>
              <Nav.Link
                href="#projects"
                className="darkBgText hover-underline-animation"
              >
                Projects
              </Nav.Link>
              <Nav.Link
                href="#contact"
                className="darkBgText hover-underline-animation"
              >
                Contact Me
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </>
  );
}
