import React from 'react'
import { Navbar, Nav, Container, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'

function Header() {

    const {cartItems} = useSelector(state=>state.cart)


  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container> 
                <LinkContainer to="/">
                    <Navbar.Brand>Electroverse Inc.</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link><i className="fas fa-shopping-cart"></i> Cart{cartItems.length>0?('('+cartItems.length+')'):''}</Nav.Link>
                        </LinkContainer> 
                        <LinkContainer to="/login">
                            <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
                
            </Container>
        </Navbar>
    </header>
  )
}

export default Header
