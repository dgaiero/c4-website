import { Actions } from '../actions/loadingActions'

const initialState = {
   items: [],
   loading: false,
}

export default function loadingReducer(state = initialState, action) {
   switch(action.type) {
      case Actions.ADD_LOADING_ITEM:
         return {
            ...state,

         }
         default:
            return state;
   }
}