import React, { Component } from 'react';
import {
   Button,
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
import { toggleNavBar, toggleDevMode, toggleSearchForCollaborator } from './actions/menuActions'
import SearchForCollaborator from './universityCollaborators/searchForUniversity'
import { NavLink as RRNavLink } from 'react-router-dom';

class Navigation extends Component {

   render() {
      const {nav, settings} = this.props;
      return (

         <Navbar color="light" light expand="md">
            <NavbarBrand tag={RRNavLink} exact to="/">{settings.siteHeading}</NavbarBrand>
            <NavbarToggler onClick={() => this.props.toggleNavBar()} />
            <Collapse isOpen={nav.navOpen} navbar>
               <Nav className="ml-auto" navbar>
                  <NavItem>
                     <NavLink tag={RRNavLink} exact to="/collaborator" activeClassName="active">Search for a Collaborator</NavLink>
                     {/* <SearchForCollaborator /> */}
                  </NavItem>

                  {settings.commitBranch === "dev" && nav.devModeOpen === false ? (
                     <NavItem>
                        <Button color="warning" onClick={() => this.props.toggleDevMode()}>Open  development information</Button>
                     </NavItem>
                  ) : null}
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
   toggleSearchForCollaborator
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)