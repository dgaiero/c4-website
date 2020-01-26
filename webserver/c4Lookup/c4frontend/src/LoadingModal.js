import './Modal.css';

import {
   Modal,
   ModalBody,
   ModalHeader,
} from 'reactstrap';
import React, { Component } from 'react';

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
               This might take a little while if this is the first time you're here.<br />
               {this.props.body}
            </ModalBody>
         </Modal>
      );
   }
}