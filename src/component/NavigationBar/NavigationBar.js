import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";


function NavigationBar() {

    return  (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="login">Login</Nav.Link>
                    <Nav.Link href="user">User</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )

}

export default NavigationBar;
