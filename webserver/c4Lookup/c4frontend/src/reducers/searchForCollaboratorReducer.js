import { CollabActions } from '../actions/searchForCollaboratorActions'

const initialState = {
   items: [],
   loading: true,
   error: null,
   url: '',
   'selectedQueryStatements': {
      activityKeywords: [],
      topicalKeywords: [],
      collaborations: [],
      selectedOrganization: [],
   },
   showToast: false,
}

export default function collaboratorsReducer(state = initialState, action) {
   switch(action.type) {
      case CollabActions.FETCH_COLLABORATORS_BEGIN:
         return {
            ...state,
            loading: true,
            error: null,
         }
      case CollabActions.FETCH_COLLABORATORS_SUCCESS:
         const collaborators = action.payload.collaborators.filter(user => user.userType === 'US' || user.userType !== 'US');
         return {
            ...state,
            loading: false,
            items: collaborators,
            showToast: collaborators.length > 0 ? true : false,
         }
      case CollabActions.FETCH_COLLABORATORS_FAILURE:
         return {
            ...state,
            loading: false,
            error: action.payload.error,
            items: [],
         }
      case CollabActions.SET_QUERY_STATEMENT:
         return {
            ...state,
            selectedQueryStatements: action.payload.query,
         }
      case CollabActions.SET_URL:
         return {
            ...state,
            url: action.payload.url,
         }
      case CollabActions.TOGGLE_TOAST:
         return {
            ...state,
            showToast: !state.showToast,
         }
      default:
         return state;
   }
}