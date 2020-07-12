import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
    state = {
        modal: false, // the modal is open or not
        name: ''
    };

    toggle = () => {
        this.setState({
            ...this.state,
            modal: !this.state.modal
        })
    }

    onChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();

        this.props.addItem(this.state.name);

        // Close the modal
        this.toggle();
    }

    render() {
        return (
            <div>
                <Button
                    color="dark"
                    className="mb-3"
                    onClick={this.toggle}>
                    Add Item
                </Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >   
                    <ModalHeader toggle={this.toggle}>Add Item</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Add shopping item"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <Button
                                color="dark"
                                block
                            >
                                Add Item
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

ItemModal.propTypes = {
    addItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    item: state.item
});

export default connect(mapStateToProps, { addItem })(ItemModal);