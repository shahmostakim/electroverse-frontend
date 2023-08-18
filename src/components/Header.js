import React from 'react'
import { Navbar, Nav, Container, Row } from 'react-bootstrap'

function Header() {
  return (
    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" collapseOnSelect>
            <Container> 
                <a class="navbar-brand" href="/">Pro Shop</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/cart"><i className="fas fa-shopping-cart"></i> Cart</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/login"><i className="fas fa-user"></i> Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                </div>
            </Container>
        </nav>
    </header>
  )
}

export default Header
