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

                            <NavDropdown title="زیاتر" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/groups/">بنکەکان</NavDropdown.Item>
                                <NavDropdown.Item href="/regions/">ناوچەکان</NavDropdown.Item>
                                <NavDropdown.Item href="/visitors/">فرۆشیارەکان</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="/settings/">رێخستنەکان</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/api/">API</Nav.Link>
                            <Nav.Link eventKey={2} href="/admin/">
                               بەڕێوەبەر
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
