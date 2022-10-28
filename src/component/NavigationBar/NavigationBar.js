import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useAuthContext } from "../../hooks/useAuthContext"


function NavigationBar() {

    const { user } = useAuthContext();

    return  (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                {user && <Nav.Link href="/">Home</Nav.Link>}
                {user && <Nav.Link href="users">Users</Nav.Link>}
                {user && <Nav.Link href="products">Products</Nav.Link>}
                </Nav>
                <Nav>
                {user && <Nav.Link>Welcome, {user.username} !</Nav.Link>}
                {user && <Nav.Link href="logout">Sign out</Nav.Link>}
                {!user && <Nav.Link href="login">Sign in</Nav.Link>}
                </Nav>
            </Container>
        </Navbar>
    )

}

export default NavigationBar;
