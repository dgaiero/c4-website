import React, { Component } from 'react';
import {
   Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import './Modal.css';

export default class LoadingModal extends Component {
   
   /* Passed in:
      props:
         - title
         - body
    */

   render() {
      const { openStatus, size } = this.props;
      return (
         <Modal isOpen={openStatus} centered size={size}>
            <ModalHeader>{this.props.title}</ModalHeader>
            <ModalBody>
               {this.props.body}
            </ModalBody>
         </Modal>
      );
   }
}