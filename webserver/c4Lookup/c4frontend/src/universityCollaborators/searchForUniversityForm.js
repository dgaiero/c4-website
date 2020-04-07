import '../Modal.css';

import {
   Button,
   Col,
   Dropdown,
   DropdownItem,
   DropdownMenu,
   DropdownToggle,
   Form,
   FormGroup,
   Label,
   Row
} from 'reactstrap';
import { NBSP, isEmptyUniv as isEmpty } from '../helper';
import React, { Component } from 'react';

import CopyToClipBoardModal from '../copyQueryToClipboard'
import PasteFromCipboardModal from '../PasteQueryFromKeyboard'
import Select from 'react-select'
import { buildQueryString } from './searchForUniversity'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import ExportData from '../Export'
import { getKeywordsFromIDs } from '../Keywords'
import { getCollaborationsFromIDs } from '../Collaborations'
import { getOrganizationsFromIDs } from '../Organizations'
import { getUserTypes } from '../User'

// const exportToCSV = ExportData();

class SearchForUniversityForm extends Component {
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
         pasteFromClipBoardToggle: false,
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.exportData = this.exportData.bind(this);
      this.univOptions = this.getUnivertisyTypes();
      this.aKeywords = this.getKeywordTypes('AK');
      this.tKeywords = this.getKeywordTypes('TK');
      this.collaborations = this.getCollaborationsTypes();
   }

   getUnivertisyTypes = () => {
      const orgTypes = ["IO"]
      let univOrgs = this.props.orgs.items.filter(function (org) { return orgTypes.includes(org.orgType) });
      return univOrgs.map(org => ({ label: org.orgNameUnique, value: org.id }));
   }

   getCollaborationsTypes = () => {
      return this.props.collaborations.items.map(collaboration => ({ label: collaboration.collaborationName, value: collaboration.id }));
   }

   getKeywordTypes = (keywordType) => {
      const keywordsFiltered = this.props.keywords.items.filter(function (keyword) { return keyword.keywordType === keywordType })
      const keywordLow = keywordsFiltered.filter(function (keyword) { return keyword.sortOrder === "LS" });
      const keywordMedium = keywordsFiltered.filter(function (keyword) { return keyword.sortOrder === "MS" });
      const keywordHigh = keywordsFiltered.filter(function (keyword) { return keyword.sortOrder === "HS" });
      let keywordLowNormalized = keywordLow.map(keyword => ({
         label: keyword.keywordName,
         value: keyword.id
      }));
      let keywordMediumNormalized = keywordMedium.map(keyword => ({
         label: keyword.keywordName,
         value: keyword.id
      }));
      let keywordHighNormalized = keywordHigh.map(keyword => ({
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
         ];
      return keywordOptionData;
   }

   handleChange = (e) => {
      let { name, value } = e.target;
      if (e.target.type === "checkbox") {
         value = e.target.checked;
      }
      const queryData = { ...this.state.queryData, [name]: value === null ? [] : value };
      this.setState({ queryData });
   };

   handleSubmit(syntheticEvent) {
      syntheticEvent.preventDefault();
      this.props.submitHandler(this.state.queryData);

   }

   exportData() {
      const users = this.props.collaborators.items;
      const exportUsers = users.map(user => ({
         'First Name': user.firstName,
         'Last Name': user.lastName,
         'Email Address': user.emailAddress,
         'Website': user.website,
         'Organizations': getOrganizationsFromIDs(user.organization, this.props.orgs.items),
         'User Type': getUserTypes(user.userType).name,
         'Job Title': user.jobTitle,
         'Description': user.description,
         'Keywords': getKeywordsFromIDs(user.keywords, this.props.keywords.items),
         'Collaborations': getCollaborationsFromIDs(user.collaborations, this.props.collaborations.items),
      }));
      ExportData(exportUsers, 'user_export');
   }


   render() {

      return (
         <Form onSubmit={this.handleSubmit}>
            <Row>
               <Col>
                  <FormGroup>
                     <Label>University Selection</Label>
                     <Select
                        ref="universitySelection"
                        name="universitySelection"

                        value={this.state.queryData.selectedUniversities}
                        options={this.univOptions}
                        onChange={(val) => this.handleChange({ target: { name: 'selectedUniversities', value: val } })}
                        isMulti={true}
                        autoBlur={false}
                        closeOnSelect={false}
                        closeMenuOnSelect={false}
                     />
                  </FormGroup>
               </Col>
            </Row>

            <Row>
               <Col>
                  <FormGroup>
                     <Label>Activity Keywords Selection</Label>
                     <Select
                        ref="activityKeywords"
                        value={this.state.queryData.activityKeywords}
                        options={this.aKeywords}
                        onChange={(val) => this.handleChange({ target: { name: 'activityKeywords', value: val } })}
                        isMulti={true}
                        autoBlur={false}
                        closeOnSelect={false}
                        closeMenuOnSelect={false}
                     />
                  </FormGroup>
               </Col>
            </Row>

            <Row>
               <Col>
                  <FormGroup>
                     <Label>Topical Keywords Selection</Label>
                     <Select
                        ref="topicalKeywords"
                        value={this.state.queryData.topicalKeywords}
                        options={this.tKeywords}
                        onChange={(val) => this.handleChange({ target: { name: 'topicalKeywords', value: val } })}
                        isMulti={true}
                        autoBlur={false}
                        closeOnSelect={false}
                        closeMenuOnSelect={false}
                     />
                  </FormGroup>
               </Col>
            </Row>

            <Row>
               <Col>
                  <FormGroup>
                     <Label>Collaborations Selection</Label>
                     <Select
                        ref="collaborations"
                        value={this.state.queryData.collaborations}
                        options={this.collaborations}
                        onChange={(val) => this.handleChange({ target: { name: 'collaborations', value: val } })}
                        isMulti={true}
                        autoBlur={false}
                        closeOnSelect={false}
                        closeMenuOnSelect={false}
                     />
                  </FormGroup>
               </Col>
            </Row>

            <Row noGutters>
               <div>
                  <div id="runQueryButton" style={{ display: 'inline-block' }}>
                     <Button color="success"><span>Run Query</span></Button>
                  </div>
               </div>
               {NBSP}
               <div>

                  <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }))}>
                     <DropdownToggle caret>
                        More Actions
                        </DropdownToggle>
                     <DropdownMenu>
                        <DropdownItem disabled={this.props.collaborators.items.length === 0} onClick={this.exportData}>Export Search</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem disabled={isEmpty(this.state.queryData)}
                           onClick={() =>
                              this.setState(
                                 {
                                    copyToClipBoardToggle:
                                       !this.state.copyToClipBoardToggle
                                 })}
                        ><span>{isEmpty(this.state.queryData) ?
                           'Save Query (Create a query to enable)' :
                           'Save Query'}</span></DropdownItem>
                     </DropdownMenu>
                  </Dropdown>
                  <CopyToClipBoardModal
                     openStatus={this.state.copyToClipBoardToggle}
                     query={buildQueryString(this.state.queryData)}
                     endpoint="univCollaborator"
                     toggle={() => this.setState(
                        {
                           copyToClipBoardToggle: !this.state.copyToClipBoardToggle
                        })}
                     size='lg'
                  />
                  <PasteFromCipboardModal
                     openStatus={this.state.pasteFromClipBoardToggle}
                     endpoint="univCollaborator"
                     history={this.props.history}
                     toggle={() => this.setState(
                        {
                           pasteFromClipBoardToggle: !this.state.pasteFromClipBoardToggle
                        })}
                     size='lg'
                  />

               </div>
            </Row>
         </Form>
      );
   }
}


const mapStateToProps = state => ({
   nav: state.nav,
   orgs: state.orgs,
   keywords: state.keywords,
   collaborations: state.collaborations,
   collaborators: state.univCollaborators,
})

SearchForUniversityForm = withRouter(SearchForUniversityForm);

export default connect(mapStateToProps)(SearchForUniversityForm);