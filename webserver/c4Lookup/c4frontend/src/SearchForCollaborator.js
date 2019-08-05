import React, { Component } from 'react';
import {
   Container,
   Jumbotron,
} from 'reactstrap';

import SearchForCollaboratorForm from './searchForCollaboratorForm';
import { connect } from 'react-redux'
import { toggleSearchForCollaborator } from './actions/menuActions'
import { fetchCollaborators } from './actions/searchForCollaboratorActions'
import { withRouter } from "react-router";
import './App.css';
import { bindActionCreators } from 'redux';

const queryString = require('query-string');


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

function buildQueryString(item) {
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
      const parsed = queryString.parse(this.props.location.search);
      console.log(parsed.keyA);
      // if (parsed.org) {
      //    orgsA.push({ label: this.props.orgs[orgID].orgNameUnique, id: orgID})
      // }
      if (parsed.keyA) {
         parsed.keyA.map(keyword => console.log(keyword))
      }
      // if (parsed.org) {
      //    // parsed.org.map(orgID => orgsA.push({ label: this.props.orgsA[orgID].orgNameUnique, id: orgID}))
      //    // parsed.org.map(orgID => console.log(orgID));
      // }
      // if (parsed.keyT) {
      //    parsed.keyT.map(keyword => console.log(keyword))
      // }
   }

   handleSubmit = (item) => {
      // item.preventDefault();
      // console.log(item);
      // console.log(item.target.universitySelection.value)
      this.setState({ selectedQueryStatements: item });
      // item.preventDefault();
      this.props.history.push(`?${buildQueryString(item)}`);
      // buildURL(item);
      this.props.fetchCollaborators(buildURL(item));
      // this.props.toggleSearchForCollaborator()
   }

   render() {
      const { match, location, history } = this.props;
      return (
         <>
            <Jumbotron fluid>
               <Container fluid>
                  <h1 className="display-3">Looking for a Collaborator?</h1>
                  <p className="lead">Use the form below to query potential collaborators.</p>
                  <hr className="my-2" />
                  <SearchForCollaboratorForm 
                     selectedQuery={this.state.selectedQueryStatements}
                     submitHandler={this.handleSubmit}/>
               </Container>
            </Jumbotron>
         </>
      )
   }
}

const mapStateToProps = state => ({
   nav: state.nav,
   orgs: state.orgs.items,
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