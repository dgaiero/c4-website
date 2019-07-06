import React, { Component } from 'react';
import axios from "axios";
import {
   Container,
   Button,
   Collapse,
   Navbar,
   NavbarToggler,
   NavbarBrand,
   Nav,
   NavItem,
   Jumbotron,
   Table,
   Badge,
   ListGroupItem,
   ListGroup,
   Spinner, Toast, ToastBody, ToastHeader,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

import FourCMemberSearchModal from './FourCMemberModal';
import AdditionalDataModal from './AdditionalDataModal';
import PaginationWrapper from './Pagination'
import './App.css';

library.add(faInfo); 

const NBSP = '\u00A0'

function toTitleCase(str) {
   return str.replace(
      /\w\S*/g,
      function (txt) {
         return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
   );
}

class App extends Component {
   constructor(props) {
      super (props);
      this.state = {
         fourCModalOpen: false,
         navIsOpen: false,
         'selectedQueryStatements': {
            activityKeywords: [],
            
            topicalKeywords: [],
            
            selectedUniversities: [],
         },
         displayItems: [],
         pageItems: [],
         requestURL: '/api/v1/users/?format=json',
         orgData: [],
         keywordData: [],


         extendedDataModalOpen: false,
         showMoreUserDataModalOpen: false,
         moreUserDataModalSize: "sm",
         extendedDataModalTitle: '',
         extendedModalBody: '',
         moreUserDataTitle: '',
         moreUserDataBody: '',
         refreshListLoading: true,
         refreshKeywordsLoading: true,
         refreshOrgsLoading: true,
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.refreshList = this.refreshList.bind(this);
      this.FourCMemberSearchModalToggle = this.FourCMemberSearchModalToggle.bind(this);
      this.buildURL = this.buildURL.bind(this);
      this.getOrgs = this.getOrgs.bind(this);
      this.getKeywords = this.getKeywords.bind(this);
      this.onChangePage = this.onChangePage.bind(this);
   }


   componentDidMount() {
      this.refreshList('http://localhost/api/v1/users/?format=json');
      this.getOrgs();
      this.getKeywords();
   }

   onChangePage(pageOfItems) {
      this.setState({ pageItems: pageOfItems})
   }

   getOrgs() {
      let orgDataArray = [];
      axios.get('http://localhost/api/v1/orgs/?format=json')
         .then(orgData => this.setState(function() {
            orgData.data.map(orgInfo => orgDataArray[orgInfo.id] = orgInfo)
            return { orgData: orgDataArray, refreshOrgsLoading: false}
         }))
         
         
         .catch(err => console.log(err));
   
   }

   getKeywords() {
      let keywordDataArray = [];
      axios.get('http://localhost/api/v1/keywords/?format=json')
         .then(keywordData => this.setState(function () {
            keywordData.data.map(orgInfo => keywordDataArray[orgInfo.id] = orgInfo)
            return { keywordData: keywordDataArray, refreshKeywordsLoading: false }
         }))
         .catch(err => console.log(err));
   }

   handleSubmit = item => {
      this.setState({selectedQueryStatements: item});
      let urlBuilder = this.buildURL(item);
      this.refreshList(urlBuilder);
      this.FourCMemberSearchModalToggle();
   }

   FourCMemberSearchModalToggle = () => {
      this.setState({ fourCModalOpen: !this.state.fourCModalOpen });
   };

   ExtendedDataModalToggle = () => {
      this.setState({ extendedDataModalOpen: !this.state.extendedDataModalOpen });
   };

   showMoreUserDataModalToggle = () => {
      this.setState({ showMoreUserDataModalOpen: !this.state.showMoreUserDataModalOpen });
   };

   navToggle = () => {
      this.setState({
         navIsOpen: !this.state.navIsOpen
      });
   }

   runQuery = () => {
      this.setState({ fourCModalOpen: !this.state.fourCModalOpen});
   };

   buildURL(item) {
      let org = item.selectedUniversities;
      let activityKeywords = item.activityKeywords;
      let topicalKeywords = item.topicalKeywords;
      var url = "http://localhost/api/v1/users/?format=json";
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

   refreshList(urlBuilder) {
      axios
         .get(urlBuilder)
         .then(res => this.setState({ displayItems: res.data, refreshListLoading: false }))
         .catch(err => console.log(err));
   };

   getOrgType(shortOrgType) {
      if (shortOrgType === "IO") {
         return {name: "Institution", color: "primary"}
      }
      if (shortOrgType === "CY") {
         return { name: "City", color: "secondary" }
      }
      if (shortOrgType === "CO") {
         return { name: "County", color: "success" }
      }
      if (shortOrgType === "NG") {
         return { name: "NGO", color: "warning" }
      }
      if (shortOrgType === "RA") {
         return { name: "Regional Agency", color: "info" }
      }
   }

   showOrgExtendedData(orgID) {
      let orgInfo = this.state.orgData[orgID];
      let title = <div>{this.state.orgData[orgID].orgNameUnique}{NBSP}<Badge color={this.getOrgType(orgInfo.orgType).color}>{this.getOrgType(orgInfo.orgType).name}</Badge></div>
      let body = orgInfo.website !== null ? (
         <Button outline color="primary" size="sm" href={orgInfo.website} target="_blank" rel="noopener noreferrer">Visit Website</Button>
         ) : "No website provided";
      this.setState({ extendedDataModalTitle: title, extendedModalBody: body, extendedDataModalOpen: !this.state.extendedDataModalOpen});
   }

   buildOrgModal = (orgRef) => {
      let displayText = ""
      if (this.state.refreshOrgsLoading === true || this.state.orgData === []) {
         displayText = <Spinner color="primary" />
      }
      else {
         let modalTitle = "User Organizations"
         let modalBody = []
         orgRef.map(orgID => (
            displayText += this.state.orgData[orgID].orgNameUnique + ", "
         ));
         orgRef.map(orgID => (
            modalBody.push(<ListGroupItem key={orgID} tag="a" onClick={() => this.showOrgExtendedData(orgID)} href="#0" action><div>{this.state.orgData[orgID].orgNameUnique}{NBSP}<Badge color={this.getOrgType(this.state.orgData[orgID].orgType).color}>{this.getOrgType(this.state.orgData[orgID].orgType).name}</Badge></div></ListGroupItem>)
         ));
         modalBody = <ListGroup>{modalBody}</ListGroup>
         displayText = displayText.substring(0, displayText.length - 2)
         if (displayText.length > 20)
            displayText = displayText.substring(0, 20) + "..."
         displayText = <a href="#0" key={orgRef} onClick={() => this.showMoreUserDataModal(modalTitle, modalBody)}>{displayText}</a>
      }
      return displayText
   }

   getKeywordType(shortKeywordType) {
      if (shortKeywordType === "TK") {
         return { name: "Topical", color: "primary" }
      }
      if (shortKeywordType === "AK") {
         return { name: "Activity", color: "secondary" }
      }
   }

   getKeywordSortOrder(shortKeywordSortOrder) {
      if (shortKeywordSortOrder === "HS") {
         return { name: "High Level", color: "success" }
      }
      if (shortKeywordSortOrder === "MS") {
         return { name: "Medium Level", color: "warning" }
      }
      if (shortKeywordSortOrder === "LS") {
         return { name: "Low Level", color: "danger" }
      }
   }

   getUserTypes(shortUserType) {
      switch (shortUserType) {
         case "US":
            return { name: "University Faculty/Staff", color: "primary" };
         case "CS":
            return { name: "City Staff", color: "secondary" };
         case "CO":
            return { name: "County Staff", color: "success" }
         case "NS":
            return { name: "NGO Staff", color: "danger" }
         case "RS":
            return { name: "Regional Staff", color: "warning" }
         default:
            return { name: "Error", color: "dark" }
      }
   }

   showKeywordExtendedData(keywordID) {
      let keywordInfo = this.state.keywordData[keywordID];
      let title = <div>More Information on <b>{keywordInfo.keywordName.toLowerCase()}</b> keyword</div>
      let body = (<div>
         <Badge color={this.getKeywordType(keywordInfo.keywordType).color}>{this.getKeywordType(keywordInfo.keywordType).name}</Badge>{NBSP}
         <Badge color={this.getKeywordSortOrder(keywordInfo.sortOrder).color}>{this.getKeywordSortOrder(keywordInfo.sortOrder).name}</Badge><br />
         <span>{keywordInfo.keywordDescription !== null ? keywordInfo.keywordDescription : "No description provided."}</span>
      </div>);
      this.setState({ extendedDataModalTitle: title, extendedModalBody: body, extendedDataModalOpen: !this.state.extendedDataModalOpen });
   }

   showMoreUserDataModal(title, body) {
      this.setState({ moreUserDataTitle: title, moreUserDataBody: body, showMoreUserDataModalOpen: !this.state.showMoreUserDataModalOpen, moreUserDataModalSize: 'lg' });
   }

   buildKeywordModal = (keywordRef) => {
      let displayText = ""
      if (this.state.refreshKeywordsLoading || this.state.keywordData === []) {
         displayText = <Spinner color="primary" />
      }
      else {
         let modalTitle = "User keywords"
         let modalBody = []
         keywordRef.map(keywordID => (
            displayText += toTitleCase(this.state.keywordData[keywordID].keywordName) + ", "
         ));
         keywordRef.map(keywordID => (
            modalBody.push(<ListGroupItem key={keywordID} tag="a" onClick={() => this.showKeywordExtendedData(keywordID)} href="#0" action>{toTitleCase(this.state.keywordData[keywordID].keywordName)}</ListGroupItem>)
         ));
         modalBody = <ListGroup>{modalBody}</ListGroup>
         displayText = displayText.substring(0, displayText.length - 2)
         if (displayText.length > 20)
            displayText = displayText.substring(0, 75) + "..."
         if (displayText.length > 0)
            displayText = <a href="#0" key={keywordRef} onClick={() => this.showMoreUserDataModal(modalTitle, modalBody)}>{displayText}</a>
         else
            displayText = "No Keywords"
      }
      return displayText
   }

   buildUserExtendedInfoModal = (user) => {
      let title = <div>About <b>{user.firstName} {user.lastName}</b></div>;
      let body = <div>
         <Badge color={this.getUserTypes(user.userType).color}>{this.getUserTypes(user.userType).name}</Badge><br />
         <b>Email: </b>{user.emailAddress}<br />
         {user.website ? <div><b>Website: </b>{NBSP}<a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a></div> : ""}
         {user.jobTitle ? <div><b>Job Title: </b>{NBSP}{user.jobTitle}</div> : ""}
         {user.description ? <div><b>About: </b>{NBSP}{user.description.split("\n").map((i, key) => {
               return <div key={key}>{i}< br/></div>;})}</div> : ""}
      </div> 
      return <Button onClick={() => this.showMoreUserDataModal(title, body)}><FontAwesomeIcon icon="info" />{NBSP}More Information</Button>
   }

   renderDisplayUserItems = () => {
      const items = this.state.pageItems;
      let renderItems = ""
         renderItems = items.map(item => (
            <tr key={item.id}>
               <th scope="row">{item.firstName} {item.lastName}</th>
               <td>{this.buildOrgModal(item.organization)}</td>
               <td><a href={'mailto:'+item.emailAddress}>{item.emailAddress}</a></td>
               <td>{this.buildKeywordModal(item.keywords)}</td>
               <td>{this.buildUserExtendedInfoModal(item)}</td>
            </tr>
         ));
      return renderItems;
   };

   renderTable = () => {

      if (this.state.refreshListLoading) {
         return ""
      }
      else {
         return (<Table hover responsive>
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
         </Table>)
      }
   }


   render() {
      return (
         <main className="App">
            <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '100' }}>
               <Toast isOpen={this.state.refreshListLoading}>
                  <ToastHeader icon={<Spinner color="primary" size="sm" />}>
                     Loading
                  </ToastHeader>
                  <ToastBody>
                     Loading main table data
                  </ToastBody>
               </Toast>

               <Toast isOpen={this.state.refreshKeywordsLoading}>
                  <ToastHeader icon={<Spinner color="primary" size="sm" />}>
                     Loading
                  </ToastHeader>
                  <ToastBody>
                     Loading keyword data
                  </ToastBody>
               </Toast>

               <Toast isOpen={this.state.refreshOrgsLoading}>
                  <ToastHeader icon={<Spinner color="primary" size="sm" />}>
                     Loading
                  </ToastHeader>
                  <ToastBody>
                     Loading organization data
                  </ToastBody>
               </Toast>
            </div>
            <main className="navigationContainer">
               <Navbar color="light" light expand="md">
                  <NavbarBrand href="/">4C DATABASE QUERY UTILITY</NavbarBrand>
                  <NavbarToggler onClick={this.navToggle} />
                  <Collapse isOpen={this.state.navIsOpen} navbar>
                     <Nav className="ml-auto" navbar>
                        <NavItem>
                           <Button outline color="success" onClick={this.runQuery}>Search for 4C Member</Button>
                        </NavItem>
                        <NavItem>
                        </NavItem>
                     </Nav>
                  </Collapse>
               </Navbar>
                  <FourCMemberSearchModal
                     openStatus={this.state.fourCModalOpen}
                     selectedQuery={this.state.selectedQueryStatements}
                     toggle={this.FourCMemberSearchModalToggle}
                     submitHandler={this.handleSubmit}
                  />

                  <AdditionalDataModal
                     openStatus={this.state.extendedDataModalOpen}
                     title={this.state.extendedDataModalTitle}
                     body={this.state.extendedModalBody}
                     toggle={this.ExtendedDataModalToggle}
                  />

                  <AdditionalDataModal
                     openStatus={this.state.showMoreUserDataModalOpen}
                     title={this.state.moreUserDataTitle}
                     body={this.state.moreUserDataBody}
                     toggle={this.showMoreUserDataModalToggle}
                     size={this.state.moreUserDataModalSize}
                  />

            </main>

            <main role="main" className="content">
               <div>
                  <Jumbotron fluid>
                     <Container fluid>
                        <h1 className="display-3">Welcome</h1>
                        <p className="lead">This system is designed to query 4C members for collaboration on projects.</p>
                        <hr className="my-2" />
                        <p>If you would like to be added to this database, please contact CONTACT NAME.</p>
                        <p className="lead">
                           <Button onClick={() => alert("This will eventually have a mailTo.")}color="primary">Request Addition to Database</Button>
                        </p>
                     </Container>
                  </Jumbotron>
               </div>
               <div>
                  <Container fluid>
                     {this.renderTable()}
                     <PaginationWrapper pageSize={50} items={this.state.displayItems} onChangePage={this.onChangePage} />
                  </Container>
               </div>
            </main>
            <footer className="footer mt-auto py-3" style={{ backgroundColor: '#F8F9FA'}}>
               <Container fluid className="clearfix">
                  <span className="text-muted float-left">Copyright {'\u00A9'} 2019 Central Coast Climate Collaborative </span>
                  <a href="https://www.centralcoastclimate.org/" className="float-right" target="_blank" rel="noopener noreferrer">Visit main website</a>
               </Container>
            </footer>
         </main>
      );
   }
}
export default App;