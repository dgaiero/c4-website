import './App.css';

import {
   ListGroup,
   ListGroupItem,
   ListGroupItemHeading,
   ListGroupItemText,
} from 'reactstrap';
import { NBSP, toTitleCase } from './helper'
import React, { Component } from 'react';

import BaseModal from './AdditionalDataModal';
import { connect } from 'react-redux'

export function getCollaborationsFromIDs(collaborationIDs, collaborations) {
   let displayText = '';
   collaborationIDs.map(collaboration => (
      displayText += toTitleCase(collaborations[collaboration].collaborationName) + ", "
   ));
   displayText = displayText.substring(0, displayText.length - 2);
   return displayText;
}

class Collaborations extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showCollaborationsOverviewModal: false,
         collaborationsOverviewModalTitle: 'User Collaborations',
         collaborationsOverviewModalBody: [],
      };
   }

   componentDidMount() {
      this.setState({ collaborationsOverviewModalBody: this.buildCollaborationsOverviewModalBody() })
      this.buildDisplayText();
   }

   buildCollaborationsOverviewModalBody = () => {
      let modalBody = [];
      const IDs = this.props.items;
      IDs.map(
         ID => (
            modalBody.push(
                  <ListGroupItem key={ID} >
                     {this.showCollaborationsExtendedData(ID)}
                  </ListGroupItem>)))
      modalBody = <ListGroup>{modalBody}</ListGroup>
      return modalBody;
   }

   buildDisplayText = () => {
      let displayText = ''
      const IDs = this.props.items;

      IDs.map(ID => (
         displayText += toTitleCase(
            this.props.collaborations[ID].collaborationName) + ", "));
      displayText = displayText.substring(0, displayText.length - 2)
      if (displayText.length > this.props.displayLength)
         displayText = displayText.substring(0, this.props.displayLength) + "..."
      if (displayText.length > 0)
         displayText =
            <a
               href="#0"
               key={IDs}
               onClick={
                  () => this.setState(
                     {
                        showCollaborationsOverviewModal: !this.state.showCollaborationsOverviewModal
                     })
               }
            >
               {displayText}
            </a>
      else
         displayText = "No Collaborations"
      return displayText;
   }

   showCollaborationsExtendedData(id) {
      let info = this.props.collaborations[id];
      return (
         <>
            <ListGroupItemHeading>
               {toTitleCase(info.collaborationName)}
            </ListGroupItemHeading>
            <ListGroupItemText>
               {info.collaborationDescription ? <div><b>Description: </b>{NBSP}{info.collaborationDescription.split("\n").map((i, key) => {
                  return <p key={key}>{i}</p>;
               })}</div> : "No Description Provided"}
            </ListGroupItemText>
         </>
      );
   }


   render() {
      return (
         <>
            {this.buildDisplayText()}
            <BaseModal
               openStatus={this.state.showCollaborationsOverviewModal}
               title={this.state.collaborationsOverviewModalTitle}
               body={this.state.collaborationsOverviewModalBody}
               toggle={() => this.setState(
                  {
                     showCollaborationsOverviewModal: !this.state.showCollaborationsOverviewModal
                  })}
               size='lg'
            />
         </>
      )
   }
}

const mapStateToProps = state => ({
   collaborations: state.collaborations.items,
   collaborationsLoading: state.collaborations.loading,
   collaborationsError: state.collaborations.error,
})

export default connect(mapStateToProps)(Collaborations);