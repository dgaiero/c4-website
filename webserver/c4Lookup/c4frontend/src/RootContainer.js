import React, { Component } from 'react';
import {
   Container,
   Fade,
} from 'reactstrap';

import Loading from './Loading'
import './App.css';

import { connect } from 'react-redux';
import TableView from './TableView'
import Navigation from './Navigation'
import DebugMessage from './DebugMessage'
import { fetchSettings }from './actions/settingsActions'
import { fetchKeywords }from './actions/keywordActions'
import { fetchOrganizations }from './actions/organizationActions'
import { fetchCollaborators } from './actions/searchForCollaboratorActions'
import FrontPageCards from './indexPage';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { withRouter } from "react-router";
import StickyFooter from 'react-sticky-footer';
import { TransitionGroup, CSSTransition } from "react-transition-group";



class RootContainer extends Component {

   componentDidMount() {
      this.props.fetchSettings();
      this.props.fetchKeywords();
      this.props.fetchOrganizations();
      this.props.fetchCollaborators('/api/v1/users/?format=json');
   }

   calculateLoadingState(loader) {
      let openStatus = []
      loader.map(loadInfo => openStatus.push(loadInfo.condition, loadInfo.error !== null))
      openStatus = openStatus.every(x => x === false);
      return openStatus
   }

   render() {

      let loader = [
         { friendlyName: 'Keywords', condition: this.props.keywords.loading, error: this.props.keywords.error },
         { friendlyName: 'Organizations', condition: this.props.orgs.loading, error: this.props.orgs.error },
         { friendlyName: 'Users', condition: this.props.collaborators.loading, error: this.props.collaborators.error },
         { friendlyName: 'Settings', condition: this.props.settings.loading, error: this.props.settings.error },
      ]
      let loadStatus = this.calculateLoadingState(loader);
      return (
         <main className="App content">
            <Loading body={loader} status={loadStatus} />
                  <DebugMessage />
                  <Navigation />
                  <Route path="/" exact component={FrontPageCards} />
                  {/* <FrontPageCards /> */}
                  <Route path="/collaborator" component={TableView} />
                  {/* <TableView /> */}
         </main>
      );
   }
}

{/* <TransitionGroup>
   <CSSTransition
      key={location.key}
      timeout={{ enter: 300, exit: 300 }}
   >

   </CSSTransition>
</TransitionGroup> */}

const mapStateToProps = state => ({
   settings: state.settings,
   keywords: state.keywords,
   orgs: state.orgs,
   collaborators: state.collaborators,
})

const mapDispatchToProps = {
   fetchSettings,
   fetchKeywords,
   fetchOrganizations,
   fetchCollaborators,
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)