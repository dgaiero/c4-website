import { Actions } from '../actions/searchForUnivCollaboratorActions'

const initialState = {
   items: [],
   loading: true,
   error: null,
   url: '',
   'selectedQueryStatements': {
      activityKeywords: [],
      topicalKeywords: [],
      collaborations: [],
      selectedUniversities: [],
   }
}

export default function univCollaboratorsReducer(state = initialState, action) {
   switch(action.type) {
      case Actions.FETCH_COLLABORATORS_BEGIN:
         return {
            ...state,
            loading: true,
            error: null,
         }
      case Actions.FETCH_COLLABORATORS_SUCCESS:
         return {
            ...state,
            loading: false,
            items: action.payload.collaborators,
         }
      case Actions.FETCH_COLLABORATORS_FAILURE:
         return {
            ...state,
            loading: false,
            error: action.payload.error,
            items: [],
         }
      case Actions.SET_QUERY_STATEMENT:
         return {
            ...state,
            selectedQueryStatements: action.payload.query,
         }
      case Actions.SET_URL:
         return {
            ...state,
            url: action.payload.url,
         }
      default:
         return state;
   }
}