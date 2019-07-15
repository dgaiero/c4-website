import {combineReducers} from 'redux'

import settings from './settingsReducer'
import keywords from './keywordReducer'
import orgs from './organizationReducer'
import nav from './menuReducer'
import collaborators from './searchForCollaboratorReducer'

export default combineReducers({
   settings,
   keywords,
   orgs,
   nav,
   collaborators,

});