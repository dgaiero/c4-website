
import axios from "axios";

export const Actions = {
   FETCH_COLLABORATORS_BEGIN: 'FETCH_COLLABORATORS_BEGIN',
   FETCH_COLLABORATORS_SUCCESS: 'FETCH_COLLABORATORS_SUCCESS',
   FETCH_COLLABORATORS_FAILURE: 'FETCH_COLLABORATORS_FAILURE',
   SET_QUERY_STATEMENT: 'SET_QUERY_STATEMENT',
   SET_URL: 'SET_URL'
}

export const fetchUnivCollaboratorsBegin = () => ({
   type: Actions.FETCH_COLLABORATORS_BEGIN
});

export const fetchUnivCollaboratorsSuccess = (collaborators) => ({
   type: Actions.FETCH_COLLABORATORS_SUCCESS,
   payload: { collaborators }
})

export const fetchUnivCollaboratorsFailure = (error) => ({
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

export const fetchUnivCollaborators = (url) => {
   return dispatch => {
      dispatch(fetchUnivCollaboratorsBegin());

      axios.get(url)
      .then (res => {dispatch(fetchUnivCollaboratorsSuccess(res.data));})
         .catch(err => { dispatch(fetchUnivCollaboratorsFailure(err));});
   }
}