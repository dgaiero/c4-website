import './App.css';
import './welcomeJumbotron.css'

import {
   Button,
   Col,
   Container,
   Jumbotron,
   Row,
} from 'reactstrap';
import React, { Component } from 'react';

import { connect } from 'react-redux';

class WelcomeJumbotron extends Component {
   constructor(props) {
      super(props);
      this.state = {

         navIsOpen: false,
         devModeOpen: true,
      };
   }
   render() {
      const { settings } = this.props;
      return (

         <Jumbotron className="welcome text-light" fluid>
            <Container fluid>
               <Row>
                  <Col sm={{ size: 6, order: 2, offset: 1 }}>
                  <h1 className="display-3">{settings.frontHeading}</h1>
                  <p className="lead">{settings.frontMessage}</p>
                  <hr className="my-2 hr-light" />
                  <p>{settings.frontMessageSubText}</p>
                  <p className="lead">
                        <Button href={'https://www.surveymonkey.com/r/5X3RL3B'}
                        color="light"  target="_blank" rel="noopener noreferrer">
                        Request Addition to Database</Button>
                  </p>
                  </Col>
               </Row>
            </Container>
         </Jumbotron>
      );
   }
}

const mapStateToProps = state => ({
   settings: state.settings,
})

export default connect(mapStateToProps)(WelcomeJumbotron)