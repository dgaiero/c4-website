import React, { Component } from 'react';
import {
   Container,
   Jumbotron,
} from 'reactstrap';

import SearchForCollaboratorForm from './searchForUniversityForm';
import { connect } from 'react-redux'
import { toggleSearchForCollaborator } from '../actions/menuActions'
import { fetchCollaborators } from '../actions/searchForCollaboratorActions'
import { withRouter } from "react-router";
import '../App.css';
// import Loader from './Loading'
import { bindActionCreators } from 'redux';

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
         readParams : false
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.readParams = this.readParams.bind(this);

   }


   componentDidMount() {
      this.readParams()
   }

   readParams() {
      let orgsA = [];
      let aKey = [];
      let tKey = [];
      console.log(this.props)
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
      // console.log(selectedQueryStatements)
      this.setState({ selectedQueryStatements: selectedQueryStatements})
      this.props.fetchCollaborators(buildURL(selectedQueryStatements));
      this.setState({readParams: true})
   }

   handleSubmit = (item) => {
      // console.log(item)
      this.setState({ selectedQueryStatements: item });
      this.props.history.push(`?${buildQueryString(item)}`);
      this.props.fetchCollaborators(buildURL(item));
   }

   render() {
      // console.log("Collaborators Loading: " + this.props.collaborators.loading)
      // Loader.addLoadItem('users', { friendlyName: 'Users', condition: this.props.collaborators.loading, error: this.props.collaborators.error })
      // Loader.calculateLoadingState()
      return (
         <>
            <Jumbotron fluid>
               <Container fluid>
                  <h1 className="display-3">Looking for a Collaborator?</h1>
                  <p className="lead">Use the form below to query potential collaborators.</p>
                  <hr className="my-2" />
                  {this.state.readParams ? <SearchForCollaboratorForm 
                     selectedQuery={this.state.selectedQueryStatements}
                     submitHandler={this.handleSubmit}/>: null}
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
};

// function mapDispatchToProps(dispatch) {
//    return bindActionCreators({ toggleSearchForCollaborator, fetchCollaborators}, dispatch)
// }

SearchForCollaborator = withRouter(SearchForCollaborator);

export default connect(mapStateToProps, mapDispatchToProps)(SearchForCollaborator);