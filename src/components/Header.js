import React from 'react'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import {logout} from '../actions/userActions'
import { useHistory } from 'react-router-dom'

function Header() {
    // fetching cart items info from state 
    const {cartItems} = useSelector(state=>state.cart)
    // fetching logged in user information from state 
    const {userInfo} = useSelector(state=>state.userLogin) 

    const dispatch = useDispatch() 
    const history = useHistory() 

    const logoutHandler = () => {
        dispatch(logout())
        history.push('/login')
    }

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
                            {/* Number of cart items are shown inside braces */}
                            <Nav.Link><i className="fas fa-shopping-cart"></i> Cart{cartItems.length>0?('('+cartItems.length+')'):''}</Nav.Link>
                        </LinkContainer> 

                        {/* Dynamic login/logout button based on user authentication status */}
                        {userInfo?(
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>My Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ):(
                            <LinkContainer to="/login">
                                <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
                            </LinkContainer>
                        )}

                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Manage' id='adminmenu'>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer> 
                            </NavDropdown>
                        )}

                    </Nav> 
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header
