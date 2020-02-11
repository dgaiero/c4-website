import './Modal.css';

import {
   Alert,
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
               <Alert color="dark">
                  This might take a little while depending on network
                  conditions.
               </Alert>
               {this.props.body}
            </ModalBody>
         </Modal>
      );
   }
}