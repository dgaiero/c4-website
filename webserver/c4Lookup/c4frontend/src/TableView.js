import React, { Component } from 'react';
import {
   Container,
   Table,
   Spinner,
} from 'reactstrap';
import PaginationWrapper from './Pagination'
import { connect } from 'react-redux'
import {fetchKeywords} from './actions/keywordActions'
import {fetchOrganizations} from './actions/organizationActions'
import Keyword from './Keywords'
import Organizations from './Organizations'
import UserDetail from './User'
import SearchForCollaborator from './universityCollaborators/searchForUniversity'
// import Loader from './Loading';
import './App.css';

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
            <td><a href={'mailto:' + item.emailAddress}>{item.emailAddress}</a></td>
            <td>{!this.props.keywordsLoading || this.props.keywords === [] ? <Keyword items={item.keywords} displayLength={75}/> : <Spinner color="primary" />}</td>
            <td><UserDetail user={item}/></td>
         </tr>
      ));
      return renderItems;
   };

   render() {
      // Loader.addLoadItem('keywords', { friendlyName: 'Keywords', condition: this.props.keywordsLoading, error: this.props.keywordError })
      // Loader.addLoadItem('orgs', { friendlyName: 'Organizations', condition: this.props.orgsLoading, error: this.props.orgError })
      
      return (
         <>
            {(!this.props.keywordsLoading || this.props.keywords === []) && (!this.props.orgsLoading || this.props.orgs === []) ? <SearchForCollaborator /> : <Spinner color="primary" /> }
         <Container fluid>
            <Table hover responsive>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Organization</th>
                     <th>Email Address</th>
                     <th>Keywords</th>
                     <th>More Information</th>
                  </tr>
               </thead>
               <tbody>
                  {this.renderDisplayUserItems()}
               </tbody>
            </Table>
            <PaginationWrapper pageSize={this.state.pageSize} items={this.props.collaborators} onChangePage={this.onChangePage} />
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
})

const mapDispatchToProps = {
   fetchKeywords,
   fetchOrganizations
};

export default connect(mapStateToProps, mapDispatchToProps)(TableView);