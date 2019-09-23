import React, { Component } from 'react';
import {
   Container,
   Jumbotron,
} from 'reactstrap';
import './App.css';
import Title from './head'

class NotFound extends Component {
   constructor(props) {
      super(props);
      this.state = {

         navIsOpen: false,
         devModeOpen: true,
      };
   }
   render() {
      const { pathname } = this.props.location;
      return (
         <>
         <Title name="404" />
         <Jumbotron fluid>
            <Container fluid>
               <h1 className="display-3">404</h1>
               <p className="lead">Page not found</p>
               <hr className="my-2" />
               <p>The requested URL was not found on this server</p>
               <p className="lead">
                  The path <code>{pathname}</code> could not be found in this application.
               </p>
            </Container>
         </Jumbotron>
         </>
      );
   }
}

export default NotFound