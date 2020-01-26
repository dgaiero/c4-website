import { C4Actions } from '../actions/searchFor4CMemberActions'
import StateManager from 'react-select'

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

export default function C4MembersReducer(state = initialState, action) {
   switch(action.type) {
      case C4Actions.C4_FETCH_COLLABORATORS_BEGIN:
         return {
            ...state,
            loading: true,
            error: null,
         }
      case C4Actions.C4_FETCH_COLLABORATORS_SUCCESS:
         const collaborators = action.payload.collaborators.filter(user => user.userType !== 'US');
         return {
            ...state,
            loading: false,
            items: collaborators,
            showToast: collaborators.length > 0 ? true : false,
         }
      case C4Actions.C4_FETCH_COLLABORATORS_FAILURE:
         return {
            ...state,
            loading: false,
            error: action.payload.error,
            items: [],
         }
      case C4Actions.C4_SET_QUERY_STATEMENT:
         return {
            ...state,
            selectedQueryStatements: action.payload.query,
         }
      case C4Actions.C4_SET_URL:
         return {
            ...state,
            url: action.payload.url,
         }
      case C4Actions.C4_TOGGLE_TOAST:
         return {
            ...state,
            showToast: !state.showToast,
         }
      default:
         return state;
   }
}