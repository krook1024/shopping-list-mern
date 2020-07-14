// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    NavLink,
    Alert,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useInput from '../../util/useInput';
import useToggle from '../../util/useToggle';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

function RegisterModal(props) {
    const [name, nameInput] = useInput({
        type: 'text',
        placeholder: 'Your name',
        id: 'name',
    });
    const [email, emailInput] = useInput({
        type: 'text',
        placeholder: 'Your e-mail address',
        id: 'email',
    });
    const [password, passwordInput] = useInput({
        type: 'password',
        placeholder: 'Your password',
        id: 'password',
    });

    const [modal, toggleModal] = useToggle({
        extraFunc: () => {
            props.clearErrors();
        },
    });
    const [message, setMessage] = useState(null);

    const onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name,
            email,
            password,
        };

        props.register(newUser);
    };

    useEffect(() => {
        const error = props.error;
        // Check for register error
        if (error.id === 'REGISTER_FAIL') {
            setMessage(error.msg.message);
        } else {
            setMessage('');
        }
    }, [props.error]);

    useEffect(() => {
        // close modal if authenticated
        if (modal) {
            if (props.isAuthenticated) {
                toggleModal();
            }
        }
    }, [modal, props.isAuthenticated, toggleModal]);

    return (
        <>
            <NavLink
                onClick={props.isAuthenticated ? null : toggleModal}
                href="#"
                color="dark"
            >
                Register
            </NavLink>

            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Register</ModalHeader>
                <ModalBody>
                    {message ? <Alert color="danger">{message}</Alert> : ''}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            {nameInput}
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            {emailInput}
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            {passwordInput}
                        </FormGroup>
                        <Button color="dark" block>
                            Register
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
}

RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(
    RegisterModal
);
