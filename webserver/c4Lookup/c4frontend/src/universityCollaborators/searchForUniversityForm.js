import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import axios from "axios";
import {
   Col, Row, Form,
   FormGroup, Label,
   Button, FormText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import '../Modal.css';
import CopyToClipBoardModal from '../copyQueryToClipboard'
import { NBSP } from '../helper';
import { buildQueryString } from './searchForUniversity'

async function getKeywords(type, sortOrder) {
   try {
      return await axios.get('api/v1/keywords/?format=json&keywordType=' + type + '&sortOrder=' + sortOrder)
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
         validate: {
            emailState: '',
         },
         selectedOption: null,
         modal: false,
         dropdownOpen: false,

         copyToClipBoardToggle: false,
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.isEmpty = this.isEmpty.bind(this);
   }

   componentDidMount() {
      // console.log(this.state.queryData)
   }


   isEmpty = () => {
      let empty = true;
      if (this.state.queryData.activityKeywords.length !== 0) {
         empty = false;
      }
      if (this.state.queryData.topicalKeywords.length !== 0) {
         empty = false;
      }
      if (this.state.queryData.selectedUniversities.length !== 0) {
         empty = false;
      }
      return empty;
   }

   getUnivertisyTypes = () => {
      const newRequest = axios.get('/api/v1/orgs/?format=json&orgType=IO')

      if (newRequest) {
         return newRequest.then(response => {
            return response.data.map(keyword => ({
               label: keyword.orgNameUnique,
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
      console.log(name);
      console.log(value);
      const queryData = { ...this.state.queryData, [name]: value === null ? [] : value };
      this.setState({ queryData });
   };

   handleSubmit(syntheticEvent) {
      syntheticEvent.preventDefault();
      this.props.submitHandler(this.state.queryData);

   }

   

   render() {

      return (
         <Form onSubmit={this.handleSubmit}>
            <Col>
               <FormGroup>
                  <Label>University Selection</Label>
                  <AsyncSelect
                     ref="universitySelection"
                     name="universitySelection"
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
               <Row>
                  <div>
                     <Button color="success">Run Query</Button>
                  </div>
                  {NBSP}
                  <div>
                     <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.setState(prevState => ({dropdownOpen: !prevState.dropdownOpen}))}>
                        <DropdownToggle caret>
                           More Actions
                        </DropdownToggle>
                        <DropdownMenu>
                           <DropdownItem disabled>Export Search</DropdownItem>
                           <DropdownItem divider />
                           <DropdownItem disabled={this.isEmpty(this.state.queryData)} onClick={() => this.setState({copyToClipBoardToggle: !this.state.copyToClipBoardToggle})}>Save Query</DropdownItem>
                           <DropdownItem>Paste Query</DropdownItem>
                        </DropdownMenu>
                     </Dropdown>
                     <CopyToClipBoardModal
                        openStatus={this.state.copyToClipBoardToggle}
                        query={buildQueryString(this.state.queryData)}
                        toggle={() => this.setState(
                           {
                              copyToClipBoardToggle: !this.state.copyToClipBoardToggle
                           })}
                        size='lg'
                     />
                  </div>
               </Row>
            </Col>
         </Form>
      );
   }
}