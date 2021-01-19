import C4Collaborators from './searchFor4CMemberReducer'
import collaborations from './collaborationsReducer'
import {combineReducers} from 'redux'
import keywords from './keywordReducer'
import nav from './menuReducer'
import orgs from './organizationReducer'
import settings from './settingsReducer'
import univCollaborators from './searchForUnivCollaboratorReducer';
import collaborators from './searchForCollaboratorReducer';

export default combineReducers({
   settings,
   keywords,
   orgs,
   nav,
   univCollaborators,
   C4Collaborators,
   collaborations,
   collaborators,
});