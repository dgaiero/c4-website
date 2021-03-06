import { Actions } from '../actions/settingsActions'

const initialState = {
   siteHeading: 'Loading...',
   frontHeading: 'Loading...',
   frontMessage: 'Loading...',
   frontMessageSubText: 'Loading...',
   additionEmailAddress: 'Loading...',
   commitBranch: 'master',
   commitHash: 'Loading...',
   commitMessage: 'Loading...',
   loading: true,
   error: null,
}

export default function settingsReducer(state = initialState, action) {
   switch(action.type) {
      case Actions.FETCH_SETTINGS_BEGIN:
         return {
            ...state,
            loading: true,
            error: null,
         }
      case Actions.FETCH_SETTINGS_SUCCESS:
         return {
            ...state,
            ...action.payload.settings,
            loading: false,
         }
      case Actions.FETCH_SETTINGS_FAILURE:
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