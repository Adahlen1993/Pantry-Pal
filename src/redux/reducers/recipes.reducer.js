const recipesReducer = (state = [], action) => {
    if (action.type === 'SET_RECIPES') {
       return action.payload;
    }
    return state
 };
 
 export default recipesReducer;