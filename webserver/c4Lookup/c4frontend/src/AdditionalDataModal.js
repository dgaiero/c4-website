import React, { Component } from 'react';
import {
   Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import './Modal.css';

export default class memberSearchModal extends Component {
   
   /* Passed in:
      props:
         - title
         - body
    */

   render() {
      const { openStatus, toggle, size } = this.props;
      return (
         <Modal isOpen={openStatus} toggle={toggle} centered size={size}>
            <ModalHeader toggle={toggle}>{this.props.title}</ModalHeader>
            <ModalBody>
               {this.props.body}
            </ModalBody>
            <ModalFooter>
               <Button color="primary" onClick={toggle}>Close</Button>
            </ModalFooter>
         </Modal>
      );
   }
}