import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

import { applyMiddleware, createStore } from 'redux'

import App from './App';
import Footer from './Footer'
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk';

const middleware = [
   thunk,
];

const composeEnhancers = composeWithDevTools({
   trace: true,
   traceLimit: 55,
})

const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
   applyMiddleware(...middleware),
));

ReactDOM.render(
   [<App store={store} key={1} />, <Provider store={store} key={2} ><Footer store={store}/></Provider>], document.getElementById('root'));
registerServiceWorker();