import {Actions} from '../actions/menuActions'

const initialState = {
   searchForCollaborator: false,
   devModeOpen: true,
   navOpen: false,
}

export default function menuReducer(state = initialState, action) {
   switch(action.type) {
      case Actions.TOGGLE_SEARCH_FOR_COLLABORATOR:
         return {
            ...state,
            searchForCollaborator: !state.searchForCollaborator,
         }
      case Actions.TOGGLE_DEV_MODE:
         return {
            ...state,
            devModeOpen: !state.devModeOpen
         };
      case Actions.TOGGLE_NAV_BAR:
         return {
            ...state,
            navOpen: !state.navOpen
         }
      default:
         return state;
   }
}