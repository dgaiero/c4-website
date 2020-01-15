import '../App.css';

import {
   Alert,
   Container,
   Spinner,
   Table,
} from 'reactstrap';
import React, { Component } from 'react';

import Collaborations from '../Collaborations'
import Keyword from '../Keywords'
import Loader from '../loader';
import Loading from '../Loading'
import Obfuscate from 'react-obfuscate'
import Organizations from '../Organizations'
import PaginationWrapper from '../Pagination'
import SearchForCollaborator from './searchForUniversity'
import UserDetail from '../User'
import { connect } from 'react-redux'
import { fetchCollaborations } from '../actions/collaborationsActions'
import { fetchKeywords } from '../actions/keywordActions'
import { fetchOrganizations } from '../actions/organizationActions'

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

   filterUnivResults = (user) => {
      const userOrgs = user.organization.map(orgID => this.props.orgs[orgID]);
      return userOrgs.map(org => ["IO"].includes(org.orgType));
   };

   renderDisplayUserItems = () => {
      const items = this.state.pageItems;
      let renderItems = ""
      renderItems = items.map(item => (
         <tr key={item.id}>
            <th scope="row">{item.firstName} {item.lastName}</th>
            <td>{!this.props.orgsLoading || this.props.orgs === [] ? <Organizations items={item.organization} displayLength={20} /> : <Spinner color="primary" />}</td>
            <td><Obfuscate email={item.emailAddress} /></td>
            <td>{!this.props.keywordsLoading || this.props.keywords === [] ? <Keyword items={item.keywords} displayLength={25} /> : <Spinner color="primary" />}</td>
            <td>{!this.props.collaborationsLoading || this.props.collaborations === [] ? <Collaborations items={item.collaborations} displayLength={25} /> : <Spinner color="primary" />}</td>
            <td><UserDetail user={item} /></td>
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
            {(!this.props.keywordsLoading || this.props.keywords === []) && (!this.props.orgsLoading || this.props.orgs === []) && (!this.props.collaborationsLoading || this.props.collaborations === []) ? <SearchForCollaborator /> : null}
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
                     <div className="clearfix">
                        {!(this.props.orgsLoading || this.props.orgError) && !(this.univCollaboratorsLoading || this.univCollaboratorsError) ?
                           <p className="text-muted float-right">Your query returned
                           exactly {this.props.univCollaborators.length} results.
                        </p> : 'Loading'
                        }

                     </div>
                     <Table hover responsive className="table-curved">
                        <thead className="thead-light">
                           <tr>
                              <th>Name</th>
                              <th>Organization(s)</th>
                              <th>Email Address</th>
                              <th>Keyword(s)</th>
                              <th>Collaboration(s)</th>
                              <th>More Information</th>
                           </tr>
                        </thead>
                        <tbody>
                           {this.renderDisplayUserItems()}
                        </tbody>
                     </Table>
                     <div className="centerd-pagination">
                        <PaginationWrapper pageSize={this.state.pageSize} items={this.props.univCollaborators} onChangePage={this.onChangePage} />
                     </div>
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