import React from 'react';
import useToggle from '../util/useToggle';
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
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function AppNavbar(props) {
    const [isOpen, isOpenToggle] = useToggle({ defaultValue: false });
    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">mern-shopping-list</NavbarBrand>
                <NavbarToggler onClick={isOpenToggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                        {props.auth.isAuthenticated ? (
                            <NavItem>
                                <Logout />
                            </NavItem>
                        ) : (
                            <>
                                <NavItem>
                                    <RegisterModal />
                                </NavItem>
                                <NavItem>
                                    <LoginModal />
                                </NavItem>
                            </>
                        )}
                    </Nav>
                    <Nav navbar className="ml-auto">
                        <NavbarText>created by krook1024</NavbarText>
                        <NavItem>
                            <NavLink href="https://github.com/krook1024/shopping-list-mern">
                                GitHub
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

AppNavbar.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, {})(AppNavbar);
