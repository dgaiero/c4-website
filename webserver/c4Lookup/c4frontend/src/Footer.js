import React, { Component } from 'react';
import {
   Container,
} from 'reactstrap';

import './App.css';
import { NBSP } from './helper';
import './footer.css'
import AppInfo from './AppInfo'
import { connect } from 'react-redux';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faInfoCircle);

class Footer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showAppInfoModal: false,
      };
   }
   render() {
      return (
         <footer className="footer mt-auto py-3" style={{ backgroundColor: '#F8F9FA' }}>
            <Container fluid className="clearfix">
               <div className="float-left">
                  <AppInfo
                     openStatus={this.state.showAppInfoModal}
                     toggle={() => this.setState(
                        {
                           showAppInfoModal: !this.state.showAppInfoModal
                        })}
                  />
                  <a
                     href="#0"
                     onClick={
                        () => this.setState(
                           {
                              showAppInfoModal: !this.state.showAppInfoModal
                           })
                     }
                  ><FontAwesomeIcon icon="info-circle" /></a>
                  {NBSP}<span className="text-muted">|</span>{NBSP}
                  <span className="text-muted">Copyright {'\u00A9'} 2019 Central Coast Climate Collaborative </span>
               </div>
               <div className="float-right">
                  <p className="c4-icon text-muted"></p>
                  {NBSP}
                  <a href="https://www.centralcoastclimate.org/" target="_blank" rel="noopener noreferrer">Visit main website</a>
               </div>
            </Container>
         </footer>
      )
   }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(Footer)