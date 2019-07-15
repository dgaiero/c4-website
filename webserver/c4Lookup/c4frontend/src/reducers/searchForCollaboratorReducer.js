import { Actions } from '../actions/searchForCollaboratorActions'

const initialState = {
   items: [],
   loading: true,
   error: null,
   url: '',
}

export default function collaboratorsReducer(state = initialState, action) {
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
      case Actions.GET_URL:
         return {
            ...state,
            url: action.payload.url,
         }
      default:
         return state;
   }
}