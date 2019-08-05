import React, { Component } from 'react';
import './App.css';

import { Provider } from 'react-redux';
import PropTypes from 'prop-types'
import RootContainer from './RootContainer'; 
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App = ({ store }) => (
         <Provider store={store}>
            <Router>
               <Route path="/:filter?" component={RootContainer} />
               {/* <Route path="/" render={() => (<h1>404</h1>)} /> */}
               {/* <RootContainer /> */}
            </Router>
         </Provider>
      );


App.propTypes = {
   store: PropTypes.object.isRequired
}

export default App;