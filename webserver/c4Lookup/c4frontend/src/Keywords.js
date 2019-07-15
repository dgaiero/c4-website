import React, { Component } from 'react';
import {
   Badge,
   ListGroupItem,
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

         showKeywordDetailModal: false,
         keywordDetailModalTitle: 'User Keywords',
         keywordDetailModalBody: [],
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
            <ListGroupItem
               key={keywordID} 
               tag="a" 
               onClick={() => this.showKeywordExtendedData(keywordID)} 
               href="#0" 
               action
            >
               {toTitleCase(this.props.keywords[keywordID].keywordName)}
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

      let title = 
         <div>
            More Information on <b>{keywordInfo.keywordName.toLowerCase()}</b> keyword
         </div>
      let body = (
         <div>
            <Badge 
               color={getKeywordType(keywordInfo.keywordType).color}>
               {getKeywordType(keywordInfo.keywordType).name}
            </Badge>
            {NBSP}
            <Badge 
               color={getKeywordSortOrder(keywordInfo.sortOrder).color}>
               {getKeywordSortOrder(keywordInfo.sortOrder).name}
            </Badge>
            <br />
         <span>{keywordInfo.keywordDescription !== null ? keywordInfo.keywordDescription : "No description provided."}</span>
      </div>);
      this.setState({ keywordDetailModalTitle: title, keywordDetailModalBody: body, showKeywordDetailModal: !this.state.showKeywordDetailModal });
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
         <BaseModal
            openStatus={this.state.showKeywordDetailModal}
            title={this.state.keywordDetailModalTitle}
            body={this.state.keywordDetailModalBody}
            toggle={() => this.setState(
               {
                  showKeywordDetailModal: !this.state.showKeywordDetailModal
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