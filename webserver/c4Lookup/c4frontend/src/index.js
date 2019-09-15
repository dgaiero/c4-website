import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import Footer from './Footer'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'; 
import { Provider } from 'react-redux';

import unregisterServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

ReactDOM.render(
   [<App store={store} key={1} />, <Provider store={store} key={2} ><Footer store={store}/></Provider>], document.getElementById('root'));
unregisterServiceWorker();