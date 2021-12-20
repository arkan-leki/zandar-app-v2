import React from 'react'
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

const TableLayout = (props) => {
    return (
        <>
            <Navbar className="d-print-none" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">زەندەر</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="nav-link text-white" to={`/`}>ماڵەوە</Link>
                            <Link className="nav-link text-white" to={`/sales`}>فرۆشتنەکان</Link>
                            <Link className="nav-link text-white" to={`/locals`}>کڕیارەکان</Link>
                            <Link className="nav-link text-white" to={`/buy`}>داخلبونی کاڵا</Link>
                            <Link className="nav-link text-white" to={`/retail`}>دەرچووی مەخزەن</Link>
                            <Link className="nav-link text-white" to={`/items`}>کاڵاکان</Link>
                            <Link className="nav-link text-white" to={`/payments`}>پارەدانەکان</Link>

                            <NavDropdown title="گروپەکان" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/admin">More deets</Nav.Link>
                            <Nav.Link eventKey={2} href="/admin/">
                               Admin
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid>
                {props.children}
            </Container>
        </>
    )
}

export default TableLayout
