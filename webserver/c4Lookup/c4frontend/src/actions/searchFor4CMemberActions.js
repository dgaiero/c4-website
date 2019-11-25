import axios from "axios";

export const C4Actions = {
   C4_FETCH_COLLABORATORS_BEGIN: 'C4_FETCH_COLLABORATORS_BEGIN',
   C4_FETCH_COLLABORATORS_SUCCESS: 'C4_FETCH_COLLABORATORS_SUCCESS',
   C4_FETCH_COLLABORATORS_FAILURE: 'C4_FETCH_COLLABORATORS_FAILURE',
   C4_SET_QUERY_STATEMENT: 'C4_SET_QUERY_STATEMENT',
   C4_SET_URL: 'SET_URL'
}

export const fetch4CMembersBegin = () => ({
   type: C4Actions.C4_FETCH_COLLABORATORS_BEGIN
});

export const fetch4CMembersSuccess = (collaborators) => ({
   type: C4Actions.C4_FETCH_COLLABORATORS_SUCCESS,
   payload: { collaborators }
})

export const fetch4CMembersFailure = (error) => ({
   type: C4Actions.C4_FETCH_COLLABORATORS_FAILURE,
   payload: { error }
})

export const setURL = (URL) => ({
   type: C4Actions.C4_SET_URL,
   payload: { URL }
})

export const setQueryStatement = (query) => ({
   type: C4Actions.C4_SET_QUERY_STATEMENT,
   payload: { query }
})

export const fetch4CMembers = (url) => {
   return dispatch => {
      dispatch(fetch4CMembersBegin());

      axios.get(url)
         .then (res => {dispatch(fetch4CMembersSuccess(res.data));})
         .catch(err => { dispatch(fetch4CMembersFailure(err));});
   }
}