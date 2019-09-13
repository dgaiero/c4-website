import React, { Component } from 'react';
import {
   Spinner,
} from 'reactstrap';
import ErrorModal from './AdditionalDataModal';
import LoadingModal from './LoadingModal'
import './App.css';
import { connect } from 'react-redux'
import { toTitleCase } from './helper'


class Loading extends Component {
   constructor(props) {
      super(props);
      this.state = {
         status: false,
         errorModalOpenFlag: false,
         errorModalTitle: '',
         errorModalBody: '',
         loadingItems: {},
         loadingStatus: false,
      }
   }

   buildErrorMessage(error) {
      const errorJSON = Object.entries(error.response.data)
      let bodyText = []
      try {
         errorJSON.map((([key, value]) => {
            console.log("Key: " + key + " Value: " + value)
            bodyText.push(<span key={key}><b>{toTitleCase(key)}</b>: {value.toString()}</span>)
         }))
      }
      catch {
         bodyText.push(<span key='UDEFERR'><b>Detail</b>: Undefined Error</span>)
      }
      return (bodyText)
   }

   loadingText(friendlyName, condition, error) {
      let status = <Spinner color="primary" size="sm" />
      if (error !== null) {
         status = <a href="#0" key="ERROR" onClick={() => this.showErrorInfo(error.toString(), this.buildErrorMessage(error))}>Error</a>
      }
      else if (condition === false) {
         status = 'done'
      }

      return (condition === false && error === null) ? null : <div key={friendlyName}>Loading {friendlyName}... {status}</div>

   }

   showErrorInfo(title, body) {
      this.setState({ errorModalTitle: title, errorModalBody: body, errorModalOpenFlag: !this.state.errorModalOpenFlag });
   }

   errorModalOpenToggle = () => {
      this.setState({ errorModalOpenFlag: !this.state.errorModalOpenFlag });
   };


   render() {
      const { body, status } = this.props;
      return (
         <>
            <ErrorModal
               openStatus={this.state.errorModalOpenFlag}
               title={this.state.errorModalTitle}
               body={this.state.errorModalBody}
               toggle={this.errorModalOpenToggle}
               size={'lg'}
            />
            <LoadingModal
               openStatus={!status}
               title={<div>Loading Components</div>}
               body={body.map(loadInfo => this.loadingText(loadInfo.friendlyName, loadInfo.condition, loadInfo.error))}
            />
         </>
      )
   }
}

const mapStateToProps = state => ({
   settings: state.settings,
   keywords: state.keywords,
   orgs: state.orgs,
   collaborators: state.collaborators,
})

export default connect(mapStateToProps)(Loading)