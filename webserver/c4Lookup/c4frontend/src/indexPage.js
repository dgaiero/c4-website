import './App.css';
import './indexCards.css'

import {
   Button,
   Card,
   CardBody,
   CardDeck,
   CardText,
   Container,
} from 'reactstrap';
import React, { Component } from 'react';

import PasteFromCipboardModal from './PasteQueryFromKeyboard'
import { NavLink as RRNavLink } from 'react-router-dom';
import Title from './head'
import WelcomeJumbotron from './WelcomeJumbotron';
import { connect } from 'react-redux';

const UnderConstructionCard = () => {
   return (
      <Card className="cardHideOverflow card-no-border shadow text-light">
            <span className="newFeaturesBanner"><b>New Features Coming Soon!</b></span>
            <div className="underConstructionCardImage card-defaults">
               <CardBody>
                  <h5 className='cardTitle'>Under Construction</h5>
                  <CardText>New features will be coming soon!</CardText>
               </CardBody>
               <div className="card-footer-light"><Button color="light" disabled>Button Coming Soon</Button></div>
            </div>
      </Card>
   )
}

const LookingForUnivCollaboratorCard = () => {
   return (
      <Card className="cardHideOverflow card-no-border shadow text-light" >
         <div className="lookingForUnivCollaboratorCardImage card-defaults">
            <CardBody>
               <h5 className='cardTitle'>Looking for a University Collaborator?</h5>
               <CardText>Interested in finding faculty, staff, or students to work on a project?</CardText>
            </CardBody>
            <div className="card-footer-light"><Button color="light" tag={RRNavLink} exact to="/univCollaborator">Search For a University Collaborator</Button></div>
         </div>
      </Card>
   )
}

const LookingFor4CCollaboratorCard = () => {
   return (
      <Card className="cardHideOverflow card-no-border shadow text-light" >
         <div className="lookingForGovCollaboratorCardImage card-defaults">
            <CardBody>
               <h5 className='cardTitle'>Looking for a 4C Collaborator?</h5>
               <CardText>Interested in finding a city, county, NGO, or regional staff?</CardText>
            </CardBody>
            <div className="card-footer-light"><Button color="light" tag={RRNavLink} exact to="/4CCollaborator">Search For a 4C Collaborator</Button></div>
         </div>
      </Card>
   )
}

class FrontPageCards extends Component {
   constructor(props) {
      super(props);
      this.state = {

         navIsOpen: false,
         devModeOpen: true,
         pasteFromClipBoardToggle: false,
      };
   }

   PasteQCode = () => {
      return (
         <Card className="cardHideOverflow card-no-border shadow text-light" >
            <div className="PasteQCodeCardImage card-defaults">
               <CardBody>
                  <h5 className='cardTitle'>Have a saved query?</h5>
                  <CardText>If you have a saved code, you can retrieve it here.</CardText>
               </CardBody>
               <div className="card-footer-light"><Button color="light" onClick={() => this.setState({ pasteFromClipBoardToggle: !this.state.pasteFromClipBoardToggle })}>Paste Code</Button></div>
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
         </Card>
      )
   }


   render() {
      return (
         <>
            <Title name="Home" />
            <WelcomeJumbotron />
            <Container>
               <CardDeck className="card-deck-overrides">
                  <LookingForUnivCollaboratorCard />
                  <LookingFor4CCollaboratorCard />
                  {/* <UnderConstructionCard />
                  <this.PasteQCode /> */}
               </CardDeck>
            </Container>
         </>
      );
   }
}

const mapStateToProps = state => ({
   settings: state.settings,
})

// FrontPageCards = withRouter(FrontPageCards)

export default connect(mapStateToProps)(FrontPageCards)