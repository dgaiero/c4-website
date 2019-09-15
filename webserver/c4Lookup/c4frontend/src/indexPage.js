import React, { Component } from 'react';
import {
   Container,
   Button,
   Card,
   CardDeck,
   CardFooter,
   CardBody,
   CardText,
} from 'reactstrap';
import './App.css';
import './indexCards.css'
import { connect } from 'react-redux';
import WelcomeJumbotron from './WelcomeJumbotron';
import { NavLink as RRNavLink } from 'react-router-dom';



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

const LookingForCollaboratorCard = () => {
   return (
      <Card className="cardHideOverflow card-no-border" >
            <div style={{ border: '1px solid rgb(33, 37, 41)', overflow: 'hidden', borderRadius: '.25rem' }}>
                <div className="lookingForCollaboratorCardImage">
                <CardBody>
                    <h5 className='cardTitle'>Looking for a University Collaborator?</h5>
                    <CardText>Interested in finding a university to work on a project with?</CardText>

                </CardBody>
                <CardFooter><Button color="secondary" tag={RRNavLink} exact to="/collaborator">Search For a University Collaborator</Button></CardFooter>
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
      };
   }
   render() {
      return (
         <>
         <WelcomeJumbotron />
            <Container>
               <div style={{ marginBottom: '32px' }}>
                  <CardDeck className="">
                     <LookingForCollaboratorCard />
                     <UnderConstructionCard />
                     <UnderConstructionCard />
                  </CardDeck>
               </div>
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