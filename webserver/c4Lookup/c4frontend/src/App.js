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
   NavLink,
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
} from 'reactstrap';
import Modal from './Modal';
import './App.css';

class App extends Component {
   constructor(props) {
      super (props);
      this.state = {
         modal: false,
         navIsOpen: false,
         'selectedQueryStatements': {
            activityKeywords: [],

            topicalKeywords: [],

            selectedUniversities: [],
         },
         displayItems: [],
         requestURL: '/api/v1/users/?format=json',
      };
      // this.navToggle = this.navToggle.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.refreshList = this.refreshList.bind(this);
      this.modalToggle = this.modalToggle.bind(this);
      this.buildURL = this.buildURL.bind(this);
   }
   componentDidMount() {
      this.refreshList('/api/v1/users/?format=json');
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
      this.modalToggle();
      // console.log('6');
   }

   modalToggle = () => {
      this.setState({ modal: !this.state.modal });
   };

   navToggle = () => {
      this.setState({
         navIsOpen: !this.state.navIsOpen
      });
   }

   runQuery = () => {
      this.setState({ modal: !this.state.modal });
   };

   buildURL(item) {
      console.log('building URL');
      let org = item.selectedUniversities;
      let activityKeywords = item.activityKeywords;
      let topicalKeywords = item.topicalKeywords;
      console.log(org)
      console.log(activityKeywords)
      console.log(topicalKeywords)
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
      console.log('Final URL before returning is: ' + url);
      // console.log(this);
      // this.setState({ requestURL: url });
      // this.setState({ requestURL: url });
      // this.setState({ requestURL: url }, function () {
      //    console.log('Waiting... ' + this.state.requestURL);
      // });
      console.log('Done waiting... ' + this.state.requestURL);
      return url;

   }

   refreshList(urlBuilder) {
      console.log(urlBuilder)
      axios
         .get(urlBuilder)
         .then(res => this.setState({ displayItems: res.data }))
         .catch(err => console.log(err));
   };

   renderDisplayUserItems = () => {
      const items = this.state.displayItems;
      let renderItems = items.map(item => (
         <tr key={item.id}>
            <th scope="row">{item.firstName} {item.lastName}</th>
            <td>{item.organization}</td>
            <td><a href={'mailto:'+item.emailAddress}>{item.emailAddress}</a></td>
            <td>{item.keywords}</td>
         </tr>
      ));
      // console.log(renderItems);
      return renderItems;
   };


   render() {
      console.log('render called');
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
               {this.state.modal ? (
                  <Modal
                     selectedQuery={this.state.selectedQueryStatements}
                     toggle={this.modalToggle}
                     submitHandler={this.handleSubmit}
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