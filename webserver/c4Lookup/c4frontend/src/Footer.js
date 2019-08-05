import React, { Component } from 'react';
import {
   Container,
} from 'reactstrap';

import './App.css';

class Footer extends Component {
   render() {
      return (
         <footer className="footer mt-auto py-3" style={{ backgroundColor: '#F8F9FA' }}>
            <Container fluid className="clearfix">
               <span className="text-muted float-left">Copyright {'\u00A9'} 2019 Central Coast Climate Collaborative </span>
               <a href="https://www.centralcoastclimate.org/" className="float-right" target="_blank" rel="noopener noreferrer">Visit main website</a>
            </Container>
         </footer>
      )
   }
}

export default Footer