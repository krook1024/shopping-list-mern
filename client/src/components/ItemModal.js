import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../actions/itemActions';
import useInput from '../util/useInput';
import useToggle from '../util/useToggle';

function ItemModal(props) {
    const [name, nameInput, setName] = useInput({
        type: 'text',
        placeholder: 'Add shopping item',
        id: 'item',
    });
    const [modal, toggleModal] = useToggle({});

    const onSubmit = e => {
        e.preventDefault();

        props.addItem(name);

        setName('');

        // Close the modal
        toggleModal();
    };

    return (
        <div>
            <Button color="dark" className="mb-3" onClick={toggleModal}>
                Add Item
            </Button>

            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Add Item</ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="item">Item</Label>
                            {nameInput}
                        </FormGroup>
                        <Button color="dark" block>
                            Add Item
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

ItemModal.propTypes = {
    addItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    item: state.item,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
