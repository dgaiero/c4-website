import React, { Component } from 'react';
import {
   Spinner,
} from 'reactstrap';
import ErrorModal from './AdditionalDataModal';
import LoadingModal from './LoadingModal'
import './App.css';
import { connect } from 'react-redux'
// import Loader from './Loader'


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
      // this.addLoadItem = this.addLoadItem.bind(this);
      // this.getLoadingItems = this.getLoadingItems.bind(this);
      // this.loadingState = this.loadingState.bind(this);
      // this.calculateLoadingState = this.calculateLoadingState.bind(this);
   }

   // static addLoadItem(key, value) {
   //    var pair = { [key]: value }
   //    this.setState((prevState) => {
   //       return { loadingItems: { ...prevState.loadingItems, ...pair},loadingStatus: this.calculateLoadingState() }
   //    })
   //    // this.setState({ loadingItems: { ...this.loadingItems, ...pair }});
   //    // this.loadingStatus = this.calculateLoadingState();
   // }

   // static getLoadingItems() {
   //    return Object.values(this.state.loadingItems)
   // }

   // static loadingState() {
   //    return this.state.loadingStatus;
   // }

   // static calculateLoadingState() {
   //    let openStatus = []
   //    let loadValues = Object.values(this.loadingItems)
   //    loadValues.map(loadInfo => openStatus.push(loadInfo.condition, loadInfo.error !== null))
   //    openStatus = openStatus.every(x => x === false);
   //    return openStatus
   // }

   // shouldComponentUpdate(prevProps) {
   //    console.log(prevProps.status)
   //    console.log(this.props.status)
   //    if (prevProps.status !== this.props.status) {
   //       return true;
   //    }
   //    return false;
   // }

   // componentDidUpdate(prevProps) {
   //    if (prevProps.status !== this.props.status) {
   //       this.setState({ status: this.props.status });
   //    }
   // }

   // componentWillReceiveProps({ status }) {
   //    this.setState({ ...this.state, status: Loader.loadingState() })
   // }

   loadingText(friendlyName, condition, error) {
      let status = <Spinner color="primary" size="sm" />
      if (error !== null) {
         status = <a href="#0" key="ERROR" onClick={() => this.showErrorInfo(error.toString(), <code>{error.stack.toString()}</code>)}>Error</a>
      }
      else if (condition === false) {
         status = 'done'
      }

      return (condition === false && error === null) ? null : <div key={friendlyName}>Loading {friendlyName}... {status}</div>

   }

   showErrorInfo(title, body) {
      this.setState({ errorModalTitle: title, errorModalBody: body, errorModalOpenFlag: !this.state.errorModalOpenFlag});
   }

   errorModalOpenToggle = () => {
      this.setState({ errorModalOpenFlag: !this.state.errorModalOpenFlag });
   };


   render() {
      const {body, status} = this.props;
      // console.log(status);
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