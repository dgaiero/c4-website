import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import axios from "axios";
import {
   Container, Col, Form,
   FormGroup, Label,
   Button, FormText, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import QueryModal from './Modal';

class App extends Component {

   render() {
      return (
         <QueryModal />
      );
   }
}
export default App;