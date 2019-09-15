import React, { Component } from 'react';
import {
   Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, Input
} from 'reactstrap';
import './Modal.css';


export default class CopyQueryToClipboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         value: '',
      }
      this.runQuery = this.runQuery.bind(this)
      this.handleChange = this.handleChange.bind(this)
   }
   /* Passed in:
      props:
         - title
         - body
    */

   runQuery = () => {

      let newLocation = '/collaborator/save/' + this.state.value
      this.props.history.push(newLocation)
   }

   handleChange(event) {
   this.setState({ value: event.target.value });
   }

   render() {
      const { openStatus, toggle, size, endpoint } = this.props;
      return (
         <Modal isOpen={openStatus} toggle={toggle} centered size={size}>
            <ModalHeader toggle={toggle}>Paste Query from Clipboard</ModalHeader>
            <ModalBody>
               If you have a code, paste it below to convert it into a query.< br />
               <b>Paste Code From Clipboard</b>

               <InputGroup>
                  <Input value={this.state.value} onChange={this.handleChange} autofocus="true"/>
                  <InputGroupAddon addonType="append">
                     <Button color="success" onClick={() => this.runQuery()}>Run Query</Button>
                  </InputGroupAddon>
               </InputGroup>
            </ModalBody>
            <ModalFooter>
               <Button color="primary" onClick={toggle}>Close</Button>
            </ModalFooter>
         </Modal>
      );
   }
}