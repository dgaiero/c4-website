import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import axios from "axios";
import {
   Col, Form,
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


export default class memberSearchModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
         queryData: this.props.selectedQuery,
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
   }

   submitForm(e) {
      e.preventDefault();
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
      // console.log(url);
      return url;

   }

   getUnivertisyTypes = () => {
      const newRequest = axios.get('/api/v1/orgs/?format=json&orgType=IO')

      if (newRequest) {
         return newRequest.then(response => {
            return response.data.map(keyword => ({
               label: keyword.orgName + (isNaN(keyword.department) ? " " + keyword.department : ""),
               value: keyword.id
            }))
         })
      }
   }

   handleChange = (e) => {
      let { name, value } = e.target;
      if (e.target.type === "checkbox") {
         value = e.target.checked;
      }
      const queryData = { ...this.state.queryData, [name]: value };
      this.setState({ queryData });
   };

   render() {
      const { openStatus, toggle, submitHandler } = this.props;

      return (
            <Modal isOpen={openStatus} toggle={toggle} size="lg">
               <ModalHeader toggle={toggle}>Searching for a 4C Member</ModalHeader>
               <ModalBody>
               <Form>
                  <Col>
                     <FormGroup>
                        <Label>University Selection</Label>
                        <AsyncSelect
                           ref="universitySelection"
                           cacheOptions
                           defaultOptions
                           value={this.state.queryData.selectedUniversities}
                           loadOptions={this.getUnivertisyTypes}
                           onChange={(val) => this.handleChange({ target: { name: 'selectedUniversities', value: val}})}
                           isMulti={true}
                           isSearchable={false}
                           autoBlur={false}
                           closeOnSelect={false}
                           closeMenuOnSelect={false}
                        />
                     </FormGroup>

                     <FormGroup>
                        <Label>Activity Keywords Selection</Label>
                        <AsyncSelect
                           ref="activityKeywords"
                           cacheOptions
                           defaultOptions
                           value={this.state.queryData.activityKeywords}
                           loadOptions={() => parseKeywordData('AK')}
                           onChange={(val) => this.handleChange({ target: { name: 'activityKeywords', value: val } })}
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
                           value={this.state.queryData.topicalKeywords}
                           loadOptions={() => parseKeywordData('TK')}
                           onChange={(val) => this.handleChange({ target: { name: 'topicalKeywords', value: val } })}
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
                  <Button color="danger" onClick={toggle}>Cancel</Button>
               <Button color="success" onClick={() => submitHandler(this.state.queryData)}>Run Query</Button>
               </ModalFooter>
               </Modal>
      );
   }
}