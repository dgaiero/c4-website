export const Actions = {
   CALCULATE_LOADING_STATUS: 'CALCULATE_LOADING_STATUS',
   ADD_LOADING_ITEM: 'ADD_LOADING_ITEM'
};

export const calculateLoadingStatus = () => ({
   type: Actions.CALCULATE_LOADING_STATUS
});

export const addLoadingItem = (item) => ({
   type: Actions.ADD_LOADING_ITEM,
   payload: { item }
})