import React, { Component } from 'react';
import {
   Badge,
   ListGroupItem,
   ListGroupItemHeading,
   ListGroupItemText,
   ListGroup,
} from 'reactstrap';

import BaseModal from './AdditionalDataModal';
import { connect } from 'react-redux'
import './App.css';

import { toTitleCase, NBSP } from './helper'

function getKeywordType(shortKeywordType) {
   if (shortKeywordType === "TK") {
      return { name: "Topical", color: "primary" }
   }
   if (shortKeywordType === "AK") {
      return { name: "Activity", color: "secondary" }
   }
}

function getKeywordSortOrder(shortKeywordSortOrder) {
   if (shortKeywordSortOrder === "HS") {
      return { name: "High Level", color: "success" }
   }
   if (shortKeywordSortOrder === "MS") {
      return { name: "Medium Level", color: "warning" }
   }
   if (shortKeywordSortOrder === "LS") {
      return { name: "Low Level", color: "danger" }
   }
}

class Keywords extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showKeywordOverviewModal: false,
         keywordOverviewModalTitle: 'User Keywords',
         keywordOverviewModalBody: [],
      };
   }

   componentDidMount() {
      this.setState({ keywordOverviewModalBody: this.buildKeywordOverviewModalBody() })
      this.buildDisplayText();
   }

   buildKeywordOverviewModalBody = () => {
      let modalBody = [];
      const keywordIDs = this.props.items;
      keywordIDs.map(
         keywordID => (
            modalBody.push(
                  <ListGroupItem key={keywordID} >
                     {this.showKeywordExtendedData(keywordID)}
                  </ListGroupItem>)))
      modalBody = <ListGroup>{modalBody}</ListGroup>
      return modalBody;
   }

   buildDisplayText = () => {
      let displayText = ''
      const keywordIDs = this.props.items;

      keywordIDs.map(keywordID => (
         displayText += toTitleCase(
            this.props.keywords[keywordID].keywordName) + ", "));
      displayText = displayText.substring(0, displayText.length - 2)
      if (displayText.length > this.props.displayLength)
         displayText = displayText.substring(0, this.props.displayLength) + "..."
      if (displayText.length > 0)
         displayText =
            <a
               href="#0"
               key={keywordIDs}
               onClick={
                  () => this.setState(
                     {
                        showKeywordOverviewModal: !this.state.showKeywordOverviewModal
                     })
               }
            >
               {displayText}
            </a>
      else
         displayText = "No Keywords"
      return displayText;
   }

   showKeywordExtendedData(id) {
      let keywordInfo = this.props.keywords[id];
      return (
         <>
            <ListGroupItemHeading>
               {toTitleCase(keywordInfo.keywordName)}
               {NBSP}
               <Badge
                  color={getKeywordType(keywordInfo.keywordType).color}>
                  {getKeywordType(keywordInfo.keywordType).name}
               </Badge>
               {NBSP}
               <Badge
                  color={getKeywordSortOrder(keywordInfo.sortOrder).color}>
                  {getKeywordSortOrder(keywordInfo.sortOrder).name}
               </Badge>
            </ListGroupItemHeading>
            <ListGroupItemText>
               {keywordInfo.keywordDescription ? <div><b>Description: </b>{NBSP}{keywordInfo.keywordDescription.split("\n").map((i, key) => {
                  return <p key={key}>{i}</p>;
               })}</div> : "No description provided"}
            </ListGroupItemText>
         </>
      );
   }


   render() {
      return (
         <>
            {this.buildDisplayText()}
            <BaseModal
               openStatus={this.state.showKeywordOverviewModal}
               title={this.state.keywordOverviewModalTitle}
               body={this.state.keywordOverviewModalBody}
               toggle={() => this.setState(
                  {
                     showKeywordOverviewModal: !this.state.showKeywordOverviewModal
                  })}
               size='lg'
            />
         </>
      )
   }
}

const mapStateToProps = state => ({
   keywords: state.keywords.items,
   keywordsLoading: state.keywords.loading,
   keywordError: state.keywords.error,
})

export default connect(mapStateToProps)(Keywords);