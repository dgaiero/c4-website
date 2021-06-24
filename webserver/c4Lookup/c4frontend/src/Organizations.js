import React, { Component } from 'react';
import {
   Button,
   Badge,
   ListGroupItem,
   ListGroupItemHeading,
   ListGroupItemText,
   ListGroup,
} from 'reactstrap';

import BaseModal from './AdditionalDataModal';
import { connect } from 'react-redux'
import './App.css';

import { NBSP } from './helper'

function getOrgType(shortOrgType) {
   if (shortOrgType === "IO") {
      return { name: "Institution", color: "primary" }
   }
   if (shortOrgType === "CY") {
      return { name: "City", color: "secondary" }
   }
   if (shortOrgType === "CO") {
      return { name: "County", color: "success" }
   }
   if (shortOrgType === "NG") {
      return { name: "NGO", color: "warning" }
   }
   if (shortOrgType === "RA") {
      return { name: "Regional Agency", color: "info" }
   }
}

export function getOrganizationsFromIDs(organizationIDs, organizations) {
   let displayText = '';
   organizationIDs.map(organization => (
      displayText += organizations[organization].orgNameUnique + ", "
   ));
   displayText = displayText.substring(0, displayText.length - 2);
   return displayText;
}

class Organizations extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showOrganizationOverviewModal: false,
         organizationOverviewModalTitle: 'User Organizations',
         organizationOverviewModalBody: [],

         showOrganizationDetailModal: false,
         organizationDetailModalTitle: 'User Organizations',
         organizationDetailModalBody: [],
      };
   }

   componentDidMount() {
      this.setState({ organizationOverviewModalBody: this.buildOrganizationOverviewModalBody() })
      // this.buildDisplayText();
   }

   buildOrganizationOverviewModalBody = () => {
      let modalBody = [];
      const organizationIDs = this.props.items;
      organizationIDs.map(
         organizationID => (
            modalBody.push(
               <ListGroupItem key={organizationID} >
                  {this.showOrgExtendedData(organizationID)}
               </ListGroupItem>)))
      modalBody = <ListGroup>{modalBody}</ListGroup>
      return modalBody;
   }

   buildDisplayText = () => {
      let displayText = ''
      const organizationIDs = this.props.items;

      organizationIDs.map(organizationID => (
         displayText += this.props.orgs[organizationID].orgName  + ", "));
      displayText = displayText.substring(0, displayText.length - 2)
      if (displayText.length > this.props.displayLength)
         displayText = displayText.substring(0, this.props.displayLength) + "..."
      if (displayText.length > 0)
         displayText =
            <a
               href="#0"
               key={organizationIDs}
               onClick={
                  () => this.setState(
                     {
                        showOrganizationOverviewModal: !this.state.showOrganizationOverviewModal
                     })
               }
            >
               {displayText}
            </a>
      else
         displayText = "No Organizations"
      return displayText;
   }

   showOrgExtendedData(orgID) {
      let orgInfo = this.props.orgs[orgID];

      return (
         <>
            <ListGroupItemHeading>
               {this.props.orgs[orgID].orgNameUnique}
               {NBSP}
               <Badge color={getOrgType(orgInfo.orgType).color}>
                  {getOrgType(orgInfo.orgType).name}
               </Badge>
            </ListGroupItemHeading>
            <ListGroupItemText>
               {(orgInfo.website !== null && orgInfo.website !== "") ? (
                  <Button outline color="primary" size="sm" href={orgInfo.website} target="_blank" rel="noopener noreferrer">Visit Website</Button>
               ) : "No website provided"}
            </ListGroupItemText>
         </>);
   }

   render() {
      return (
         <>
            {this.buildDisplayText()}
            <BaseModal
               openStatus={this.state.showOrganizationOverviewModal}
               title={this.state.organizationOverviewModalTitle}
               body={this.state.organizationOverviewModalBody}
               toggle={() => this.setState(
                  {
                     showOrganizationOverviewModal: !this.state.showOrganizationOverviewModal
                  })}
               size='lg'
            />
            <BaseModal
               openStatus={this.state.showOrganizationDetailModal}
               title={this.state.organizationDetailModalTitle}
               body={this.state.organizationDetailModalBody}
               toggle={() => this.setState(
                  {
                     showOrganizationDetailModal: !this.state.showOrganizationDetailModal
                  })}
               size='lg'
            />
         </>
      )
   }
}

const mapStateToProps = state => ({
   orgs: state.orgs.items,
   orgsLoading: state.orgs.loading,
   orgError: state.orgs.error,
})

export default connect(mapStateToProps)(Organizations);
