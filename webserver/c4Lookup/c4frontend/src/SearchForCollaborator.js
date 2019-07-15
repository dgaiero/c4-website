import React, { Component } from 'react';
import {
   NavLink,
} from 'reactstrap';

import FourCMemberSearchModal from './FourCMemberModal';
import { connect } from 'react-redux'
import { toggleSearchForCollaborator } from './actions/menuActions'
import { fetchCollaborators } from './actions/searchForCollaboratorActions'
import './App.css';


function buildURL(item) {
   let org = item.selectedUniversities;
   let activityKeywords = item.activityKeywords;
   let topicalKeywords = item.topicalKeywords;
   var url = "/api/v1/users/?format=json";
   if (org) {
      for (let i = 0; i < org.length; i++) {
         url += '&organization=' + org[i].value;
      }
   }
   if (activityKeywords) {
      for (let i = 0; i < activityKeywords.length; i++) {
         url += '&keywords=' + activityKeywords[i].value;
      }
   }
   if (topicalKeywords) {
      for (let i = 0; i < topicalKeywords.length; i++) {
         url += '&keywords=' + topicalKeywords[i].value;
      }
   }
   return url;

}

class SearchForCollaborator extends Component {
   constructor(props) {
      super(props);
      this.state = {
         'selectedQueryStatements': {
            activityKeywords: [],

            topicalKeywords: [],

            selectedUniversities: [],
         },
      };
      this.handleSubmit = this.handleSubmit.bind(this);


   }

   handleSubmit = item => {
      this.setState({ selectedQueryStatements: item });
      this.props.fetchCollaborators(buildURL(item));
      this.props.toggleSearchForCollaborator()
   }

   render() {
      return (
         <>
            <NavLink href="#0" onClick={() => this.props.toggleSearchForCollaborator()}>Looking for a Collaborator?</NavLink>
            <FourCMemberSearchModal
               openStatus={this.props.nav.searchForCollaborator}
               selectedQuery={this.state.selectedQueryStatements}
               toggle={() => this.props.toggleSearchForCollaborator()}
               submitHandler={this.handleSubmit}
            />
         </>
      )
   }
}

const mapStateToProps = state => ({
   nav: state.nav,
})

const mapDispatchToProps = {
   toggleSearchForCollaborator,
   fetchCollaborators,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForCollaborator);