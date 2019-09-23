import React, { Component } from 'react';
import {
   Container,
   Jumbotron,
} from 'reactstrap';
import './App.css';
import Title from './head'

class ComingSoon extends Component {
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
         <Title name="Coming Soon" />
         <Jumbotron fluid>
            <Container fluid>
               <h1 className="display-3">Coming Soon</h1>
               <p className="lead">Feature Coming Soon!</p>
               <hr className="my-2" />
               {/* <p>The selected feature is coming soon!</p> */}
               <p className="lead">
                  Hang tight, <code>{pathname}</code> feature is coming soon.
               </p>
            </Container>
         </Jumbotron>
         </>
      );
   }
}

export default ComingSoon