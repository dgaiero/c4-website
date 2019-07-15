import axios from 'axios';

export const Actions = {
   FETCH_SETTINGS_BEGIN: 'FETCH_SETTINGS_BEGIN',
   FETCH_SETTINGS_SUCCESS: 'FETCH_SETTINGS_SUCCESS',
   FETCH_SETTINGS_FAILURE: 'FETCH_SETTINGS_FAILURE',
}

export const fetchSettingsBegin = () => ({
   type: Actions.FETCH_SETTINGS_BEGIN
});

export const fetchSettingsSuccess = (settings) => ({
   
   type: Actions.FETCH_SETTINGS_SUCCESS,
   payload: {settings}
})

export const fetchSettingsFailure = (error) => ({
   type: Actions.FETCH_SETTINGS_FAILURE,
   payload: { error }
})

export function fetchSettings() {
   console.log("FETCHED")
   return dispatch => {
      dispatch(fetchSettingsBegin());
      return axios.get('/api/v1/frontendParameters/1/?format=json')
         .then(response => {dispatch(fetchSettingsSuccess(response.data))})
         .catch(error => dispatch(fetchSettingsFailure(error)));
   }
}