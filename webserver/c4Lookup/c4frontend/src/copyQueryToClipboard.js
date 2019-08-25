import React, { Component } from 'react';
import {
   Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, Input, Tooltip 
} from 'reactstrap';
import './Modal.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
var base64 = require('base-64');


export default class CopyQueryToClipboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         copyURL: false,
         copyURLTooltip: false,
      }
   }
   /* Passed in:
      props:
         - title
         - body
    */

   render() {
      const { openStatus, toggle, size, query } = this.props;
      return (
         <Modal isOpen={openStatus} toggle={toggle} centered size={size}>
            <ModalHeader toggle={toggle}>Copy Query to Clipboard</ModalHeader>
            <ModalBody>
               Saving or sharing a query is easy! You can copy the code below to
               your clipboard and paste it in on this page later, or you can copy
               the sharable URL.< br />
               <b>Copy URL to clipboard</b>

               <InputGroup>
                  <Input disabled placeholder={base64.encode(query)}/>
                  <InputGroupAddon addonType="append">

                     <CopyToClipboard text={base64.encode(query)}
                        onCopy={() => this.setState({ copyURL: true })}>
                        <Button id="copyURLToClipboard">Copy to clipboard</Button>
                     </CopyToClipboard>
                     <Tooltip placement="top" isOpen={this.state.copyURL} autohide={false} target="copyURLToClipboard">
                        Try to select this text!
                     </Tooltip>
                  </InputGroupAddon>
               </InputGroup>
               {query}
            </ModalBody>
            <ModalFooter>
               <Button color="primary" onClick={toggle}>Close</Button>
            </ModalFooter>
         </Modal>
      );
   }
}