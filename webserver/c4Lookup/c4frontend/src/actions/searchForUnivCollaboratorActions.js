
import axios from "axios";

export const Actions = {
   FETCH_COLLABORATORS_BEGIN: 'FETCH_COLLABORATORS_BEGIN',
   FETCH_COLLABORATORS_SUCCESS: 'FETCH_COLLABORATORS_SUCCESS',
   FETCH_COLLABORATORS_FAILURE: 'FETCH_COLLABORATORS_FAILURE',
   SET_QUERY_STATEMENT: 'SET_QUERY_STATEMENT',
   SET_URL: 'SET_URL'
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

export const setURL = (URL) => ({
   type: Actions.SET_URL,
   payload: { URL }
})

export const setQueryStatement = (query) => ({
   type: Actions.SET_QUERY_STATEMENT,
   payload: { query }
})

export const fetchCollaborators = (url) => {
   return dispatch => {
      dispatch(fetchCollaboratorsBegin());

      axios.get(url)
      .then (res => {dispatch(fetchCollaboratorsSuccess(res.data));})
         .catch(err => { dispatch(fetchCollaboratorsFailure(err));});
   }
}