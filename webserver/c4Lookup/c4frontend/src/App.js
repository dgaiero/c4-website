import React, { Component } from 'react';
import './App.css';

import { createStore, applyMiddleware } from 'redux'
import {Provider } from 'react-redux';
import RootContainer from './RootContainer'; 
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'; 

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

class App extends Component {

   render() {
      return (
         <Provider store={store}>
            <RootContainer />
         </Provider>
      );
   }
}
export default App;