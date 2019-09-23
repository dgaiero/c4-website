import {combineReducers} from 'redux'

import settings from './settingsReducer'
import keywords from './keywordReducer'
import orgs from './organizationReducer'
import nav from './menuReducer'
import collaborations from './collaborationsReducer'
import univCollaborators from './searchForUnivCollaboratorReducer'


export default combineReducers({
   settings,
   keywords,
   orgs,
   nav,
   univCollaborators,
   collaborations,

});