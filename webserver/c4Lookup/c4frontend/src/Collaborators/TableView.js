import '../App.css';

import {
   Alert,
   Container,
   Spinner,
   Table,
   Toast,
   ToastBody,
   ToastHeader
} from 'reactstrap';
import { Element, scroller } from 'react-scroll';
import React, { Component } from 'react';

import Collaborations from '../Collaborations'
import Keyword from '../Keywords'
import Loader from '../loader';
import Loading from '../Loading'
import Obfuscate from 'react-obfuscate'
import Organizations from '../Organizations'
import Department from '../Department'
import PaginationWrapper from '../Pagination'
import SearchForCollaborator from './SearchForCollaborator'
import UserDetail from '../User'
import { connect } from 'react-redux'
import { fetchCollaborations } from '../actions/collaborationsActions'
import { fetchKeywords } from '../actions/keywordActions'
import { fetchOrganizations } from '../actions/organizationActions'
import { toggleToast } from '../actions/searchForCollaboratorActions'

class TableView extends Component {
   constructor(props) {
      super(props);
      this.state = {
         pageItems: [],
         pageSize: 30,
      };
      this.onChangePage = this.onChangePage.bind(this);
      this.scrollToTable = this.scrollToTable.bind(this);
   }

   componentDidMount() {
      this.props.fetchKeywords();
      this.props.fetchOrganizations();
      this.props.fetchCollaborations();
   }

   onChangePage(pageOfItems) {
      this.setState({ pageItems: pageOfItems })
   }

   toggleToastInter = () => this.props.toggleToast();

   scrollToTable() {
      scroller.scrollTo('resultsTable', {
         duration: 500,
         smooth: true,
      });
      this.props.toggleToast();
   }

   filterResults = (user) => {
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
            <td>{!this.props.orgsLoading || this.props.orgs === [] ? <Department items={item.organization} displayLength={20} /> : <Spinner color="primary" />}</td>
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
         { friendlyName: 'Collaborators', condition: this.props.collaboratorsLoading, error: this.props.collaboratorsError },
      ]
      let loadStatus = Loader.calculateLoadingState(loader);

      return (
         <>
         {this.props.collaborators.length > 0 ?
            <div style={{ position: "relative", zIndex: "1000" }}>
               <Toast isOpen={this.props.toastOpen} style={{ position: "fixed", top: "50px", right: "20px" }}>
                  <ToastHeader toggle={this.toggleToastInter} icon="success">Results Loaded</ToastHeader>
                  <ToastBody>
                     <a href="#0" onClick={this.scrollToTable}>
                        Click here to scroll to results.
                     </a>
                  </ToastBody>
               </Toast>
            </div> : null}
            <Loading body={loader} status={loadStatus} />
            {(!this.props.keywordsLoading || this.props.keywords === []) && (!this.props.orgsLoading || this.props.orgs === []) && (!this.props.collaborationsLoading || this.props.collaborations === []) ? <SearchForCollaborator /> : null}
            <Container fluid>
               {this.props.collaborators.length === 0 ?
                  <Alert color="info">
                     <h4 className="alert-heading">No Results</h4>
                     <p>
                        Hmm, it looks like there are no results with your
                        current query. Try a different combination.
                    </p>
                  </Alert> :
                  <>
                     <div className="clearfix">
                        {!(this.props.orgsLoading || this.props.orgError) && !(this.collaboratorsLoading || this.collaboratorsError) ?
                           <p className="text-muted float-right">Your query returned
                           exactly {this.props.collaborators.length} results.
                           </p> : 'Loading'
                        }
                     </div>
                     <Element name="resultsTable">
                     <Table hover responsive className="table-curved">
                        <thead className="thead-light">
                           <tr>
                              <th>Name</th>
                              <th>Organization(s)</th>
                              <th>Department</th>
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
                     </Element>
                     <div className="centerd-pagination">
                        <PaginationWrapper pageSize={this.state.pageSize} items={this.props.collaborators} onChangePage={this.onChangePage} />
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

   collaborators: state.collaborators.items,
   collaboratorsLoading: state.collaborators.loading,
   collaboratorsError: state.collaborators.error,
   toastOpen: state.collaborators.showToast,

   collaborations: state.collaborations.items,
   collaborationsLoading: state.collaborations.loading,
   collaborationsError: state.collaborations.error,
})

const mapDispatchToProps = {
   fetchKeywords,
   fetchOrganizations,
   fetchCollaborations,
   toggleToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableView);
