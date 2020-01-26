import '../App.css';

import {
   Col,
   Container,
   Jumbotron,
   Row,
} from 'reactstrap';
import React, { Component } from 'react';
import { fetch4CMembers, setQueryStatement, setURL } from '../actions/searchFor4CMemberActions'

import HowToSearchModal from './HowToSearchModal'
import SearchForCollaboratorForm from './searchFor4CCollaboratorForm';
import Title from '../head'
import { connect } from 'react-redux'
import { isEmptyOrg as isEmpty } from '../helper'
import { withRouter } from "react-router";

const queryString = require('query-string');


export function buildURL(item) {
   let org = item.selectedOrganization;
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
   let org = item.selectedOrganization;
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
            selectedOrganization: [],
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
         this.props.fetch4CMembers(buildURL(this.props.collaborators.selectedQueryStatements));
         this.props.history.push(`?${buildQueryString(this.props.collaborators.selectedQueryStatements)}`);
         this.setState({ readParams: true })
      }
      // this.props.fetch4CMembers(buildURL(this.props.collaborators.selectedQueryStatements));
      // this.props.history.push(`?${buildQueryString(this.props.collaborators.selectedQueryStatements)}`);
      // this.setState({ readParams: true })
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
         selectedOrganization: orgsA
      }
      this.props.setQueryStatement(selectedQueryStatements)
      this.props.fetch4CMembers(buildURL(selectedQueryStatements));
      this.setState({readParams: true})
   }

   handleSubmit = (item) => {
      if (this.props.collaborators.selectedQueryStatements === item) {
         return
      }
      this.props.setQueryStatement(item);
      this.props.history.push(`?${buildQueryString(item)}`);
      this.props.fetch4CMembers(buildURL(item));
   }

   render() {
      return (
         <>
            <Title name="Search for 4C Member" />
            <Jumbotron fluid>
               <Container fluid>
                  <Row>
                  <Col sm={{ size: 6, order: 2, offset: 1 }}>
                     <h1 className="display-3">Looking for a 4C Member?</h1>
                     <p className="lead">Use the form below to query potential collaborators.</p>
                     <p className="text-muted">All fields are optional. Leave blank to select all options in that category.< br />
                     <b>The level indicators only indicate scope, not priority or importance.</b></p>
                     <HowToSearchModal />
                     <hr className="my-2" />
                     {this.state.readParams? 
                     <SearchForCollaboratorForm 
                        selectedQuery={this.props.collaborators.selectedQueryStatements}
                        submitHandler={this.handleSubmit}
                        history={this.props.history}/>: null}
                        </Col>
                        </Row>
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
   collaborators: state.C4Collaborators,
})

const mapDispatchToProps = {
   fetch4CMembers,
   setURL,
   setQueryStatement
};

SearchForCollaborator = withRouter(SearchForCollaborator);

export default connect(mapStateToProps, mapDispatchToProps)(SearchForCollaborator);