import './Modal.css';

import {
   Button,
   Input,
   InputGroup,
   InputGroupAddon,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader,
   PopoverBody,
   PopoverHeader,
   UncontrolledAlert,
   UncontrolledPopover
} from 'reactstrap';
import React, { Component } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';

var base64 = require('base-64');
var Buffer = require('buffer/').Buffer

export default class CopyQueryToClipboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         copyCode: false,
         copyURL: false,
      }
   }
   /* Passed in:
      props:
         - title
         - body
    */

   render() {
      const { openStatus, toggle, size, query, endpoint } = this.props;
      const protocol = window.location.protocol;
      const host = window.location.host;
      let encodedQuery = base64.encode(endpoint + "?" + query)
      encodedQuery = Buffer.from(encodedQuery, 'utf8').toString('hex');
      const URL = protocol.concat("//", host, "/save/", encodedQuery);
      return (
         <Modal isOpen={openStatus} toggle={toggle} centered size={size}>
            <ModalHeader toggle={toggle}>Copy Query to Clipboard</ModalHeader>
            <ModalBody>
               Saving or sharing a query is easy! You can copy the URL below to
               your clipboard and use it to return to this same query.< br />
               <b>Copy URL to clipboard</b>

               <InputGroup>
                  <Input disabled placeholder={URL} />
                  <InputGroupAddon addonType="append">

                     <CopyToClipboard text={URL}
                        onCopy={() => this.setState({ copyURL: true })}>
                        <Button id="copyURLToClipboard" color="success">Copy to clipboard</Button>
                     </CopyToClipboard>
                     <UncontrolledPopover trigger="focus" placement="right" target="copyURLToClipboard">
                        <PopoverHeader>Copied URL to Clipboard</PopoverHeader>
                        <PopoverBody>You can share or save this URL to return to this query later!<br /><kbd>Ctrl</kbd> + <kbd>V</kbd> can retrieve the code from your clipboard.</PopoverBody>
                     </UncontrolledPopover>
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