import {Actions} from '../actions/keywordActions'

const initialState = {
   items: [],
   loading: true,
   error: null
}

export default function keywordsReducer(state = initialState, action) {
   switch(action.type) {
      case Actions.FETCH_KEYWORDS_BEGIN:
         return {
            ...state,
            loading: true,
            error: null,
         }
      case Actions.FETCH_KEYWORDS_SUCCESS:
         return {
            ...state,
            loading: false,
            items: action.payload.keywords,
         }
      case Actions.FETCH_KEYWORDS_FAILURE:
         console.log(action.payload.error);
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