import { C4Actions } from '../actions/searchFor4CMemberActions'

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
   }
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
         return {
            ...state,
            loading: false,
            items: action.payload.collaborators.filter(user => user.userType !== 'US'),
         }
      case C4Actions.C4_FETCH_COLLABORATORS_FAILURE:
         return {
            ...state,
            loading: false,
            error: action.payload.error,
            items: [],
         }
      case C4Actions.C4_SET_QUERY_STATEMENT1:
         return {
            ...state,
            selectedQueryStatements: action.payload.query,
         }
      case C4Actions.C4_SET_URL:
         return {
            ...state,
            url: action.payload.url,
         }
      default:
         return state;
   }
}