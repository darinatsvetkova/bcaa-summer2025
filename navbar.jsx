// src/navbar.jsx

import { Navbar, Container } from "react-bootstrap";

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Travel Planner</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
