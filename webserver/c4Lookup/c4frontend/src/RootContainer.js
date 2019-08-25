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
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ParseSaveQuery } from './universityCollaborators/parseSaveQuery'
import { withRouter } from "react-router";
import StickyFooter from 'react-sticky-footer';
import { TransitionGroup, CSSTransition } from "react-transition-group";
// import Loader from './Loading';
import logo from './logo'

import NotFound from './404'
import axios from 'axios';

axios.defaults.baseURL = "https://api.centralcoastclimate.org"
// axios.defaults.baseURL = "localhost:8000"

class RootContainer extends Component {

   componentDidMount() {
      this.props.fetchSettings();
      // this.props.fetchCollaborators('/api/v1/users/?format=json');
   }

   calculateLoadingState(loader) {
      let openStatus = []
      loader.map(loadInfo => openStatus.push(loadInfo.condition, loadInfo.error !== null))
      openStatus = openStatus.every(x => x === false);
      return openStatus
   }

   render() {
      // Loader.addLoadItem('settings', { friendlyName: 'Settings', condition: this.props.settings.loading, error: this.props.settings.error });

      // Loader.addLoadItem('users', { friendlyName: 'Users', condition: this.props.collaborators.loading, error: this.props.collaborators.error })
      // Loader.calculateLoadingState();
      // console.log("test")
      let loader = [
         
         { friendlyName: 'Settings', condition: this.props.settings.loading, error: this.props.settings.error },
         { friendlyName: 'Keywords', condition: this.props.keywords.loading, error: this.props.keywords.error },
         { friendlyName: 'Organizations', condition: this.props.orgs.loading, error: this.props.orgs.error },
         { friendlyName: 'Users', condition: this.props.collaborators.loading, error: this.props.collaborators.error },
      ]
      // loader.push({ friendlyName: 'Keywords', condition: this.props.keywords.loading, error: this.props.keywords.error })
      // loader.push({ friendlyName: 'Organizations', condition: this.props.orgs.loading, error: this.props.orgs.error })
      // loader.push({ friendlyName: 'Users', condition: this.props.collaborators.loading, error: this.props.collaborators.error })
      // console.log(Loader.getLoadingItems())
      let loadStatus = this.calculateLoadingState(loader);
      // console.log(loadStatus)
      return (
         <main className="App content">
            {/* {Loader.calculateLoadingState()} */}
            <Loading body={loader} status={loadStatus} />
            {logo}
                  <DebugMessage />
                  <Navigation />
                  <Switch>
                     <Route path="/" exact component={FrontPageCards} />
                     {/* <FrontPageCards /> */}
                     <Route path="/collaborator/save/:id?" component={ParseSaveQuery} />
                     <Route path="/collaborator/" exact component={TableView} />
                     <Route component={NotFound} status={404}/>
                  </Switch>
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
   collaborators: state.collaborators
})

const mapDispatchToProps = {
   fetchSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)