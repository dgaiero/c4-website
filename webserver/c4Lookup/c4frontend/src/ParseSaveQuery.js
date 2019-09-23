import React, { Component } from 'react';
import {
   Jumbotron,
   Button
} from 'reactstrap';
import { NavLink as RRNavLink, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";
import { connect } from 'react-redux'

import { setQueryStatement } from './actions/searchForUnivCollaboratorActions'
import Title from './head'
var base64 = require('base-64');

class ParseSaveQuery extends Component {
   constructor(props) {
      super(props);
      this.state = { seconds: 5 }
      this.tick = this.tick.bind(this)
      this.props.setQueryStatement({
         activityKeywords: [],
         topicalKeywords: [],
          collaborations: [],
         selectedUniversities: [],
      })
   }

   componentDidMount() {
      this.timer = setInterval(this.tick, 1000);
   }

   tick() {
      if (this.state.seconds > 0) {
         this.setState({ seconds: this.state.seconds - 1 })
      } else {
         clearInterval(this.timer);
      }
   }

   render() {
      const { match, history } = this.props;
      if (!match.params.id) {
         history.replace({ pathname: '/' });
      }
      let query = match.params.id;
      let decoded_query;
      try {
      decoded_query = base64.decode(query);
      }
      catch {
         return (
            <>
            <Title name="No Match Found" />
               <Jumbotron>
                  <h1 className="display-3">No Match Found!</h1>
                  <p className="lead">A match could not be found for the code <code>{query}</code></p>
                  <hr className="my-2" />
                  <p>You will be redirected to the homepage in {this.state.seconds} seconds</p>
                  {this.state.seconds === 0 ? <Redirect to='/' /> : null}
                  <p className="lead">
                     <Button tag={RRNavLink} exact to="/" color="primary">Go Home</Button>
                  </p>
               </Jumbotron>
            </>
         )
      }      
      return (
         <>
            <Title name="Match Found" />
            <Jumbotron>
               <h1 className="display-3">Match Found!</h1>
               <p className="lead">A match could be found for the code <code>{query}</code></p>
               <hr className="my-2" />
               <p>You will be redirected to <code>{decoded_query}</code> in {this.state.seconds} seconds</p>
               {/* {this.state.seconds === 0 ? <Redirect to={decoded_query} /> : null} */}
               <Redirect to={"/" + decoded_query}/>
            </Jumbotron>
         </>
      )
   }
}

const mapStateToProps = state => ({
   collaborators: state.collaborators,
})

const mapDispatchToProps = {
   setQueryStatement,
};

ParseSaveQuery = withRouter(ParseSaveQuery);

export default connect(mapStateToProps, mapDispatchToProps)(ParseSaveQuery);