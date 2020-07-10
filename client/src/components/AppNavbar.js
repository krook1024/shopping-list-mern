import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
} from 'reactstrap';

export default function AppNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => { setIsOpen(!isOpen) };
    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">mern-shopping-list</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavbarText>created by krook1024</NavbarText>
                        <NavItem>
                            <NavLink href="https://github.com/krook1024/shopping-list-mern">GitHub</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}
