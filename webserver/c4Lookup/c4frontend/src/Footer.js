import React, { Component } from 'react';
import {
   Container,
} from 'reactstrap';

import './App.css';
import { NBSP } from './helper';
import './footer.css'

class Footer extends Component {
   render() {
      return (
         <footer className="footer mt-auto py-3" style={{ backgroundColor: '#F8F9FA' }}>
            <Container fluid className="clearfix">
               <span className="text-muted float-left">Copyright {'\u00A9'} 2019 Central Coast Climate Collaborative </span>
               {/* <div className="float-right"> */}
                     {NBSP}
               <div className="float-right">
               <p className="c4-icon text-muted"></p>
               {NBSP}
               <a href="https://www.centralcoastclimate.org/" target="_blank" rel="noopener noreferrer">Visit main website</a>             
               </div>
               {/* </div> */}
            </Container>
         </footer>
      )
   }
}

export default Footer