import React from 'react';
import { logout } from '../../actions/authActions';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

function Logout(props) {
    return (
        <>
            <NavLink href="#" onClick={props.logout}>
                Logout
            </NavLink>
        </>
    );
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Logout);
