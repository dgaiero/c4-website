import React, { Component } from 'react';
import {
   Container,
   Button,
   Jumbotron,
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

         <Jumbotron className="welcome" fluid>
            <Container fluid>
               <h1 className="display-3">{settings.frontHeading}</h1>
               <p className="lead">{settings.frontMessage}</p>
               <hr className="my-2" />
               <p>{settings.frontMessageSubText}</p>
               <p className="lead">
                  <Button href={'mailto:' + settings.additionEmailAddress} color="secondary">Request Addition to Database</Button>
               </p>
            </Container>
         </Jumbotron>
      );
   }
}

const mapStateToProps = state => ({
   settings: state.settings,
})

export default connect(mapStateToProps)(WelcomeJumbotron)