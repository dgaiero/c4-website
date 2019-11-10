import React, { Component } from 'react';
import {
   Container,
   Button,
   Jumbotron,
   Row,
   Col,
} from 'reactstrap';
import './App.css';
import './welcomeJumbotron.css'
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
                     <Button href={'mailto:' + settings.additionEmailAddress} color="light">Request Addition to Database</Button>
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