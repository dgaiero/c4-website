import axios from "axios";

export const CollabActions = {
   FETCH_COLLABORATORS_BEGIN: 'FETCH_COLLABORATORS_BEGIN',
   FETCH_COLLABORATORS_SUCCESS: 'FETCH_COLLABORATORS_SUCCESS',
   FETCH_COLLABORATORS_FAILURE: 'FETCH_COLLABORATORS_FAILURE',
   SET_QUERY_STATEMENT: 'SET_QUERY_STATEMENT',
   SET_URL: 'SET_URL',
   TOGGLE_TOAST: 'TOGGLE_TOAST',
}

export const fetchCollaboratorsBegin = () => ({
   type: CollabActions.FETCH_COLLABORATORS_BEGIN
});

export const fetchCollaboratorsSuccess = (collaborators) => ({
   type: CollabActions.FETCH_COLLABORATORS_SUCCESS,
   payload: { collaborators }
})

export const fetchCollaboratorsFailure = (error) => ({
   type: CollabActions.FETCH_COLLABORATORS_FAILURE,
   payload: { error }
})

export const setURL = (URL) => ({
   type: CollabActions.SET_URL,
   payload: { URL }
})

export const setQueryStatement = (query) => ({
   type: CollabActions.SET_QUERY_STATEMENT,
   payload: { query }
})

export const toggleToast = () => ({
   type: CollabActions.TOGGLE_TOAST
})

export const fetchCollaborators = (url) => {
   return dispatch => {
      dispatch(fetchCollaboratorsBegin());
      axios.get(url)
         .then (res => {dispatch(fetchCollaboratorsSuccess(res.data));})
         .catch(err => { dispatch(fetchCollaboratorsFailure(err));});
   }
}