import './App.css';

import { Route, BrowserRouter as Router } from 'react-router-dom'

import PropTypes from 'prop-types'
import { Provider } from 'react-redux';
import React from 'react';
import RootContainer from './RootContainer';

const App = ({ store }) => (
   <Provider store={store}>
      <Router>
         <Route path="/:filter?" component={RootContainer} />
      </Router>
   </Provider>
);


App.propTypes = {
   store: PropTypes.object.isRequired
}

export default App;