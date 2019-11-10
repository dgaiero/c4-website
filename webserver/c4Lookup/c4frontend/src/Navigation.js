import React, { Component } from 'react';
import {
   Collapse,
   Navbar,
   NavbarToggler,
   NavbarBrand,
   Nav,
   NavItem,
   NavLink,
   } from 'reactstrap';
import './App.css';
import { connect } from 'react-redux';
import { toggleNavBar, toggleDevMode, toggleSearchForUnivCollaborator } from './actions/menuActions'
import { NavLink as RRNavLink } from 'react-router-dom';

class Navigation extends Component {

   render() {
      const {nav, settings} = this.props;
      return (

         <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={RRNavLink} exact to="/">{settings.siteHeading}</NavbarBrand>
            <NavbarToggler onClick={() => this.props.toggleNavBar()} />
            <Collapse isOpen={nav.navOpen} navbar>
               <Nav className="ml-auto" navbar>
                  <NavItem>
                     <NavLink tag={RRNavLink} exact to="/univCollaborator" activeClassName="active">Search for a University Collaborator</NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink tag={RRNavLink} exact to="/4CCollaborator" activeClassName="active">Search for a 4C Member</NavLink>
                  </NavItem>
                  <NavItem>
                  </NavItem>
               </Nav>
            </Collapse>
         </Navbar>
      );
   }
}

const mapStateToProps = state => ({
   nav: state.nav,
   settings: state.settings,
})

const mapDispatchToProps = {
   toggleNavBar,
   toggleDevMode,
   toggleSearchForUnivCollaborator
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)