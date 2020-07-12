import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';

import { Provider } from 'react-redux';
import store from './store';
import { Container } from 'reactstrap';

function App() {
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
