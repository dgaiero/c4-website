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
      const encodedQuery = base64.encode(endpoint + "?" + query)
      const URL = protocol.concat("//", host, "/save/", encodedQuery);
      return (
         <Modal isOpen={openStatus} toggle={toggle} centered size={size}>
            <ModalHeader toggle={toggle}>Copy Query to Clipboard</ModalHeader>
            <ModalBody>
               <UncontrolledAlert  color="info">
                  Copying a code is coming soon
               </UncontrolledAlert>
               Saving or sharing a query is easy! You can copy the code below to
               your clipboard and paste it in on this page later, or you can copy
               the sharable URL.< br />
               <b>Copy code to clipboard</b>

               <InputGroup>
                  <Input disabled placeholder={encodedQuery} />
                  <InputGroupAddon addonType="append">

                     <CopyToClipboard text={encodedQuery}
                        onCopy={() => this.setState({ copyCode: true })}>
                        <Button disabled id="copyCodeToClipboard" color="success">Copy to clipboard</Button>
                     </CopyToClipboard>
                     <UncontrolledPopover trigger="focus" placement="right" target="copyCodeToClipboard">
                        <PopoverHeader>Copied Code to Clipboard</PopoverHeader>
                        <PopoverBody>You can share or save this code to return to this query later!<br /><kbd>Ctrl</kbd> + <kbd>V</kbd> can retrieve the code from your clipboard.</PopoverBody>
                     </UncontrolledPopover>
                  </InputGroupAddon>
               </InputGroup>
               <br />
               <b>Want to Copy a URL instead?</b>

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