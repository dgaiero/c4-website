import { Actions } from '../actions/collaborationsActions'

const initialState = {
   items: [],
   loading: true,
   error: null
}

export default function collaborationsReducer(state = initialState, action) {
   switch (action.type) {
      case Actions.FETCH_COLLABORATIONS_BEGIN:
         return {
            ...state,
            loading: true,
            error: null,
         }
      case Actions.FETCH_COLLABORATIONS_SUCCESS:
         return {
            ...state,
            loading: false,
            items: action.payload.collaborations,
         }
      case Actions.FETCH_COLLABORATIONS_FAILURE:
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