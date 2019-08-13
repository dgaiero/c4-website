import React, { Component } from 'react';
import {
   Alert,
} from 'reactstrap';
import './App.css';
import { connect } from 'react-redux';
import {toggleDevMode} from './actions/menuActions'

class DebugMessage extends Component {
   constructor(props) {
      super(props);
      this.state = {

         navIsOpen: false,
         devModeOpen: true,
      };
   }

   render() {
      const { nav, settings } = this.props;
      return (
         <>
         {settings.commitBranch === "dev" ? (
               <Alert color="light" isOpen={nav.devModeOpen} toggle={() => this.props.toggleDevMode()}>
                  <h4 className="alert-heading">Development Mode</h4>
                  <p>
                     The 4C database query utility is currently being <b>developed</b>. To view the repository, please visit: <a href="https://github.com/dgaiero/c4-website">https://github.com/dgaiero/c4-website</a>
                  </p>
                  <p>
                     Directory information contained on this website may be falsified while the site is under development.
                  </p>
                  <hr />
                  <p className="mb-0">
                     The current running commit has a message of: <em>{settings.commitMessage}</em>< br />
                     When providing support or feedback, please provide the following version information:< br />
                     <code>{settings.commitBranch}/{settings.commitHash}</code>< br />
                     <a href={'https://github.com/dgaiero/c4-website/tree/' + settings.commitHash} target="_blank" rel="noopener noreferrer">Open in Remote</a>
                  </p>
               </Alert>
            ) : null}
         </>
      );
   }
}

const mapStateToProps = state => ({
   nav: state.nav,
   settings: state.settings,
})

const mapDispatchToProps = {
   toggleDevMode
}

export default connect(mapStateToProps, mapDispatchToProps)(DebugMessage);