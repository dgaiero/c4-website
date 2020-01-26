import axios from "axios";

export const UnivActions = {
   UNIV_FETCH_COLLABORATORS_BEGIN: 'UNIV_FETCH_COLLABORATORS_BEGIN',
   UNIV_FETCH_COLLABORATORS_SUCCESS: 'UNIV_FETCH_COLLABORATORS_SUCCESS',
   UNIV_FETCH_COLLABORATORS_FAILURE: 'UNIV_FETCH_COLLABORATORS_FAILURE',
   UNIV_SET_QUERY_STATEMENT: 'UNIV_SET_QUERY_STATEMENT',
   UNIV_SET_URL: 'UNIV_SET_URL',
   UNIV_TOGGLE_TOAST: 'UNIV_TOGGLE_TOAST',
}

export const fetchUnivCollaboratorsBegin = () => ({
   type: UnivActions.UNIV_FETCH_COLLABORATORS_BEGIN
});

export const fetchUnivCollaboratorsSuccess = (collaborators) => ({
   type: UnivActions.UNIV_FETCH_COLLABORATORS_SUCCESS,
   payload: { collaborators }
})

export const fetchUnivCollaboratorsFailure = (error) => ({
   type: UnivActions.UNIV_FETCH_COLLABORATORS_FAILURE,
   payload: { error }
})

export const setURL = (URL) => ({
   type: UnivActions.UNIV_SET_URL,
   payload: { URL }
})

export const setUnivQueryStatement = (query) => ({
   type: UnivActions.UNIV_SET_QUERY_STATEMENT,
   payload: { query }
})

export const toggleToast = () => ({
   type: UnivActions.UNIV_TOGGLE_TOAST
})

export const fetchUnivCollaborators = (url) => {
   return dispatch => {
      dispatch(fetchUnivCollaboratorsBegin());
      axios.get(url)
         .then (res => {dispatch(fetchUnivCollaboratorsSuccess(res.data));})
         .catch(err => { dispatch(fetchUnivCollaboratorsFailure(err));});
   }
}