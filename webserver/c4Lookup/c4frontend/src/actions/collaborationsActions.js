
import axios from "axios";

export const Actions = {
   FETCH_COLLABORATIONS_BEGIN: 'FETCH_COLLABORATIONS_BEGIN',
   FETCH_COLLABORATIONS_SUCCESS: 'FETCH_COLLABORATIONS_SUCCESS',
   FETCH_COLLABORATIONS_FAILURE: 'FETCH_COLLABORATIONS_FAILURE'
}

export const fetchCollaborationsBegin = () => ({
   type: Actions.FETCH_COLLABORATIONS_BEGIN
});

export const fetchCollaborationsSuccess = (collaborations) => ({
   type: Actions.FETCH_COLLABORATIONS_SUCCESS,
   payload: { collaborations }
})

export const fetchCollaborationsFailure = (error) => ({
   type: Actions.FETCH_COLLABORATIONS_FAILURE,
   payload: { error }
})

export function fetchCollaborations() {
   let collaborations = [];
   return dispatch => {
      dispatch(fetchCollaborationsBegin());
      return axios.get('api/v1/collaborations/?format=json')
         .then(response => {
            response.data.map(collaboration => {
               collaborations[collaboration.id] = collaboration;
               return collaboration;
            });
            dispatch(fetchCollaborationsSuccess(collaborations));
         })
         .catch(error => dispatch(fetchCollaborationsFailure(error))
         );
   }
}