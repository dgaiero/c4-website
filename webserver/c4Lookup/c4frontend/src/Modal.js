import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import axios from "axios";
import {
   Container, Col, Form,
   FormGroup, Label,
   Button, FormText, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import './Modal.css';


async function getKeywords(type, sortOrder) {
   try {
      return await axios.get('/api/v1/keywords/?format=json&keywordType=' + type + '&sortOrder=' + sortOrder)
   } catch (error) {
      console.error(error)
   }
}

async function parseKeywordData(keywordType) {
   const keywordLow = await getKeywords(keywordType, 'LS');
   const keywordMedium = await getKeywords(keywordType, 'MS');
   const keywordHigh = await getKeywords(keywordType, 'HS');

   if (keywordLow.data && keywordMedium.data && keywordHigh.data) {
      let keywordLowNormalized = keywordLow.data.map(keyword => ({
         label: keyword.keywordName,
         value: keyword.id
      }));
      let keywordMediumNormalized = keywordMedium.data.map(keyword => ({
         label: keyword.keywordName,
         value: keyword.id
      }));
      let keywordHighNormalized = keywordHigh.data.map(keyword => ({
         label: keyword.keywordName,
         value: keyword.id
      }));
      let keywordOptionData =
         [
            {
               label: 'High Level Keywords',
               options: keywordHighNormalized,
            },
            {
               label: 'Medium Level Keywords',
               options: keywordMediumNormalized,
            },
            {
               label: 'Low Level Keywords',
               options: keywordLowNormalized,
            },
         ]
      return keywordOptionData;
   }
}


class memberSearchModal extends Component {
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
      this.toggle = this.toggle.bind(this);
   }

   handleChangeDropDown = selectedOption => {
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption);
   };

   handleActivityDropdown(property) {
      // let newVal = property;
      let stateVal = this.state.activityKeywords;

      // console.log(property);
      // console.log(stateVal);
      // stateVal.indexOf(newVal) === -1
      //    ? stateVal.push(newVal)
      //    : stateVal.length === 1
      //       ? (stateVal = [])
      //       : stateVal.splice(stateVal.indexOf(newVal), 1);

      this.setState({
         activityKeywords: property,
         selectedActivityKeyword: property });
   }

   // validateEmail(e) {
   //    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   //    const { validate } = this.state
   //    if (emailRex.test(e.target.value)) {
   //       validate.emailState = 'has-success'
   //    } else {
   //       validate.emailState = 'has-danger'
   //    }
   //    this.setState({ validate })
   // }

   handleChange = async (event) => {
      const { target } = event;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const { name } = target;
      await this.setState({
         [name]: value,
      });
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

   }

   getUnivertisyTypes = uType => {
      const newRequest = axios.get('/api/v1/orgs/?format=json&orgType=IO')

      if (newRequest) {
         return newRequest.then(response => {
            // console.log(response.data);
            return response.data.map(keyword => ({
               label: keyword.orgName + (isNaN(keyword.department) ? " " + keyword.department : ""),
               value: keyword.id
            }))
         })
      }
   }

   toggle() {
      this.setState(prevState => ({
         modal: !prevState.modal
      }));
   }

   render() {

      return (
         <React.Fragment>
            <Container className="Modal">
               <Button color="danger" onClick={this.toggle}>Open Me</Button>
               {/* <h2>4C Member Database Query</h2> */}
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
               <ModalHeader toggle={this.toggle}>Searching for a 4C Member</ModalHeader>
               <ModalBody>
               <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                  <Col>
                     <FormGroup>
                        <Label>University Selection</Label>
                        <AsyncSelect
                           ref="universitySelection"
                           cacheOptions
                           defaultOptions
                           value={this.state.selectedUniversities}
                           loadOptions={this.getUnivertisyTypes}
                           onChange={(property, value) => {
                              {/* console.log(property) */}
                              this.setState({ selectedUniversities: property })
                           }}
                           isMulti={true}
                           isSearchable={false}
                           autoBlur={false}
                           closeOnSelect={false}
                           closeMenuOnSelect={false}
                        />
                        {/* <FormText>Your username is most likely your email.</FormText> */}
                     </FormGroup>

                     <FormGroup>
                        <Label>Activity Keywords Selection</Label>
                        <AsyncSelect
                           ref="activityKeywords"
                           cacheOptions
                           defaultOptions
                           value={this.state.selectedActivityKeyword}
                           loadOptions={() => parseKeywordData('AK')}
                           onChange={(property, value) => {
                              console.log(this)
                              this.setState({ activityKeywords: property })
                           }}
                           isMulti={true}
                           isSearchable={false}
                           autoBlur={false}
                           closeOnSelect={false}
                           closeMenuOnSelect={false}
                        />
                        <FormText>You can leave this blank to select all activity keywords.</FormText>
                     </FormGroup>

                     <FormGroup>
                        <Label>Topical Keywords Selection</Label>
                        <AsyncSelect
                           ref="topicalKeywordSelection"
                           cacheOptions
                           defaultOptions
                           value={this.state.topicalKeywords}
                           loadOptions={() => parseKeywordData('TK')}
                           onChange={(property, value) => {
                              {/* console.log(property) */}
                              this.setState({ topicalKeywords: property })
                           }}
                           isMulti={true}
                           isSearchable={false}
                           autoBlur={false}
                           closeOnSelect={false}
                           closeMenuOnSelect={false}
                        />
                        <FormText>You can leave this blank to select all topical keywords.</FormText>
                     </FormGroup>

                  </Col>
               
               </Form>
               </ModalBody>
               <ModalFooter>
                  <Button color="danger" onClick={this.toggle}>Cancel</Button>
                  <Button color="success" onClick={this.submitForm}>Run Query</Button>
               </ModalFooter>
               </Modal>
            </Container>
         </React.Fragment>
      );
   }
}

export default memberSearchModal;