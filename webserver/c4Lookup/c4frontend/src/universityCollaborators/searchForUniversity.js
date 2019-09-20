import React, { Component } from 'react';
import {
   Container,
   Jumbotron,
} from 'reactstrap';

import SearchForCollaboratorForm from './searchForUniversityForm';
import { connect } from 'react-redux'
import { toggleSearchForCollaborator } from '../actions/menuActions'
import { fetchCollaborators, setURL, setQueryStatement } from '../actions/searchForUnivCollaboratorActions'
import { withRouter } from "react-router";
import { isEmpty } from '../helper'
import '../App.css';
import Title from '../head'

const queryString = require('query-string');


export function buildURL(item) {
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

export function buildQueryString(item) {
   let org = item.selectedUniversities;
   let activityKeywords = item.activityKeywords;
   let topicalKeywords = item.topicalKeywords;
   var params = ""
   if (org) {
      for (let i = 0; i < org.length; i++) {
         params += 'org=' + org[i].value + '&';
      }
   }
   if (activityKeywords) {
      for (let i = 0; i < activityKeywords.length; i++) {
         params += 'keyA=' + activityKeywords[i].value + '&';
      }
   }
   if (topicalKeywords) {
      for (let i = 0; i < topicalKeywords.length; i++) {
         params += 'keyT=' + topicalKeywords[i].value + '&';
      }
   }
   params = params.substring(0, params.length - 1)
   return params;
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
         readParams : false,
         initialLoad: false
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.readParams = this.readParams.bind(this);
   }


   componentDidMount() {
      if (isEmpty(this.props.collaborators.selectedQueryStatements)) {
         this.readParams()
         
      }
      else {
         this.props.fetchCollaborators(buildURL(this.props.collaborators.selectedQueryStatements));
         this.props.history.push(`?${buildQueryString(this.props.collaborators.selectedQueryStatements)}`);
         this.setState({ readParams: true })
      }
   }

   readParams() {
      let orgsA = [];
      let aKey = [];
      let tKey = [];
      const parsed = queryString.parse(this.props.location.search);
      if (parsed.keyA) {
         let keyA = parsed.keyA;
         if (!(Array.isArray(parsed.keyA))) {
            keyA = [parsed.keyA]
         }
         keyA.map(keyID => aKey.push({ label: this.props.keywords.items[keyID].keywordName, value: keyID }))
      }
      if (parsed.keyT) {
         let keyT = parsed.keyT;
         if (!(Array.isArray(parsed.keyT))) {
            keyT = [parsed.keyT]
         }
         keyT.map(keyID => tKey.push({ label: this.props.keywords.items[keyID].keywordName, value: keyID }))
      }
      if (parsed.org) {
         let orgL = parsed.org;
         if (!(Array.isArray(orgL))) {
            orgL = [parsed.org]
         }
         orgL.map(orgID => orgsA.push({ label: this.props.orgs.items[orgID].orgNameUnique, value: orgID }))
      }
      let selectedQueryStatements = {
         activityKeywords: aKey,
         topicalKeywords: tKey,
         selectedUniversities: orgsA
      }
      this.props.setQueryStatement(selectedQueryStatements)
      this.props.fetchCollaborators(buildURL(selectedQueryStatements));
      this.setState({readParams: true})
   }

   handleSubmit = (item) => {
      if (this.props.collaborators.selectedQueryStatements === item) {
         return
      }
      this.props.setQueryStatement(item);
      this.props.history.push(`?${buildQueryString(item)}`);
      this.props.fetchCollaborators(buildURL(item));
   }

   render() {
      return (
         <>
            <Title name="Search for University Collaborator" />
            <Jumbotron fluid>
               <Container fluid>
                  <h1 className="display-3">Looking for a Collaborator?</h1>
                  <p className="lead">Use the form below to query potential collaborators.</p>
                  <hr className="my-2" />
                  {this.state.readParams ? 
                  <SearchForCollaboratorForm 
                     selectedQuery={this.props.collaborators.selectedQueryStatements}
                     submitHandler={this.handleSubmit}
                     history={this.props.history}/>: null}
               </Container>
            </Jumbotron>
         </>
      )
   }
}

const mapStateToProps = state => ({
   nav: state.nav,
   orgs: state.orgs,
   keywords: state.keywords,
   collaborators: state.collaborators,
})

const mapDispatchToProps = {
   toggleSearchForCollaborator,
   fetchCollaborators,
   setURL,
   setQueryStatement,
};

// function mapDispatchToProps(dispatch) {
//    return bindActionCreators({ toggleSearchForCollaborator, fetchCollaborators}, dispatch)
// }

SearchForCollaborator = withRouter(SearchForCollaborator);

export default connect(mapStateToProps, mapDispatchToProps)(SearchForCollaborator);