import './App.css';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import C4TableView from './4CCollaborators/TableView';
import TableView from './Collaborators/TableView';
// import ComingSoon from './ComingSoon'
import FrontPageCards from './indexPage';
import Loader from './loader';
import Loading from './Loading'
import Navigation from './Navigation'
import NotFound from './404'
import UnivTableView from './universityCollaborators/TableView'
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchSettings } from './actions/settingsActions'

import ParseSaveQuery from './ParseSaveQuery'
// import DebugMessage from './DebugMessage'


axios.defaults.baseURL = "https://api.centralcoastclimate.org"
// axios.defaults.baseURL = "http://192.168.86.218:8000"

class RootContainer extends Component {

   componentDidMount() {
      this.props.fetchSettings();
   }

   render() {
      let loader = [
         { friendlyName: 'Settings', condition: this.props.settings.loading, error: this.props.settings.error },
      ]
      let loadStatus = Loader.calculateLoadingState(loader);
      return (
         <main className="App content">
            <Loading body={loader} status={loadStatus} />
            {/* <DebugMessage /> */}
            <Navigation />
            <Switch>
               <Route path="/" exact component={FrontPageCards} />
               <Route path="/save/:id?" component={ParseSaveQuery} />
               <Route path="/univCollaborator/" exact component={UnivTableView} />
               <Route path="/4CCollaborator/" exact component={C4TableView} />
               <Route path="/Collaborator" exact component={TableView} />
               <Route component={NotFound} status={404} />
            </Switch>
         </main>
      );
   }
}

const mapStateToProps = state => ({
   settings: state.settings,
   orgCollaborators: state.C4Collaborators,
   univCollaborators: state.univCollaborators,
   collaborators: state.collaborators,
})

const mapDispatchToProps = {
   fetchSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)