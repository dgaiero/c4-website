
import axios from "axios";

export const Actions = {
   FETCH_COLLABORATORS_BEGIN: 'FETCH_COLLABORATORS_BEGIN',
   FETCH_COLLABORATORS_SUCCESS: 'FETCH_COLLABORATORS_SUCCESS',
   FETCH_COLLABORATORS_FAILURE: 'FETCH_COLLABORATORS_FAILURE',
   SET_QUERY_STATEMENT: 'SET_QUERY_STATEMENT',
   GET_URL: 'GET_URL'
}

export const fetchCollaboratorsBegin = () => ({
   type: Actions.FETCH_COLLABORATORS_BEGIN
});

export const fetchCollaboratorsSuccess = (collaborators) => ({
   type: Actions.FETCH_COLLABORATORS_SUCCESS,
   payload: { collaborators }
})

export const fetchCollaboratorsFailure = (error) => ({
   type: Actions.FETCH_COLLABORATORS_FAILURE,
   payload: { error }
})

export const getURL = (URL) => ({
   type: Actions.GET_URL,
   payload: { URL }
})

// export function fetchCollaborators(url) {
//    return dispatch => {
//       dispatch(fetchCollaboratorsBegin());
//       return axios.get(url)
//          .then(response => dispatch(fetchCollaboratorsSuccess(response.data)))
//          .catch(error => dispatch(fetchCollaboratorsFailure(error)));
//    }
// }

export const fetchCollaborators = (url) => {
   return dispatch => {
      dispatch(fetchCollaboratorsBegin());

      axios.get(url)
      .then (res => {dispatch(fetchCollaboratorsSuccess(res.data));})
      .catch(err => {dispatch(fetchCollaboratorsFailure(err.message));});
   }
}