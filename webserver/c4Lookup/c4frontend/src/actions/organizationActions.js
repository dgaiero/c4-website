
import axios from "axios";

export const Actions = {
   FETCH_ORGANIZATIONS_BEGIN: 'FETCH_ORGANIZATIONS_BEGIN',
   FETCH_ORGANIZATIONS_SUCCESS: 'FETCH_ORGANIZATIONS_SUCCESS',
   FETCH_ORGANIZATIONS_FAILURE: 'FETCH_ORGANIZATIONS_FAILURE'
}

export const fetchOrganizationsBegin = () => ({
   type: Actions.FETCH_ORGANIZATIONS_BEGIN
});

export const fetchOrganizationsSuccess = (organizations) => ({
   type: Actions.FETCH_ORGANIZATIONS_SUCCESS,
   payload: { organizations }
})

export const fetchOrganizationsFailure = (error) => ({
   type: Actions.FETCH_ORGANIZATIONS_FAILURE,
   payload: { error }
})

export function fetchOrganizations() {
   let organizations = [];
   return dispatch => {
      dispatch(fetchOrganizationsBegin());
      return axios.get('api/v1/orgs/?format=json')
         .then(response => {
            response.data.map(organization => {
               organizations[organization.id] = organization;
               return organization;
            });
            dispatch(fetchOrganizationsSuccess(organizations));
         })
         .catch(error => dispatch(fetchOrganizationsFailure(error))
         );
   }
}