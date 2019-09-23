import React, { Component } from 'react';
import {
   Container,
   Jumbotron, UncontrolledAlert
} from 'reactstrap';

import SearchForCollaboratorForm from './searchForUniversityForm';
import { connect } from 'react-redux'
import { toggleSearchForUnivCollaborator } from '../actions/menuActions'
import { fetchUnivCollaborators, setURL, setQueryStatement } from '../actions/searchForUnivCollaboratorActions'
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { isEmpty } from '../helper'
import '../App.css';
import Title from '../head'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLifeRing } from '@fortawesome/free-solid-svg-icons';

library.add(faLifeRing);

const queryString = require('query-string');


export function buildURL(item) {
   let org = item.selectedUniversities;
   let activityKeywords = item.activityKeywords;
   let topicalKeywords = item.topicalKeywords;
   let collaborations = item.collaborations;
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
   if (collaborations) {
      for (let i = 0; i < collaborations.length; i++) {
         url += '&collaborations=' + collaborations[i].value;
      }
   }
   return url;

}

export function buildQueryString(item) {
   let org = item.selectedUniversities;
   let activityKeywords = item.activityKeywords;
   let topicalKeywords = item.topicalKeywords;
   let collaborations = item.collaborations;
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
   if (collaborations) {
      for (let i = 0; i < collaborations.length; i++) {
         params += 'clb=' + collaborations[i].value + '&';
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
            collaborations: [],
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
         this.props.fetchUnivCollaborators(buildURL(this.props.collaborators.selectedQueryStatements));
         this.props.history.push(`?${buildQueryString(this.props.collaborators.selectedQueryStatements)}`);
         this.setState({ readParams: true })
      }
   }

   readParams() {
      let orgsA = [];
      let aKey = [];
      let tKey = [];
      let cKey = [];
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
      if (parsed.clb) {
         let clb = parsed.clb;
         if (!(Array.isArray(parsed.clb))) {
            clb = [parsed.clb]
         }
         clb.map(clbID => cKey.push({ label: this.props.collaborations.items[clbID].collaborationName, value: clbID }))
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
         collaborations: cKey,
         selectedUniversities: orgsA
      }
      this.props.setQueryStatement(selectedQueryStatements)
      this.props.fetchUnivCollaborators(buildURL(selectedQueryStatements));
      this.setState({readParams: true})
   }

   handleSubmit = (item) => {
      if (this.props.collaborators.selectedQueryStatements === item) {
         return
      }
      this.props.setQueryStatement(item);
      this.props.history.push(`?${buildQueryString(item)}`);
      this.props.fetchUnivCollaborators(buildURL(item));
   }

   render() {
      return (
         <>
            <Title name="Search for University Collaborator" />
            <Jumbotron fluid>
               <Container fluid>
                  <h1 className="display-3">Looking for a Collaborator?</h1>
                  <p className="lead">Use the form below to query potential collaborators.</p>
                  <UncontrolledAlert color="light">
                     <h4 className="alert-heading"><FontAwesomeIcon icon="life-ring" /> Need Help?</h4>
                        <p>
                           If you're looking for potential university collaborators, then you're in the right place! If instead, you want to search for NGO or government (city, regional, county), you'll need to go <Link to="govNGOCollaborator">here</Link>.
                        </p>
                     <hr />
                        <p className="mb-0">
                           <b>Universities</b><br />
                           To select universities that you can collaborate with, use the <code>University Selection</code> dropdown. You can select universities and departments or, you can start typing in the field to filter universities. To select an entire univeristy, you'll need to individually select each department.
                           <br /><b>Keywords</b><br />
                           Selecting keywords is very similar. The only difference is the keywords are broken up into high level, medium level, and low level. You can think of a high level keyword as <b>Fruit</b>, a medium level keyword <b>Apple</b> and a low level keyword <b>Honeycrisp</b>. This way, you can more easily narrow your search.
                           <br /><b>Collaborations</b><br />
                           To select collaborations, it's identical to Universities, you can select a collaboration, or type to filter the results.
                           <br /><b>There's More!</b><br />
                           If you want to save a query for later or share it with someone, click the <code>More Actions</code> dropdown, and then select <code>Save Query</code> (Note, you can only select this button if there are no parameters selected).<br />
                           If you have a code from someone else, you can use the <code>Paste Query</code> option to paste your qcode (query code) and the system will return the same query that was saved.
                        </p>
                  </UncontrolledAlert>
                  {this.state.readParams? 
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
   collaborations: state.collaborations,
   collaborators: state.univCollaborators,
})

const mapDispatchToProps = {
   toggleSearchForUnivCollaborator,
   fetchUnivCollaborators,
   setURL,
   setQueryStatement,
};

// function mapDispatchToProps(dispatch) {
//    return bindActionCreators({ toggleSearchForCollaborator, fetchCollaborators}, dispatch)
// }

SearchForCollaborator = withRouter(SearchForCollaborator);

export default connect(mapStateToProps, mapDispatchToProps)(SearchForCollaborator);