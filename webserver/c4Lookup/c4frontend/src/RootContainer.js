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
import WelcomeJumbotron from './WelcomeJumbotron';
import { fetchSettings }from './actions/settingsActions'
import { fetchKeywords }from './actions/keywordActions'
import { fetchOrganizations }from './actions/organizationActions'
import { fetchCollaborators } from './actions/searchForCollaboratorActions'



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
         <main className="App">
            <Loading body={loader} status={loadStatus} />
            <Fade>
               <DebugMessage />
               <Navigation />
               <WelcomeJumbotron />
               <TableView />
               <footer className="footer mt-auto py-3" style={{ backgroundColor: '#F8F9FA' }}>
                  <Container fluid className="clearfix">
                     <span className="text-muted float-left">Copyright {'\u00A9'} 2019 Central Coast Climate Collaborative </span>
                     <a href="https://www.centralcoastclimate.org/" className="float-right" target="_blank" rel="noopener noreferrer">Visit main website</a>
                  </Container>
               </footer>
            </Fade>
         </main>
      );
   }
}

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