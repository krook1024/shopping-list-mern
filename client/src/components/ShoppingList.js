import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, addItem, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
    componentWillMount() {
        this.props.getItems();
    }

    render() {
        return (
            <Container className="my-3">
                <Button
                    color="dark"
                    size="sm"
                    className="mb-3"
                    onClick={
                        () => {
                            const name = prompt('Enter item');
                            if (name) {
                                this.props.addItem({
                                    name
                                });
                            }
                        }
                    }
                >
                    Add Item
            </Button>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {
                            this.props.item.items.map(({ id, name }) => (
                                <CSSTransition key={name} timeout={500} classNames="fade">
                                    <ListGroupItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>{name}</span>
                                        <Button
                                            className="remove-btn"
                                            color="danger"
                                            onClick={() => {
                                                this.props.deleteItem(id);
                                            }}
                                        >
                                            &times;
                                    </Button>
                                    </ListGroupItem>
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    item: state.item
});

export default connect(mapStateToProps, { getItems, addItem, deleteItem })(ShoppingList);