import React, { Component } from 'react';
import {
   Container,
   Button,
   Card,
   CardDeck,
   CardColumns,
   CardFooter,
   CardBody,
   CardText,
} from 'reactstrap';
import './App.css';
import './indexCards.css'
import { connect } from 'react-redux';
import WelcomeJumbotron from './WelcomeJumbotron';
import { NavLink as RRNavLink } from 'react-router-dom';

import PasteFromCipboardModal from './PasteQueryFromKeyboard'
import Title from './head'



const UnderConstructionCard = () => {
   return (
      <Card className="cardHideOverflow card-no-border" >
            <div style={{ border: '1px solid rgb(33, 37, 41)', overflow: 'hidden', borderRadius: '.25rem', 'zIndex': '300', 'height': '100%', 'position': 'relative' }}>
                <span className="newFeaturesBanner"><b>New Features Coming Soon!</b></span>
                <div className="underConstructionCardImage">
                <CardBody>
                    <h5 className='cardTitle'>Under Construction</h5>
                    <CardText>New features will be coming soon!</CardText>
                </CardBody>
                <CardFooter><Button color="secondary" disabled>Button Coming Soon</Button></CardFooter>
                </div>
            </div>
         </Card>
   )
}

const LookingForUnivCollaboratorCard = () => {
   return (
      <Card className="cardHideOverflow card-no-border" >
            <div style={{ border: '1px solid rgb(33, 37, 41)', overflow: 'hidden', borderRadius: '.25rem' }}>
                <div className="lookingForUnivCollaboratorCardImage">
                <CardBody>
                    <h5 className='cardTitle'>Looking for a University Collaborator?</h5>
                    <CardText>Interested in finding a university to work on a project with?</CardText>

                </CardBody>
               <CardFooter><Button color="secondary" tag={RRNavLink} exact to="/univCollaborator">Search For a University Collaborator</Button></CardFooter>
                </div>
            </div>
         </Card>
   )
}

const LookingForGovCollaboratorCard = () => {
   return (
      <Card className="cardHideOverflow card-no-border" >
         <div style={{ border: '1px solid rgb(33, 37, 41)', overflow: 'hidden', borderRadius: '.25rem' }}>
            <div className="lookingForGovCollaboratorCardImage">
               <CardBody>
                  <h5 className='cardTitle'>Looking for a Government Collaborator?</h5>
                  <CardText>Interested in finding a city, NGO, etc... to work on a project with?</CardText>

               </CardBody>
               <CardFooter><Button color="secondary" tag={RRNavLink} exact to="/govNGOCollaborator">Search For a Government Collaborator</Button></CardFooter>
            </div>
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
         <Card className="cardHideOverflow card-no-border" >
            <div style={{ border: '1px solid rgb(33, 37, 41)', overflow: 'hidden', borderRadius: '.25rem' }}>
               <div className="PasteQCodeCardImage">
                  <CardBody>
                     <h5 className='cardTitle'>Have a saved query?</h5>
                     <CardText>If you have a query code from a perviously saved query, or a query from someone else, use the button below to retreive the parameters.</CardText>

                  </CardBody>
                  <CardFooter><Button color="secondary" onClick={() => this.setState({ pasteFromClipBoardToggle: !this.state.pasteFromClipBoardToggle })}>Paste Code</Button></CardFooter>
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
               <CardDeck style={{ marginBottom: '32px' }}>
                  <LookingForUnivCollaboratorCard />
                  <LookingForGovCollaboratorCard />
                  {/* <UnderConstructionCard /> */}
                  <this.PasteQCode />
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