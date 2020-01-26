import './App.css';

import { Route, Router } from 'react-router-dom'

import PropTypes from 'prop-types'
import { Provider } from 'react-redux';
import React from 'react';
import ReactGA from 'react-ga';
import RootContainer from './RootContainer';
import { createBrowserHistory } from 'history';

const trackingId = "UA-156443950-1";
ReactGA.initialize(trackingId);
ReactGA.pageview(window.location.pathname + window.location.search);

const history = createBrowserHistory();

// Initialize google analytics page view tracking
history.listen(location => {
   ReactGA.set({ page: location.pathname }); // Update the user's current page
   ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

const App = ({ store }) => (
   <Provider store={store}>
      <Router history={history}>
         <Route path="/:filter?" component={RootContainer} />
      </Router>
   </Provider>
);


App.propTypes = {
   store: PropTypes.object.isRequired
}

export default App;