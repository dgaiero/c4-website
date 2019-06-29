import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import axios from "axios";
import {
   Container, Col, Form,
   FormGroup, Label,
   Button, FormText, ModalHeader, ModalBody, ModalFooter,
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
   NavLink,
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
} from 'reactstrap';
import FourCMemberSearchModal from './FourCMemberModal';
import AdditionalDataModal from './AdditionalDataModal';
import './App.css';

const NBSP = '\u00A0'

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
         requestURL: '/api/v1/users/?format=json',
         orgData: [],
         keywordData: [],


         extendedDataModalOpen: false,
         showMoreUserDataModalOpen: false,
         extendedDataModalTitle: '',
         extendedModalBody: '',
         moreUserDataTitle: '',
         moreUserDataBody: '',
      };
      // this.navToggle = this.navToggle.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.refreshList = this.refreshList.bind(this);
      this.FourCMemberSearchModalToggle = this.FourCMemberSearchModalToggle.bind(this);
      this.buildURL = this.buildURL.bind(this);
      this.getOrgs = this.getOrgs.bind(this);
      this.getKeywords = this.getKeywords.bind(this);
   }


   componentDidMount() {
      this.refreshList('/api/v1/users/?format=json');
      this.getOrgs();
      this.getKeywords();
   }

   getOrgs() {
      // orgDataArray[orgData.id] = orgData
      let orgDataArray = [];
      axios.get('/api/v1/orgs/?format=json')
         .then(orgData => orgData.data.map(orgInfo => orgDataArray[orgInfo.id] = orgInfo))
         .then(this.setState({ orgData: orgDataArray }))
         .catch(err => console.log(err));
   
   }

   getKeywords() {
      let keywordDataArray = [];
      axios.get('/api/v1/keywords/?format=json')
         .then(keywordData => keywordData.data.map(keywordInfo => keywordDataArray[keywordInfo.id] = keywordInfo))
         .then(this.setState({ keywordData: keywordDataArray }))
         .catch(err => console.log(err));
   }

   handleSubmit = item => {
      // console.log('1');
      console.log(item);
      this.setState({selectedQueryStatements: item});
      // console.log('2');
      let urlBuilder = this.buildURL(item);
      // console.log('3');
      // console.log(urlBuilder)
      // this.setState({requestURL: urlBuilder});
      // console.log('4');
      this.refreshList(urlBuilder);
      // console.log('5');
      this.FourCMemberSearchModalToggle();
      // console.log('6');
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
      this.setState({ fourCModalOpen: !this.state.fourCModalOpen });
   };

   buildURL(item) {
      // console.log('building URL');
      let org = item.selectedUniversities;
      let activityKeywords = item.activityKeywords;
      let topicalKeywords = item.topicalKeywords;
      // console.log(org)
      // console.log(activityKeywords)
      // console.log(topicalKeywords)
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
      // console.log('Final URL before returning is: ' + url);
      // console.log(this);
      // this.setState({ requestURL: url });
      // this.setState({ requestURL: url });
      // this.setState({ requestURL: url }, function () {
      //    console.log('Waiting... ' + this.state.requestURL);
      // });
      // console.log('Done waiting... ' + this.state.requestURL);
      return url;

   }

   refreshList(urlBuilder) {
      // console.log(urlBuilder)
      axios
         .get(urlBuilder)
         .then(res => this.setState({ displayItems: res.data }))
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
         <Button outline color="primary" size="sm" href={orgInfo.website}>Visit Website</Button>
         ) : "No website provided";
      this.setState({ extendedDataModalTitle: title, extendedModalBody: body, extendedDataModalOpen: !this.state.extendedDataModalOpen});
   }

   buildOrgModal = (orgRef) => {
      let displayText = ""
      let modalTitle = "All Organizations"
      let modalBody = []
      orgRef.map(orgID => (
         displayText += this.state.orgData[orgID].orgNameUnique + ", "
      ));
      orgRef.map(orgID => (
         modalBody.push(<ListGroupItem key={orgID} tag="a" onClick={() => this.showOrgExtendedData(orgID)} href="#" action><div>{this.state.orgData[orgID].orgNameUnique}{NBSP}<Badge color={this.getOrgType(this.state.orgData[orgID].orgType).color}>{this.getOrgType(this.state.orgData[orgID].orgType).name}</Badge></div></ListGroupItem>)
      ));
      modalBody = <ListGroup>{modalBody}</ListGroup>
      displayText = displayText.substring(0, 20) + "..."
      displayText = <a href="#0" key={orgRef} onClick={() => this.showMoreUserDataModal(modalTitle, modalBody)}>{displayText}</a>
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

   showKeywordExtendedData(keywordID) {
      let keywordInfo = this.state.keywordData[keywordID];
      let title = <div>More Information on <b>{keywordInfo.keywordName}</b> keyword</div>
      let body = (<div>
         <Badge color={this.getKeywordType(keywordInfo.keywordType).color}>{this.getKeywordType(keywordInfo.keywordType).name}</Badge>{NBSP}
         <Badge color={this.getKeywordSortOrder(keywordInfo.sortOrder).color}>{this.getKeywordSortOrder(keywordInfo.sortOrder).name}</Badge><br />
         <span>{keywordInfo.keywordDescription !== null ? keywordInfo.keywordDescription : "No description provided."}</span>
      </div>);
      this.setState({ extendedDataModalTitle: title, extendedModalBody: body, extendedDataModalOpen: !this.state.extendedDataModalOpen });
   }

   showMoreUserDataModal(title, body) {
      this.setState({ moreUserDataTitle: title, moreUserDataBody: body, showMoreUserDataModalOpen: !this.state.showMoreUserDataModalOpen });
   }

   buildKeywordModal = (keywordRef) => {
      let displayText = ""
      let modalTitle = "All keywords"
      let modalBody = []
      keywordRef.map(keywordID => (
         displayText += this.state.keywordData[keywordID].keywordName + ", "
      ));
      keywordRef.map(keywordID => (
         modalBody.push(<ListGroupItem key={keywordID} tag="a" onClick={() => this.showKeywordExtendedData(keywordID)} href="#" action>{this.state.keywordData[keywordID].keywordName}</ListGroupItem>)
      ));
      modalBody = <ListGroup>{modalBody}</ListGroup>
      displayText = displayText.substring(0, 75) + "..."
      displayText = <a href="#0" key={keywordRef} onClick={() => this.showMoreUserDataModal(modalTitle, modalBody)}>{displayText}</a>
      return displayText
   }

   renderDisplayUserItems = () => {
      const items = this.state.displayItems;
      let renderItems = items.map(item => (
         <tr key={item.id}>
            <th scope="row">{item.firstName} {item.lastName}</th>
            <td>{this.buildOrgModal(item.organization)}</td>
            <td><a href={'mailto:'+item.emailAddress}>{item.emailAddress}</a></td>
            <td>{this.buildKeywordModal(item.keywords)}</td>
         </tr>
      ));
      // console.log(renderItems);
      return renderItems;
   };


   render() {
      // console.log('render called');
      return (
         <main className="App">
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
               {this.state.fourCModalOpen ? (
                  <FourCMemberSearchModal
                     selectedQuery={this.state.selectedQueryStatements}
                     toggle={this.FourCMemberSearchModalToggle}
                     submitHandler={this.handleSubmit}
                  />
               ) : null}

               {this.state.extendedDataModalOpen ? (
                  <AdditionalDataModal
                     title={this.state.extendedDataModalTitle}
                     body={this.state.extendedModalBody}
                     toggle={this.ExtendedDataModalToggle}
                  />
               ) : null}

               {this.state.showMoreUserDataModalOpen ? (
                  <AdditionalDataModal
                     title={this.state.moreUserDataTitle}
                     body={this.state.moreUserDataBody}
                     toggle={this.showMoreUserDataModalToggle}
                  />
               ) : null}

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
                     <Table hover responsive>
                        <thead>
                           <tr>
                              <th>Name</th>
                              <th>Organization</th>
                              <th>Email Address</th>
                              <th>Keywords</th>
                           </tr>
                        </thead>
                        <tbody>
                           {this.renderDisplayUserItems()}
                        </tbody>
                     </Table>
                  </Container>
               </div>
            </main>
         </main>
      );
   }
}
export default App;