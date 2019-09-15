// https://api.github.com/repos/dgaiero/c4-website/commits/gh-pages

import React, { Component } from 'react';
import axios from "axios";
import {
   Alert,
   Button,
   Nav,
   NavItem,
   NavLink,
   Modal,
   ModalHeader,
   ModalFooter,
   ModalBody, TabContent, TabPane, Card, CardText, CardDeck, CardBody, CardFooter, CardColumns, CardImg,
   Spinner
} from 'reactstrap';
import './App.css';
import './appInfo.css';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Obfuscate from "react-obfuscate";
var base64 = require('base-64');

class AppInfo extends Component {
   constructor(props) {
      super(props);
      this.state = {
         hash: 'Loading',
         loadVersionHash: true,
         commitError: null,

         license: 'Loading',
         loadLicense: true,
         licenseError: null,

         moduleLicense: 'Loading',
         loadModuleLicense: true,
         moduleLicenseError: null,

         activeTab: '1'
      };
      this.getCommitHash = this.getCommitHash.bind(this);
      this.getLicense = this.getLicense.bind(this);
      this.getModuleLicenses = this.getModuleLicenses.bind(this);
      this.toggle = this.toggle.bind(this);
   }

   componentDidMount() {
      this.getCommitHash();
      this.getLicense();
      this.getModuleLicenses();
   }

   getCommitHash() {
      axios.get('https://api.github.com/repos/dgaiero/c4-website/commits/gh-pages')
         .then(res => {
            this.setState({ hash: res.data.sha, loadVersionHash: false });
         })
         .catch(err => this.setState({ commitError: err.response }))
   }

   getLicense() {
      axios.get('https://api.github.com/repos/dgaiero/c4-website/license')
         .then(res => {
            this.setState({ license: res.data, loadLicense: false });
         })
         .catch(err => this.setState({ licenseError: err.response }))
   }

   getModuleLicenses() {
      axios.get('https://raw.githubusercontent.com/dgaiero/c4-website/dev/webserver/c4Lookup/c4frontend/oLICENSE')
         .then(res => {
            this.setState({ moduleLicense: res.data, loadModuleLicense: false });
         })
         .catch(err => this.setState({ moduleLicenseError: err.response }))
   }

   toggle(tab) {
      if (this.state.activeTab !== tab) {
         this.setState({
            activeTab: tab
         });
      }
   }

   tab1Content = () => {
      return (
         <>
            <Alert color="dark">
               <h4 className="alert-heading">Application Frontend and Backend Versions</h4>
               <p>
                  This application is broken up into a frontend service
                  (this website) and a backend API service.
                  Each service has its own version information.
                              </p>
               <hr />
               <p className="mb-0">
                  When providing feedback or if you have a question or
                  issue with this website, please make sure to refer to
                                 <b> both</b> version tags.
                              </p>
            </Alert>

            <div style={{ marginBottom: '16px' }}>
               <CardDeck>
                  <Card>
                     <CardBody>
                        <h5 className='cardTitle'>Backend API</h5>
                        <CardText>
                           <b>Branch: </b>{this.props.settings.commitBranch}< br />
                           <b>Commit Hash: </b><code>{this.props.settings.commitHash}</code><br />
                        </CardText>

                     </CardBody>
                     <CardFooter><a href={'https://github.com/dgaiero/c4-website/tree/' + this.props.settings.commitHash} target="_blank" rel="noopener noreferrer">Open in Remote</a></CardFooter>
                  </Card>
                  <Card>
                     <CardBody>
                        <h5 className='cardTitle'>Frontend Service</h5>
                        <b>Commit Hash: </b><code>{this.state.hash}</code><br />

                     </CardBody>
                     <CardFooter><a href={'https://github.com/dgaiero/c4-website/tree/' + this.state.hash} target="_blank" rel="noopener noreferrer">Open in Remote</a></CardFooter>
                  </Card>
               </CardDeck>
            </div>
            Designed and developed by Dominic Gaiero (<Obfuscate email="4cwebsite@dgaiero.me" />)
         </>
      )
   }

   tab2Content = () => {
      return (
         <>
         {this.state.licenseError !== null ? "An error occured fetching the license" :
            !this.state.loadLicense ? 
            <>
               <b>This application is licensed under the {this.state.license.license.name}</b>
               <pre className="license form-control">{base64.decode(this.state.license.content)}</pre>
            </>
         : <Spinner color="primary" />
         }
         </>
      )
   }

   tab3Content = () => {
      return (
         <>
            {this.state.moduleLicenseError !== null ? "An error occured fetching the license" :
               !this.state.loadModuleLicense ?
                  <>
                     <b>The following is all of the licenses of software used in this application</b>
                     <pre className="license form-control">{this.state.moduleLicense}</pre>
                  </>
                  : <Spinner color="primary" />
            }
         </>
      )
   }

   tab4Content = () => {
      return (
         <>
            <CardColumns>
               <Card>
                  <CardImg top width="100%" src="https://images.unsplash.com/photo-1478486982180-2de2fafa19f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" alt="Construction Image" />
                  <CardBody>
                     <CardText><span>Photo by <a href="https://unsplash.com/@thatsmrbio?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Matthew Hamilton</a> on <a href="/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span></CardText>
                  </CardBody>
               </Card>
               <Card>
                  <CardImg top width="100%" src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE3MzYxfQ&auto=format&fit=crop&w=500&q=80" alt="Collaboration Image" />
                  <CardBody>
                     <CardText><span>Photo by <a href="https://unsplash.com/@youxventures?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">You X Ventures</a> on <a href="/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span></CardText>
                  </CardBody>
               </Card>
               <Card>
                  <CardImg top width="100%" src="https://images.unsplash.com/photo-1491772135384-20292e4b5ea1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" alt="Waves Image" />
                  <CardBody>
                     <CardText><span>Photo by <a href="https://unsplash.com/@johnonolan?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">John O'Nolan</a> on <a href="/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span></CardText>
                  </CardBody>
               </Card>
            </CardColumns>
         </>
      )
   }

   render() {
      const { openStatus, toggle, settings } = this.props;
      return (
         <>
            {/* <span className = "text-muted">{this.state.hash}</span> */}
            <Modal isOpen={openStatus} toggle={toggle} size="lg">
               <ModalHeader toggle={toggle}>Application Information</ModalHeader>
               <ModalBody>
                  <div>
                     <Nav pills>
                        <NavItem>
                           <NavLink
                              href="#0"
                              className={classnames({ active: this.state.activeTab === '1' })}
                              onClick={() => { this.toggle('1'); }}>
                              About Application
                           </NavLink>
                        </NavItem>
                        <NavItem>
                           <NavLink
                              href="#0"
                              className={classnames({ active: this.state.activeTab === '2' })}
                              onClick={() => { this.toggle('2'); }}>
                              Application License
                           </NavLink>
                        </NavItem>
                        <NavItem>
                           <NavLink
                              href="#0"
                              className={classnames({ active: this.state.activeTab === '3' })}
                              onClick={() => { this.toggle('3'); }}>
                              Other Licenses
                           </NavLink>
                        </NavItem>
                        <NavItem>
                           <NavLink
                              href="#0"
                              className={classnames({ active: this.state.activeTab === '4' })}
                              onClick={() => { this.toggle('4'); }}>
                              Photo Credits
                           </NavLink>
                        </NavItem>
                     </Nav>
                     < br />
                     <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                           {this.tab1Content()}
                        </TabPane>
                        <TabPane tabId="2">
                           {this.tab2Content()}
                        </TabPane>
                        <TabPane tabId="3">
                           {this.tab3Content()}
                        </TabPane>
                        <TabPane tabId="4">
                           {this.tab4Content()}
                        </TabPane>
                     </TabContent>
                  </div>
               </ModalBody>
               <ModalFooter>
                  <Button color="primary" onClick={toggle}>Close</Button>
               </ModalFooter>
            </Modal>
         </>
      )
   }

}

const mapStateToProps = state => ({
   settings: state.settings,
})

export default connect(mapStateToProps)(AppInfo)