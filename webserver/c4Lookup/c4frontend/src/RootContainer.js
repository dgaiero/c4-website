import React, { Component } from 'react';
import Loading from './Loading'
import './App.css';
import { connect } from 'react-redux';
import TableView from './universityCollaborators/TableView'
import Navigation from './Navigation'
import DebugMessage from './DebugMessage'
import { fetchSettings }from './actions/settingsActions'
import FrontPageCards from './indexPage';
import { Route, Switch } from 'react-router-dom'
import ParseSaveQuery from './ParseSaveQuery'
import Loader from './loader';
import NotFound from './404'
import ComingSoon from './ComingSoon'
import axios from 'axios';

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
                  <DebugMessage />
                  <Navigation />
                  <Switch>
                     <Route path="/" exact component={FrontPageCards} />
                     <Route path="/save/:id?" component={ParseSaveQuery} />
                     <Route path="/univCollaborator/" exact component={TableView} />
                     <Route path="/govNGOCollaborator/" exact component={ComingSoon} />
                     <Route component={NotFound} status={404}/>
                  </Switch>
         </main>
      );
   }
}

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