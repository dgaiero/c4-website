import React, { Component } from 'react';
import {
   Container,
   Button,
   Jumbotron,
   Row,
   Col,
   Card,
   CardImg,
   CardImgOverlay,
   CardHeader,
   CardFooter,
   CardBody,
   CardTitle,
   CardText,
} from 'reactstrap';
import './App.css';
import './indexCards.css'
import { connect } from 'react-redux';
import WelcomeJumbotron from './WelcomeJumbotron';
import { NavLink as RRNavLink } from 'react-router-dom';



const UnderConstructionCard = () => {
   return (
      <div style={{ border: '1px solid rgb(33, 37, 41)', overflow: 'hidden', borderRadius: '.25rem' }}>
         <Card className="cardHideOverflow" >
            <span className="newFeaturesBanner"><b>New Features Coming Soon!</b></span>
            <div className="underConstructionCardImage">
               <CardBody>
                  <h5 className='cardTitle'>Under Construction</h5>
                  <CardText>New features will be coming soon!</CardText>
               </CardBody>
               <CardFooter><Button color="secondary" disabled>Button Coming Soon</Button></CardFooter>
            </div>
         </Card>
      </div>
   )
}

const LookingForCollaboratorCard = () => {
   return (
      <div style={{ border: '1px solid rgb(33, 37, 41)', overflow: 'hidden', borderRadius: '.25rem' }}>
         <Card className="cardHideOverflow" >
            <div className="lookingForCollaboratorCardImage">
               <CardBody>
                  <h5 className='cardTitle'>Looking for a University Collaborator?</h5>
                  <CardText>Interested in finding a university to work on a project with?</CardText>

               </CardBody>
               <CardFooter><Button color="secondary" tag={RRNavLink} exact to="/collaborator">Search For a University Collaborator</Button></CardFooter>
            </div>
         </Card>
      </div>
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
               <Row className="row-eq-height">
                  <Col>
                     <LookingForCollaboratorCard />
                  </Col>
                  <Col>
                     <UnderConstructionCard />
                  </Col>
                  <Col>
                     <UnderConstructionCard />
                  </Col>
               </Row>
             </Container>
             </>
      );
   }
}

const mapStateToProps = state => ({
   settings: state.settings,
})

export default connect(mapStateToProps)(FrontPageCards)