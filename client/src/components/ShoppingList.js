import React, { useEffect } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

function ShoppingList(props) {
    const { getItems } = props;
    useEffect(() => {
        getItems();
    }, [getItems]);

    return (
        <ListGroup>
            <TransitionGroup className="shopping-list">
                {props.item.items.map(({ _id, name }) => (
                    <CSSTransition key={_id} timeout={500} classNames="fade">
                        <ListGroupItem
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span>{name}</span>
                            {props.isAuthenticated ? (
                                <Button
                                    className="remove-btn"
                                    color="danger"
                                    onClick={() => props.deleteItem(_id)}
                                >
                                    &times;
                                </Button>
                            ) : (
                                ''
                            )}
                        </ListGroupItem>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ListGroup>
    );
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
