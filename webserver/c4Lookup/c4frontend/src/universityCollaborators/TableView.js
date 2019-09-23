import React, { Component } from 'react';
import {
   Container,
   Table,
   Spinner,
   Alert,
} from 'reactstrap';
import PaginationWrapper from '../Pagination'
import { connect } from 'react-redux'
import {fetchKeywords} from '../actions/keywordActions'
import {fetchOrganizations} from '../actions/organizationActions'
import { fetchCollaborations } from '../actions/collaborationsActions'
import Keyword from '../Keywords'
import Organizations from '../Organizations'
import UserDetail from '../User'
import SearchForCollaborator from './searchForUniversity'
import Loader from '../loader';
import Loading from '../Loading'
import '../App.css';
import Obfuscate from 'react-obfuscate'
import { isEmpty } from '../helper'

class TableView extends Component {
   constructor(props) {
      super(props);
      this.state = {
         pageItems: [],
         pageSize: 30,
      };
      this.onChangePage = this.onChangePage.bind(this);
   }
  
   componentDidMount() {
      this.props.fetchKeywords();
      this.props.fetchOrganizations();
      this.props.fetchCollaborations();
   }

   onChangePage(pageOfItems) {
      this.setState({ pageItems: pageOfItems })
   }

   renderDisplayUserItems = () => {
      const items = this.state.pageItems;
      let renderItems = ""
      renderItems = items.map(item => (
         <tr key={item.id}>
            <th scope="row">{item.firstName} {item.lastName}</th>
            <td>{!this.props.orgsLoading || this.props.orgs === [] ? <Organizations items={item.organization} displayLength={20} /> : <Spinner color="primary" />}</td>
            <td><Obfuscate email={item.emailAddress} /></td>
            <td>{!this.props.keywordsLoading || this.props.keywords === [] ? <Keyword items={item.keywords} displayLength={75}/> : <Spinner color="primary" />}</td>
            <td><UserDetail user={item}/></td>
         </tr>
      ));
      return renderItems;
   };

   render() {
      let loader = [
         { friendlyName: 'Keywords', condition: this.props.keywordsLoading, error: this.props.keywordError },
         { friendlyName: 'Organizations', condition: this.props.orgsLoading, error: this.props.orgError },
         { friendlyName: 'Collaborations', condition: this.props.collaborationsLoading, error: this.props.collaborationsError },
         { friendlyName: 'University Collaborators', condition: this.props.univCollaboratorsLoading, error: this.props.univCollaboratorsError },
      ]
      let loadStatus = Loader.calculateLoadingState(loader);      
      return (
         <>
            <Loading body={loader} status={loadStatus} />
            {(!this.props.keywordsLoading || this.props.keywords === []) && (!this.props.orgsLoading || this.props.orgs === []) && (!this.props.collaborationsLoading || this.props.collaborations === []) ? <SearchForCollaborator /> : null }
         <Container fluid>
            {this.props.univCollaborators.length === 0 ? 
               <Alert color="info">
                  <h4 className="alert-heading">No Results</h4>
                  <p>
                     Hmm, it looks like there are no results with your
                     current query. Try a different combination.
                  </p>
               </Alert> :
               <>
                  <Table hover responsive>
                     <thead>
                        <tr>
                           <th>Name</th>
                           <th>Organization(s)</th>
                           <th>Email Address</th>
                           <th>Keyword(s)</th>
                           <th>More Information</th>
                        </tr>
                     </thead>
                     <tbody>
                        {this.renderDisplayUserItems()}
                     </tbody>
                  </Table>
                     <PaginationWrapper pageSize={this.state.pageSize} items={this.props.univCollaborators} onChangePage={this.onChangePage} />
               </>
            }
         </Container>
         </>
      );
   }
}

const mapStateToProps = state => ({
   keywords: state.keywords.items,
   keywordsLoading: state.keywords.loading,
   keywordError: state.keywords.error,

   orgs: state.orgs.items,
   orgsLoading: state.orgs.loading,
   orgError: state.orgs.error,

   univCollaborators: state.univCollaborators.items,
   univCollaboratorsLoading: state.univCollaborators.loading,
   univCollaboratorsError: state.univCollaborators.error,

   collaborations: state.collaborations.items,
   collaborationsLoading: state.collaborations.loading,
   collaborationsError: state.collaborations.error,
})

const mapDispatchToProps = {
   fetchKeywords,
   fetchOrganizations,
   fetchCollaborations
};

export default connect(mapStateToProps, mapDispatchToProps)(TableView);