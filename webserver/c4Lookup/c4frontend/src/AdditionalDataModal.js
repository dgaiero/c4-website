import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import axios from "axios";
import {
   Container, Col, Form,
   FormGroup, Label,
   Button, FormText, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText
} from 'reactstrap';
import './Modal.css';

export default class memberSearchModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
         // selectedActivityKeyword: '',
         activityKeywords: [],

         topicalKeywords: [],

         selectedUniversities: [],
         validate: {
            emailState: '',
         },
         selectedOption: null,
         modal: false
      }
      this.handleChange = this.handleChange.bind(this);
      this.submitForm = this.submitForm.bind(this);
      // this.toggle = this.toggle.bind(this);
   }

   submitForm(e) {
      e.preventDefault();
      console.log(`This is a test!`)
      console.log(this.state.selectedUniversities)
      console.log(this.state.activityKeywords)
      console.log(this.state.topicalKeywords)
      var url = "/api/v1/users/?format=json";
      for (let i = 0; i < this.state.selectedUniversities.length; i++) {
            url += '&organization=' + this.state.selectedUniversities[i].value;
      }
      for (let i = 0; i < this.state.activityKeywords.length; i++) {
         url += '&keywords=' + this.state.activityKeywords[i].value;
      }
      for (let i = 0; i < this.state.topicalKeywords.length; i++) {
         url += '&keywords=' + this.state.topicalKeywords[i].value;
      }
      console.log(url);
      return url;
   }

   handleChange = (e) => {
      // console.log(event);
      let { name, value } = e.target;
      if (e.target.type === "checkbox") {
         value = e.target.checked;
      }
      const queryData = { ...this.state.queryData, [name]: value };
      this.setState({ queryData });
   };
   
   /* Passed in:
      props:
         // - this.props.modalTitle
         // - this.props.data = [
         //    {title: Title, body: Body},
         //    {title: Title, body: Body},
         //    etc...
         // ]
         - title
         - body
    */

   render() {
      const { toggle } = this.props;

      return (
      <Modal isOpen={true} toggle={toggle}>
         <ModalHeader toggle={toggle}>{this.props.title}</ModalHeader>
         <ModalBody>
            {this.props.body}
            {/* <ListGroup>
               {this.props.data.map((value, index) => {
                  return <ListGroupItem>
                     <ListGroupItemHeading>{value.title}</ListGroupItemHeading>
                     <ListGroupItemText>{value.body}</ListGroupItemText>
                  </ListGroupItem>
               })}
            </ListGroup> */}
         </ModalBody>
         <ModalFooter>
            <Button color="primary" onClick={toggle}>Close</Button>
         </ModalFooter>
         </Modal>
      );
   }
}