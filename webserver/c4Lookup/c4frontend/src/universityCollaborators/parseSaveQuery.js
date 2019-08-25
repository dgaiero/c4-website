import React from 'react'
var base64 = require('base-64');

// export const ParseSaveQuery = ({ match }) => {
//    return (
//    <div>
//       <h1>{match}</h1>
//    </div>
//    )
//    }

export const ParseSaveQuery = ({ match, history }) => {
   if (!match.params.id) {
      history.replace({ pathname: '/collaborator' });
   }
   let query = match.params.id;
   let decoded_query = base64.decode(query);
   return (<h1>Found: {decoded_query}</h1>);
}