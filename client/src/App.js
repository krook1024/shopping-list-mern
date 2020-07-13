import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';

import { Provider } from 'react-redux';
import store from './store';
import { Container } from 'reactstrap';
import { loadUser } from './actions/authActions';

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    });

    return (
        <div>
            <Provider store={store}>
                <AppNavbar />
                <Container className="my-3">
                    <ItemModal />
                    <ShoppingList />
                </Container>
            </Provider>
        </div>
    );
}

export default App;
