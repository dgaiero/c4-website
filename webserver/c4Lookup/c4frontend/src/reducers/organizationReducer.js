import {Actions} from '../actions/organizationActions'

const initialState = {
   items: [],
   loading: true,
   error: null
}

export default function organizationsReducer(state = initialState, action) {
   switch(action.type) {
      case Actions.FETCH_ORGANIZATIONS_BEGIN:
         return {
            ...state,
            loading: true,
            error: null,
         }
      case Actions.FETCH_ORGANIZATIONS_SUCCESS:
         return {
            ...state,
            loading: false,
            items: action.payload.organizations,
         }
      case Actions.FETCH_ORGANIZATIONS_FAILURE:
         return {
            ...state,
            loading: false,
            error: action.payload.error,
            items: [],
         }
      default:
         return state;
   }
}