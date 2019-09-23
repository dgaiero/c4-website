export const Actions = {
   TOGGLE_DEV_MODE: 'TOGGLE_DEV_MODE',
   TOGGLE_NAV_BAR: 'TOGGLE_NAV_BAR',

   TOGGLE_SEARCH_FOR_UNIV_COLLABORATOR: 'TOGGLE_SEARCH_FOR_UNIV_COLLABORATOR',
}

export const toggleDevMode = () => ({
   type: Actions.TOGGLE_DEV_MODE
});

export const toggleNavBar = () => ({
   type: Actions.TOGGLE_NAV_BAR
});

export const toggleSearchForUnivCollaborator = () => ({
   type: Actions.TOGGLE_SEARCH_FOR_UNIV_COLLABORATOR
})