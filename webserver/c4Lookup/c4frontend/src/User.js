import React, { Component } from 'react';
import {
   Button,
   Badge,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

import UserDetailModal from './AdditionalDataModal';
import Obfuscate from 'react-obfuscate'
import './App.css';

import { NBSP } from './helper'

library.add(faInfo);


function getUserTypes(shortUserType) {
   switch (shortUserType) {
      case "US":
         return { name: "University Faculty/Staff", color: "primary" };
      case "CS":
         return { name: "City Staff", color: "secondary" };
      case "CO":
         return { name: "County Staff", color: "success" }
      case "NS":
         return { name: "NGO Staff", color: "danger" }
      case "RS":
         return { name: "Regional Staff", color: "warning" }
      default:
         return { name: "Error", color: "dark" }
   }
}

class UserDetail extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showUserDetails: false,
         userDetailModalTitle: '',
         userDetailModalBody: '',
      }
   }

   showUserDetailModal = () => {
      let user = this.props.user
      let title = <div>About <b>{user.firstName} {user.lastName}</b></div>;
      let body = <div>
         <Badge color={getUserTypes(user.userType).color}>{getUserTypes(user.userType).name}</Badge><br />
         <b>Email: </b><Obfuscate email={user.emailAddress} /><br />
         {user.website ? <div><b>Website: </b>{NBSP}<a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a></div> : ""}
         {user.jobTitle ? <div><b>Job Title: </b>{NBSP}{user.jobTitle}</div> : ""}
         {user.description ? <div><b>About: </b>{NBSP}{user.description.split("\n").map((i, key) => {
            return <div key={key}>{i}< br /></div>;
         })}</div> : ""}
      </div>
      this.setState({userDetailModalTitle: title, userDetailModalBody: body, showUserDetails: true})
   }

   render() {
      return (
         <>
            <a href="#0" onClick={() => this.showUserDetailModal()}>About {this.props.user.firstName} {this.props.user.lastName}</a>
            <UserDetailModal
               openStatus={this.state.showUserDetails}
               title={this.state.userDetailModalTitle}
               body={this.state.userDetailModalBody}
               toggle={() => this.setState({ showUserDetails: !this.state.showUserDetails})}
               size={'lg'}
            />
         </>
      )
   }
}

export default UserDetail